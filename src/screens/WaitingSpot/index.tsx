import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionCard } from '../../components/TransactionCard';
import React, { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { ActivityIndicator, Alert  } from 'react-native';
import { Modular } from '../../components/Modular';


import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';

import { Button } from 'react-native-elements';
import theme from '../../global/styles/theme';
import MapView, { Marker } from 'react-native-maps';
import {checkUserData, removeReserveSpot} from '../../global/scripts/database';
import {getDistanceParkData, getDistParkData} from '../../global/scripts/utils';

import {reserveSpot, ParkData, confirmSpot, lastTravels, TravelData, UserData, cancelSpot, getQuantitySpots} from '../../global/scripts/apis';

import {
  StyleSheet,
  PermissionsAndroid,
  Platform
} from 'react-native';

import {
  Container,
  Text,
  ContentView
} from './styles'

import { Header } from '../../components/Header';

    
export function WaitingSpot({ route, navigation }){
  
  var intervalIdData = 0 as number;
  function handleBack(){
    removeReserveSpot();
    window.clearInterval(intervalIdData);
    intervalIdData = 0;
    navigation.navigate("Home");
  }
  // const pkData = route.params.pkData;
  const [pkData, setPkData] = useState<ParkData>(route.params.pkData);

  function handleNavigation(val : ParkData){
     Alert.alert(
      "Deseja realmente Cancelar a vaga?",
      "Não iremos mais reservar uma vaga para este Estabelecimento!!",
      [ 
        { text: "Continuar com a Vaga", onPress: () => redirectPage() },
        { text: "OK", onPress: () => handleBack() }
      ]
    );
  }


  let stateRegion ={
    latitude: pkData.latitude,
    longitude: pkData.longitude,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0421,
  };

  const getLocation = async (result : ParkData) => {
    var dist = await getDistParkData(result);
    pkData.title = await getDistanceParkData(result);
    pkData.quantitySpots = await getQuantitySpots(result);
    setPkData(pkData);
    debugger;
    if(dist <= 1){
      redirectPage();
    }
  }
  const redirectPage = async () => {
    window.clearInterval(intervalIdData);
    intervalIdData = 0;
    /*
    PushNotification.configure({
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
    });
    
    // 4. Send a push notification
    PushNotification.localNotification({
      title: 'Encontramos sua vaga!!',
      message: `Agora você já pode se direcionar para a vaga que encontramos.`,
      playSound: true,
      soundName: 'default',
    });
    */

    checkUserData().then(function(us){
      reserveSpot(pkData.id).then(function(result){
        if(result.spotId != null){
          navigation.navigate("CurrentSpot", {trlData: result, pkData: pkData});
        }else{
          Alert.alert(
            "Estacionamento Lotado!!",
            "Temos muitas pessoas utilizando o aplicativo ao mesmo tempo.... e todas as vagas acabaram, entre em contato com um agente local!",
            [ 
              { text: "OK", onPress: () => navigation.navigate("Home") }
            ]
          );
        }
      });
    });
  }

  function setIntervalLocation(){
    return window.setInterval(function(){
      getLocation(pkData);
    }, 10000)
  }
  useFocusEffect(useCallback(() => {
    if(intervalIdData == 0)
      intervalIdData = setIntervalLocation();
  },[]));

  useEffect(() => {
    if(intervalIdData == 0)
      intervalIdData = setIntervalLocation();
    
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 0.5, // fetch interval in minutes
      },
      async (taskId: any) => {
        console.log('Received background-fetch event: ', taskId);

        var dist = await getDistParkData(pkData);
        if (dist <= 1) {
          redirectPage();
        }
        
        // Call finish upon completion of the background task
        BackgroundFetch.finish(taskId);
      },
      error => {
        console.error('RNBackgroundFetch failed to start.');
      },
    );
  }, []);

  return (
    <Container>
      <Header></Header>
      <ContentView>
        <TransactionCard 
                  id={pkData.id}
                  type={pkData.type}
                  title={pkData.title}
                  distance={pkData.distance}
                  quantitySpots={pkData.quantitySpots}
                  latitude={pkData.latitude}
                  longitude={pkData.longitude}/>
        <Text>Ao se aproximar do local iremos te notificar da reserva</Text>
        <MapView style={styles.map} region={stateRegion} > 
          <Marker
            key={pkData.id}
            coordinate={{ latitude : pkData.latitude , longitude : pkData.longitude }}
            title={pkData.title}
            description={pkData.quantitySpots}
          />
        </MapView>
        
        <Progress.Bar 
          indeterminate={true} 
          animated ={true} 
          indeterminateAnimationDuration={1000} 
          width={RFValue(250)}
          height={RFValue(10)}/>
        
        <Button
          buttonStyle={styles.buttonAttentionStyle}
          titleStyle={styles.buttonText}
          title="Cancelar"
          onPress={() => handleNavigation(pkData)}
        />

      </ContentView> 
      <Modular/>
    </Container>
  )
}

const styles = StyleSheet.create({

  map: {
    width: RFValue(250),
    height: RFValue(200),
    marginTop: RFValue(15),
    marginBottom: RFValue(25),
  },
    buttonAttentionStyle: {
      backgroundColor: theme.colors.attention,
      paddingRight: RFValue(20),
      paddingLeft: RFValue(20),
      margin: RFValue(15),
    },
    buttonText: {
        color: '#FFF',
        fontSize: RFValue(18),
        fontWeight: 'bold',
    },
});