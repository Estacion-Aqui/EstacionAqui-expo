import React, {useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Modular } from '../../components/Modular';
import { ActivityIndicator, Alert  } from 'react-native';
import { TransactionCard } from '../../components/TransactionCard';
import theme from '../../global/styles/theme';
import {reserveSpot, ParkData, lastTravels, TravelData, UserData} from '../../global/scripts/apis';

import {
    TouchableOpacity,
    TouchableOpacityProps,
    TouchableHighlight,
    Text,
    View,
    StyleSheet
} from 'react-native';

import {
  Container,
  ContentView,
  LoadContainer
} from './styles'

import { Header } from '../../components/Header';

export function ReserveSpot({ route, navigation }){
  const [isLoading, setIsLoading] = useState(false);
  
  
  const pkData = route.params;

  function handleNavigation(val : ParkData){    
    setIsLoading(true);
      navigation.navigate("WaitingSpot", {pkData: val});
  }
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
          <ContentView>
            <TransactionCard 
                      id={pkData.id}
                      type={pkData.type}
                      title={pkData.title}
                      amount={pkData.amount}
                      quantitySpots={pkData.quantitySpots}
                      latitude={pkData.latitude}
                      longitude={pkData.longitude}/>
            <TouchableHighlight
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => handleNavigation(pkData)}
            >
              <Text style={styles.buttonText}>
                  Navegar/Reservar
              </Text>
            </TouchableHighlight>
          </ContentView> 
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