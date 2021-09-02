import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { TransactionCard } from '../../components/TransactionCard';
import * as Progress from 'react-native-progress';
import { Modular } from '../../components/Modular';
import {ParkData} from '../../global/scripts/apis';

import { Button } from 'react-native-elements';
import theme from '../../global/styles/theme';
import MapView, { Marker } from 'react-native-maps';

import {
    StyleSheet  
} from 'react-native';

import {
  Container,
  Text,
  ContentView
} from './styles'

import { Header } from '../../components/Header';

export function WaitingSpot({ route, navigation }){
  let stateRegion ={
      latitude: -23.683450,
      longitude: -46.558028,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0421,
    };
    
  function handleBack(){
    navigation.goBack();
    // navigation.navigate("CurrentSpot");
  }
  const { pkData } = route.params;

  function handleNavigation(val : ParkData){
    navigation.navigate("CurrentSpot", val);
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
        <Text>Ao se aproximar do local iremos te notificar da reserva</Text>
        <MapView style={styles.map} region={stateRegion} > 
          <Marker
            key={pkData.id}
            coordinate={{ latitude : -23.683450 , longitude : -46.558028 }}
            title={pkData.amount}
            description={pkData.quantitySpots}
          />
        </MapView>
        
        <Progress.Bar 
          indeterminate={true} 
          animated ={true} 
          indeterminateAnimationDuration={4000} 
          width={RFValue(250)}
          height={RFValue(10)}/>
        
        <Button
          buttonStyle={styles.buttonAttentionStyle}
          titleStyle={styles.buttonText}
          title="Cancelar"
          onPress={() => handleNavigation(pkData)}
        />

      </ContentView> 
      <Modular/>
    </Container>
  )
}

const styles = StyleSheet.create({

  map: {
    width: RFValue(250),
    height: RFValue(200),
    marginTop: RFValue(15),
    marginBottom: RFValue(25),
  },
    buttonAttentionStyle: {
      backgroundColor: theme.colors.attention,
      paddingRight: RFValue(20),
      paddingLeft: RFValue(20),
      margin: RFValue(15),
    },
    buttonText: {
        color: '#FFF',
        fontSize: RFValue(18),
        fontWeight: 'bold',
    },
});