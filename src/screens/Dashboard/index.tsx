import React, { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { ActivityIndicator, Alert  } from 'react-native';
import {  TouchableHighlight } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { HighlightCard } from '../../components/HighlightCard';
import { Modular } from '../../components/Modular';
import {ParkData} from '../../global/scripts/apis';
import {getDBAllPlaces} from '../../global/scripts/database';
import {
  Container,
  HighlightCards,
  LoadContainer
} from './styles'


export function Dashboard({ navigation }){
  const [isLoading, setIsLoading] = useState(true);

  function handleNavigation(val : ParkData){  
    if(val.type == 'open'){
      navigation.navigate("Reserve", val);
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

  const theme = useTheme();

  const [allParks, setAllParks] = useState<ParkData[]>([]);

  function getData(){
    getDBAllPlaces().then(function(result){
      setAllParks(result);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(useCallback(() => {
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
                    amount={val.amount}
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