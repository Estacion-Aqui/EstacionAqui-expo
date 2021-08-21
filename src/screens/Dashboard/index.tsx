import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { HighlightCard } from '../../components/HighlightCard';

import {
  Container,
  HighlightCards
} from './styles'


interface ParkData {
  id: string;
  type: 'open' | 'closed' | 'empty';
  title : string;
  amount : string;
  lastTransaction : string;
}


export function Dashboard({ navigation }){
  
  
    const data = {
        id: String(new Date().getTime()),
        type : 'open',
        title : '2.5 Km de distancia',
        amount : 'Golden Square Shopping',
        lastTransaction : '10 vagas disponíves'
    } as ParkData
    
    const data1 = {
        id: String(new Date().getTime()),
        type : 'closed',
        title : '14.5 Km de distancia',
        amount : 'Termomecanica',
        lastTransaction : 'Estabelecimento Fechado'
    } as ParkData
    
    const data2 = {
        id: String(new Date().getTime()),
        type : 'empty',
        title : '3.5 Km de distancia',
        amount : 'Shopping Metropole',
        lastTransaction : 'Evento Encerrado'
    } as ParkData

  const [allParks, setAllParks] = useState<ParkData[]>([data, data1, data2]);

  function handleNavigation(){
    navigation.navigate("Reserve");
  }

  return (
    <Container>
      <Header></Header>
      <HighlightCards>
        {
          allParks.map(val => (
              <TouchableOpacity onPress={handleNavigation} >
                <HighlightCard
                  type={val.type}
                  title={val.title}
                  amount={val.amount}
                  lastTransaction={val.lastTransaction}
                />
              </TouchableOpacity>         
          ))
        }
      </HighlightCards>   
    </Container>
  )
}