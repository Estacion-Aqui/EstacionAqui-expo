import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Modular } from '../../components/Modular';
import { TransactionCard } from '../../components/TransactionCard';
import * as Progress from 'react-native-progress';
import theme from '../../global/styles/theme';

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

export function OldTravel({ navigation }){
  return (
    <Container> 
      <Header></Header>
      <ContentView>
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