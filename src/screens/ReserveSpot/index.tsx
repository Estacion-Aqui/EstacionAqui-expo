import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionCard } from '../../components/TransactionCard';

import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    View,
    StyleSheet
} from 'react-native';

import {
  Container,
  ContentView
} from './styles'

import { Header } from '../../components/Header';

export function ReserveSpot({ navigation }){
  return (
    <Container>
      <Header></Header>
      <ContentView>
        <TransactionCard />
        <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
              Navegar/Reservar
          </Text>
        </TouchableOpacity>
      </ContentView>
    </Container>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#A370F7',
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