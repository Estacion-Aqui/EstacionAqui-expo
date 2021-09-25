import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionCard } from '../../components/TransactionCard';
import React, { useCallback, useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { ActivityIndicator, Alert  } from 'react-native';
import { Modular } from '../../components/Modular';

import { Button } from 'react-native-elements';
import theme from '../../global/styles/theme';
import MapView, { Marker } from 'react-native-maps';
import {checkUserData} from '../../global/scripts/database';

import {reserveSpot, ParkData, confirmSpot, lastTravels, TravelData, UserData, cancelSpot} from '../../global/scripts/apis';

// import {getDistance, getPreciseDistance} from 'geolib';
// import Geolocation from '@react-native-community/geolocation';


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
  
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');

  function handleBack(){
    checkUserData().then(function(us){
      cancelSpot(pkData.id, us != null ? us.id : '').then(function(result){
        navigation.goBack();
      });
    });
  }
  const pkData = route.params.pkData;

  function handleNavigation(val : ParkData){
     Alert.alert(
      "Deseja realmente Cancelar a vaga?",
      "Não iremos mais reservar uma vaga para este Estabelecimento!!",
      [
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
    
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{ title: 'Necessário acesso a localização', message: 'Gostariamos de ter acesso a sua localização!!', buttonPositive: 'Ok'});
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

  const getOneTimeLocation = () => {
    /*Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLongitude(JSON.stringify(position.coords.longitude));
        setCurrentLatitude(JSON.stringify(position.coords.latitude));
      },
      (error) => {},
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
    );*/
  };

  useEffect(() => {
    //requestLocationPermission().then(function(item){
        setTimeout(() => {
          
        checkUserData().then(function(us){
          reserveSpot(pkData.id, us != null ? us.id : '').then(function(result){
            navigation.navigate("CurrentSpot", {trlData: result, pkData: pkData});
          });
        });
        /*var dis = getDistance(
          {latitude: pkData.latitude, longitude: pkData.longitude},
          {latitude: currentLatitude, longitude: currentLongitude},
        );
        alert(
          `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`
        );*/
      }, 5000);
   // });
  }, []);

  return (
    <Container>
      <Header></Header>
      <ContentView>
        <TransactionCard 
                  id={pkData.id}
                  type={pkData.type}
                  title={pkData.title}
                  amount={pkData.amount}
                  quantitySpots={pkData.quantitySpots}
                  latitude={pkData.latitude}
                  longitude={pkData.longitude}/>
        <Text>Ao se aproximar do local iremos te notificar da reserva</Text>
        <MapView style={styles.map} region={stateRegion} > 
          <Marker
            key={pkData.id}
            coordinate={{ latitude : pkData.latitude , longitude : pkData.longitude }}
            title={pkData.amount}
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