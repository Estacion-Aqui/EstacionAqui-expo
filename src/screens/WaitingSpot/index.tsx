import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionCard } from '../../components/TransactionCard';
import * as Progress from 'react-native-progress';

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
        <Progress.Bar indeterminate={true} animated ={true} indeterminateAnimationDuration={2000}/>
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