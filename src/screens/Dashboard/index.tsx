import React, { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { ActivityIndicator, Alert, PermissionsAndroid, Platform  } from 'react-native';
import {  TouchableHighlight } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { HighlightCard } from '../../components/HighlightCard';
import { Modular } from '../../components/Modular';
import {ParkData, getQuantitySpots, SpotData} from '../../global/scripts/apis';
import {getDBAllPlaces, getReserveSpot, getCurrentSpot} from '../../global/scripts/database';
import {checkTerm} from '../../global/scripts/database';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {getDistance, getPreciseDistance} from 'geolib';
import {getDistanceData, getDistanceStringData, getCurrentLocation} from '../../global/scripts/utils';
import {
  Container,
  HighlightCards,
  LoadContainer
} from './styles'


export function Dashboard({ navigation }){
  const [isLoading, setIsLoading] = useState(true);

  function goNextPage(val : ParkData){  
      window.clearInterval(intervalIdData);
      intervalIdData = 0;
      navigation.navigate("Reserve", val);
  }
  function handleNavigation(val : ParkData){  
    if(val.type == 'open'){
      if(val.quantitySpots == 'Não há vagas!!' || val.quantitySpots == 'Carregando Vagas!!!'){
        Alert.alert(
          "Estabelecimento sem vagas....",
          "No momento este estabelecimento não tem vagas disponiveis, gostaria de tentar reservar a vaga mesmo assim?",
          [
            { text: "Não", onPress: () => console.log("Continue...") },
            { text: "Sim", onPress: () => goNextPage(val) }
          ]
        );
      }else{
        goNextPage(val);
        window.clearInterval(intervalIdData);
      }
    }else{
      Alert.alert(
      "Estabelecimento Fechado",
      "No momento não é possivel reservar uma vaga para este Estabelecimento",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    }
  }
    
  const getLocation = async (result : ParkData[]) => {
    const { latitude , longitude } = await getCurrentLocation();

    console.log(latitude);
    console.log(longitude);
    
    await updateDistance(result, latitude, longitude);
  }

  const theme = useTheme();

  var allParksData = [] as ParkData[];
  const [allParks, setAllParks] = useState<ParkData[]>([]);
  var intervalIdData;

  function getData(){
    // checkTerm().then(function(result1){
      // if(result1){
        getDBAllPlaces().then(function(result){
          getLocation(result);
          if(intervalIdData == 0)
            intervalIdData = setIntervalLocation();
          checkExistReservation();
          setIsLoading(false);
        });
      // }
    // });
  }
  function getDataInterval(){
    // checkTerm().then(function(result1){
      // if(result1){
        getDBAllPlaces().then(function(result){
          getLocation(result);
          checkExistReservation();
          setIsLoading(false);
        });
      // }
    // });
  }
  function checkExistReservation(){
    getReserveSpot().then(function(result : ParkData){
      if(result != null){
        navigation.navigate("WaitingSpot", {pkData: result});
      }
      getCurrentSpot().then(function(result : SpotData){
        if(result != null){
          navigation.navigate("CurrentSpot", {trlData: result.trlData, pkData: result.pkData});
        }
      });
    });
  }

  function setIntervalLocation(){
    return window.setInterval(function(){
      getDataInterval();
    }, 10000)
  }

  async function updateDistance( result : ParkData[], latitude : number, longitude : number){
    let resultNew : ParkData[] = [];
    for(var i=0; i<result.length;i++){
      var item = result[i];
      var inData = {lat: item.latitude, long : item.longitude};
      var outData = {lat: latitude, long : longitude};
      item.distance = getDistanceStringData(inData, outData);
      console.log('item'+item.type);
      if(item.type == 'open'){
        let qtds = await getQuantitySpots(item);
        item.quantitySpots = qtds ; 
      }
      resultNew.push(item);
    }
    console.log(resultNew);
    setAllParks(resultNew);
    allParksData = [];
    allParksData.push(...resultNew);
  }


  useEffect(() => {
    checkTerm();
    getData();
  }, []);

  useFocusEffect(useCallback(() => {
    checkTerm();
    getData()
  },[]));

  return (
    <Container>
      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadContainer> :
        <>
        <Header></Header>
        <HighlightCards>
          {
            allParks.map(val => (
                <TouchableHighlight key={val.id}  onPress={() => handleNavigation(val)}>
                  <HighlightCard
                    id={val.id}
                    type={val.type}
                    title={val.title}
                    distance={val.distance}
                    quantitySpots={val.quantitySpots}
                    latitude={val.latitude}
                    longitude={val.longitude}
                  />
                </TouchableHighlight>         
            ))
          }
        </HighlightCards>   
        <Modular/>
        </>
      }
    </Container>
  )
}