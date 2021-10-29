import React, { useCallback, useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionCard } from '../../components/TransactionCard';
import { Modular } from '../../components/Modular';
import {ParkData} from '../../global/scripts/apis';
import {removeCurrentSpot} from '../../global/scripts/database';

import { Button } from 'react-native-elements';
import theme from '../../global/styles/theme';
import { useFocusEffect } from '@react-navigation/native';

import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import {
  Container,
  Text,
  TextLow,
  Title,
  ContentView
} from './styles'

import { Header } from '../../components/Header';

export function EndFlow({ route, navigation }){
  
  const  pkData  = route.params.pkData;
          
  function handleNavigation(){  
    navigation.navigate("Home");
  }
  function getSearchName(){
    return pkData.title.split(' ').join('+');
  }
  useFocusEffect(useCallback(() => {
    removeCurrentSpot();
  },[]));

  useEffect(() => {
    removeCurrentSpot();
  }, []);
  
  return (
    <Container>
      <Header></Header>
      <ContentView>
        <View style={styles.viewSpots}>
          <View style={styles.viewSpot}>
          <Text>Obrigado por Utilizar o EstacionAqui!!!</Text>
          <TextLow>Não se esqueça de visitar mais informações sobre o estabelecimento no link abaixo:</TextLow>
          <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://google.com/search?q='+getSearchName())}>{pkData.title}</Text>
          <Button
            onPress = {() => handleNavigation()}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            title="Voltar ao Inicio"
          />
        </View>
        </View>
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
    width: '75%',    
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewSpots: {
    width: '100%',    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFValue(15),
    marginTop: RFValue(125)
  },
    buttonStyle: {
      backgroundColor: theme.colors.primary,
      paddingRight: RFValue(15),
      paddingLeft: RFValue(15),
      margin: RFValue(15),
    },
});