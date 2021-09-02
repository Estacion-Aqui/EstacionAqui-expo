import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export interface ParkData {
  id: string;
  type: 'open' | 'closed' | 'empty';
  title : string;
  amount : string;
  quantitySpots : string;
}

export function getAPIAllPlaces(){
    const data = {
        id: String(uuid.v4()),
        type : 'open',
        title : '2.5 Km de distancia',
        amount : 'Termomecanica',
        quantitySpots : '10 vagas disponíves'
    } as ParkData
    
    const data1 = {
        id: String(uuid.v4()),
        type : 'closed',
        title : '14.5 Km de distancia',
        amount : 'Termomecanica - Ensino Fundamental',
        quantitySpots : 'Estabelecimento Fechado'
    } as ParkData
    
    const data2 = {
        id: String(uuid.v4()),
        type : 'empty',
        title : '3.5 Km de distancia',
        amount : 'Termomecanica - Apresentação da Banda 2021',
        quantitySpots : 'Evento Encerrado'
    } as ParkData

    const data3 = {
        id: String(uuid.v4()),
        type : 'empty',
        title : '3.5 Km de distancia',
        amount : 'Shopping Metropole',
        quantitySpots : 'Evento Encerrado'
    } as ParkData
    
    const data4 = {
        id: String(uuid.v4()),
        type : 'empty',
        title : '3.5 Km de distancia',
        amount : 'Shopping Metropole',
        quantitySpots : 'Evento Encerrado'
    } as ParkData

    
  return [data, data1, data2, data3, data4];
}