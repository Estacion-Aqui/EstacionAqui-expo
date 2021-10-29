import { RFValue } from 'react-native-responsive-fontsize';
import React, { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { TransactionCard } from '../../components/TransactionCard';
import { Modular } from '../../components/Modular';
import {  TouchableHighlight } from 'react-native-gesture-handler';
import {TravelData} from '../../global/scripts/apis';
import {getDBLastTravelAllPlaces, getDBEstabData} from '../../global/scripts/database';
import theme from '../../global/styles/theme';

import { HighlightCard } from '../../components/HighlightCard';

import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    View,
    StyleSheet
} from 'react-native';

import {
  Container,
  HighlightCards,
  ContentView,
  LoadContainer
} from './styles'

import { Header } from '../../components/Header';

export function OldTravel({ navigation }){
  const [isLoading, setIsLoading] = useState(true);

  function handleNavigation(val : TravelData){  
    debugger;
    navigation.navigate("Reserve", val);
  }

  const theme = useTheme();

  const [allParks, setTravel] = useState<TravelData[]>([]);
  function getData(){
    setIsLoading(true);
    getDBLastTravelAllPlaces().then(function(result){
      setTravel(result);
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
        allParks.length == 0 ?
            <TransactionCard 
                      id={'123'}
                      type={'open'}
                      title={'Você ainda não possui historico de vagas...\n\nRealize login ou reserve uma vaga!!'}
                      distance={''}
                      quantitySpots={''}
                      latitude={0}
                      longitude={0}/> :
        <>
        </>
      }
          {
            allParks.map(val => (
                <TouchableHighlight key={val.id}>
                  <HighlightCard
                    id={val.estabId}
                    type={'closed'}
                    title={val.day}
                    distance={val.title}
                    quantitySpots={'Vaga Estacionada: ' +val.spotId}
                    latitude={0}
                    longitude={0}
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

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary_select,
        borderRadius: 190,
        alignItems: 'center',
        justifyContent: 'center',
        width: RFValue(250),
        height: RFValue(250),
        margin: 'auto',
        
    },
    buttonText: {
        color: '#FFF',
        fontSize: RFValue(23),
        fontWeight: 'bold',
    },
});