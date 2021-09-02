import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import {getAPIAllPlaces, ParkData} from '../scripts/apis';

export function getDBAllPlaces(){
    const dataKey = '@EstacionAqui:places';
    
    async function getData(){
      const getData = await AsyncStorage.getItem(dataKey);
      return getData;
    }
    async function setData(allParks : ParkData[]){
      await AsyncStorage.setItem(dataKey, JSON.stringify(allParks));
    }
    async function loadData(){
      const getDt = getData();
      getDt.then(function(val){
        var data = JSON.parse(val as any) as ParkData[];
        if(!data){
          let allParks = getAPIAllPlaces(); 
          setData(allParks).then(function(val){
            console.log('Create Data');
            return allParks;
          }).catch(function(val){
          });
        }
      }).catch(function(val){
      });
      return [];
    }

    return loadData();
}