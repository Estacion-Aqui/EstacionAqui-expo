import React, { useState, useEffect } from 'react';
import { Alert } from "react-native";
import { TouchableOpacity,TouchableNativeFeedback, TouchableHighlight } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { HighlightCard } from '../../components/HighlightCard';
import { Modular } from '../../components/Modular';
import uuid from 'react-native-uuid';
import theme from '../../global/styles/theme';
import {ParkData} from '../../global/scripts/apis';
import {getDBAllPlaces} from '../../global/scripts/database';
import {
  Container,
  HighlightCards
} from './styles'


export function Dashboard({ navigation }){

  function handleNavigation(val : ParkData){
    navigation.navigate("Reserve", val);
  }
  const getDataPlaces = async function(){
    return getDBAllPlaces();
  }
  const [allParks, setAllParks] = useState<ParkData[]>([]);
  let getData = true;
    if(getData){
      getData = false;
      //getDataPlaces().then(function(value){
      //  setAllParks(value);
      //  console.log(value);
      //}).catch(function(value){
//
      //});
    }

  return (
    <Container>
      <Header></Header>
      <HighlightCards>
        {
          allParks.map(val => (
              <TouchableHighlight key={val.id}  onPress={() => handleNavigation(val)}>
                <HighlightCard
                  id={val.id}
                  type={val.type}
                  title={val.title}
                  amount={val.amount}
                  quantitySpots={val.quantitySpots}
                />
              </TouchableHighlight>         
          ))
        }
      </HighlightCards>   
      <Modular/>
    </Container>
  )
}