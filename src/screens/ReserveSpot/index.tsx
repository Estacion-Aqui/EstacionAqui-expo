import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Modular } from '../../components/Modular';
import { TransactionCard } from '../../components/TransactionCard';
import theme from '../../global/styles/theme';
import {ParkData} from '../../global/scripts/apis';

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
  ContentView
} from './styles'

import { Header } from '../../components/Header';

export function ReserveSpot({ route, navigation }){
  
  
  const { pkData } = route.params;

  function handleNavigation(val : ParkData){
    navigation.navigate("WaitingSpot", val);
  }
  return (
    <Container>
      <Header></Header>
      <ContentView>
        <TransactionCard 
                  id={pkData.id}
                  type={pkData.type}
                  title={pkData.title}
                  amount={pkData.amount}
                  quantitySpots={pkData.quantitySpots}/>
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