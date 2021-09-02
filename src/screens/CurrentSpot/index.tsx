import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionCard } from '../../components/TransactionCard';
import { Modular } from '../../components/Modular';
import {ParkData} from '../../global/scripts/apis';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Button } from 'react-native-elements';
import theme from '../../global/styles/theme';

import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import {
  Container,
  Text,
  ContentView
} from './styles'

import { Header } from '../../components/Header';

export function CurrentSpot({ route, navigation }){
  
const MySwal = withReactContent(Swal)

function teste(){
  MySwal.fire({
    title: <p>Hello World</p>,
    footer: 'Copyright 2018',
    didOpen: () => {
      MySwal.clickConfirm()
    }
  }).then(() => {
    return MySwal.fire(<p>Shorthand works too</p>)
  })
}

  let stateRegion ={
      latitude: -23.683450,
      longitude: -46.558028,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0421,
    };

    const { pkData } = route.params;

  function handleBack(){
    // navigation.goBack();
    navigation.navigate("CurrentSpot");
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
        <Text>Encontramos uma Vaga!!!</Text>
        <View style={styles.viewSpots}>
          <View style={styles.viewSpot}>
            <Text style={styles.spottext}>Setor</Text>
            <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            >
              <Text style={styles.spotTextInside}>
                  A1
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewSpot}>
            <Text style={styles.spottext}>Vaga</Text>
            <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            >
              <Text style={styles.spotTextInside}>
                  23
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title="Estacionei!!"
        />

        <Button
          buttonStyle={styles.buttonAttentionStyle}
          titleStyle={styles.buttonText}
          title="A vaga está ocupada..."
        />
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
    width: '50%',    
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewSpots: {
    width: '100%',    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFValue(15)
  },
    buttonStyle: {
      backgroundColor: theme.colors.primary,
      paddingRight: RFValue(15),
      paddingLeft: RFValue(15),
      margin: RFValue(15),
    },
});