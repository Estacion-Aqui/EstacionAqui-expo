import React, { useCallback, useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionCard } from '../../components/TransactionCard';
import { Modular } from '../../components/Modular';
import { ActivityIndicator, Alert  } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {ParkData, TravelData, reserveSpot, getQuantitySpots, checkSpot, UserData} from '../../global/scripts/apis';
import {getDBEstabData, checkUserData, logouts, setUserData, checkDataLogin, saveHistory, removeReserveSpot, setCurrentSpot} from '../../global/scripts/database';

import { Button } from 'react-native-elements';
import theme from '../../global/styles/theme';

import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import {
  Container,
  Text,
  ContentView
} from './styles'

import { Header } from '../../components/Header';

export function CurrentSpot({ route, navigation }){
  
  const [pkData, setPkData] = useState<ParkData>(route.params.pkData);
  const [trlData, setTrlData] = useState<TravelData>(route.params.trlData);
  const [usData, setUsData] = useState<UserData>();

  var intervalIdData = 0 as number;
  const checkStatusSpot = async (result : TravelData) => {
      checkSpot(result.id).then(function(item){
        if(item.status) return;

        if(usData != null && item.plate == usData?.plate){
          handleNavigation();
        }else{
          handleBack();
        }
      });
  }
  function handleBack(){
      reserveSpot(pkData.id).then(function(result){
        if(result.spotId != null && result.spotId != ''){
          Alert.alert(
            "Nova vaga encontrada!!",
            "Encontramos uma nova vaga para voce",
            [ 
              { text: "OK", onPress: () => console.log("Home") }
            ]
          );
          setTrlData(result);
        }else{
          window.clearInterval(intervalIdData);
          Alert.alert(
            "Estacionamento Lotado!!",
            "Temos muitas pessoas utilizando o aplicativo ao mesmo tempo.... e todas as vagas acabaram, entre em contato com um agente local!",
            [ 
              { text: "OK", onPress: () => navigation.navigate("Home") }
            ]
          );
        }
      });
  }
  function handleNavigation(){  
    window.clearInterval(intervalIdData);
    intervalIdData = 0;
    navigation.navigate("EndFlow", {pkData: pkData});
    saveHistory(trlData);
  }
  const getLocation = async (result : ParkData) => {
    pkData.quantitySpots = await getQuantitySpots(result);
  }

  function setIntervalLocation(){
    return window.setInterval(function(){
      getLocation(pkData);
      checkStatusSpot(trlData);
    }, 10000)
  }
  useFocusEffect(useCallback(() => {
    removeReserveSpot();
    setCurrentSpot({trlData: trlData, pkData : pkData});
    checkUserData().then(function(us){
      if(us != null)
        setUsData(us);
    });
    if(intervalIdData == 0)
      intervalIdData = setIntervalLocation();
  },[]));

  useEffect(() => {
    removeReserveSpot();
    setCurrentSpot({trlData: trlData, pkData : pkData});
    checkUserData().then(function(us){
      if(us != null)
        setUsData(us);
    });
    if(intervalIdData == 0)
      intervalIdData = setIntervalLocation();
  }, []);
  
          
    /* confirmSpot(pkData.id, trlData.spotId, '').then(function(item){
      navigation.navigate("CurrentSpot", pkData);
    });*/
    //validar placa estacionada com a placa existente no bando do APP
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
        <Text>Encontramos uma Vaga!!!</Text>
        <View style={styles.viewSpots}>
          <View style={styles.viewSpot}>
            <Text style={styles.spottext}>Setor</Text>
            <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            >
              <Text style={styles.spotTextInside}>
                  {trlData.spotSector ?  trlData.spotSector : 'A'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewSpot}>
            <Text style={styles.spottext}>Vaga</Text>
            <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            >
              <Text style={styles.spotTextInside}>
                  {trlData.spotId}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {
          usData == null ? 
        <>
        <Button
          onPress = {() => handleNavigation()}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title="Estacionei!!"
        />

        </>
          :
        <>
        </>
        }
        <Button
          onPress = {() => handleBack()}
          buttonStyle={styles.buttonAttentionStyle}
          titleStyle={styles.buttonText}
          title="A vaga está ocupada..."
        />
      </ContentView>
      <Modular/>
    </Container>
  )
}

const styles = StyleSheet.create({

  button: {
      backgroundColor: theme.colors.primary_select,
      borderRadius: 190,
      alignItems: 'center',
      justifyContent: 'center',
      width: RFValue(90),
      height: RFValue(90),
      margin: 'auto',
      
  },
  map: {
    width: RFValue(250),
    height: RFValue(200),
    marginTop: RFValue(25)
  },
  buttonAttentionStyle: {
    backgroundColor: theme.colors.attention,
    paddingRight: RFValue(20),
    paddingLeft: RFValue(20),
    margin: RFValue(15),
  },
  buttonText: {
      color: '#FFF',
      fontSize: RFValue(17),
      fontWeight: 'bold',
  },
  spotTextInside: {
      color: theme.colors.background,
      fontSize: RFValue(25),
      fontWeight: 'bold',    
  },
  spottext: {
      color: theme.colors.empty,
      fontSize: RFValue(25),
      fontWeight: 'bold',    
  },
  viewSpot: {
    width: '50%',    
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewSpots: {
    width: '100%',    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFValue(15)
  },
    buttonStyle: {
      backgroundColor: theme.colors.primary,
      paddingRight: RFValue(15),
      paddingLeft: RFValue(15),
      margin: RFValue(15),
    },
});