import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {useNetInfo} from "@react-native-community/netinfo";

import {getAPIAllPlaces, ParkData, lastTravels, TravelData, UserData, sendUserData, checkLogin, confirmSpot, cancelSpot, checkSpot} from '../scripts/apis';

const placesId = '@EstacionAqui:places';
const historicId = '@EstacionAqui:historic';
const currentSpot = '@EstacionAqui:currentSpot';
const userId = '@EstacionAqui:user';

export async function getDBAllPlaces(){
    // const netInfo = useNetInfo();

    // await AsyncStorage.removeItem(placesId);
    let response = await AsyncStorage.getItem(placesId);

    let getDt = response ? JSON.parse(response) : [];

    const getDtFormatted: ParkData[] = getDt ? getDt.map((item: ParkData) => { return item }) : getDt;

    var respMap = new Map();
      respMap = await getAPIAllPlaces(getDtFormatted);
    /*if(netInfo.isConnected){
      respMap = await getAPIAllPlaces(getDtFormatted);
    }else{      
      getDtFormatted.forEach(function(item : ParkData){
          respMap.set(item.id, item);
      }, {respMap})
    }*/

    var allParks : ParkData[];
    allParks = [];

    respMap.forEach(function(item){
        allParks.push(item);
    });

    await AsyncStorage.setItem(placesId, JSON.stringify(allParks));

    return allParks;
}

export async function getDBLastTravelAllPlaces(){
    // const netInfo = useNetInfo();

    let response = await AsyncStorage.getItem(historicId);

    let getDt = response ? JSON.parse(response) : [];

    var getDtFormatted: TravelData[] = getDt ? getDt.map((item: TravelData) => { return item }) : getDt;
    // if(netInfo.isConnected){
      
      let responseUser = await AsyncStorage.getItem(userId);
      let responseData : UserData;
      if(responseUser){
          responseData = JSON.parse(responseUser);
      }else{
        responseData = {
          id: '',
          name: '',
          email: '',
          password: '',
          car: ''
        };
      }
        
      getDtFormatted = await lastTravels(responseData.id);
    // }

    await AsyncStorage.setItem(historicId, JSON.stringify(getDtFormatted));

    return getDtFormatted;
}

export async function getDBEstabData(estabId : string){
    // await AsyncStorage.removeItem(placesId);
    let response = await AsyncStorage.getItem(placesId);

    let getDt = response ? JSON.parse(response) : [];

    const getDtFormatted: ParkData[] = getDt ? getDt.map((item: ParkData) => { return item }) : getDt;
    
    let returnData : ParkData;
    
      returnData = {
        id: '',
        type: 'open',
        title : '',
        amount : '',
        quantitySpots : '',
        latitude : 0,
        longitude : 0
      };
    getDtFormatted.forEach(function(item){
      if(item.id == estabId){
        returnData = item; 
        return;
      }
    
    });
    return returnData;

}

export async function setUserData(id : string,name : string, car : string, email : string, password : string){
  var respData = await sendUserData({id: id, name: name, car: car, email: email, password: password});

  await AsyncStorage.setItem(userId, JSON.stringify(respData));
  var returnData :  UserData;
  returnData = respData;

  return returnData;
}

export async function checkDataLogin(email : string, password : string){
  var respData = await checkLogin(email, password);
  var returnData :  UserData;
  returnData = respData;

  if(returnData.id)
    await AsyncStorage.setItem(userId, JSON.stringify(respData));

  return returnData;
}

export async function checkUserData(){
  var returnData :  UserData;
  returnData = {
    id : "",
    name : "",
    car : "",
    password : "",
    email : ""
  }
  var returnDataJSON = await AsyncStorage.getItem(userId);
  if(returnDataJSON != null)
    returnData = JSON.parse(returnDataJSON);
  else
    return null;
}
export async function logouts(){
  await AsyncStorage.removeItem(userId);
}

export async function confirmSpotDB(parkId : String, spotId : String, usId : String){
  var respData = await confirmSpot(parkId, spotId, usId);
  var returnData :  UserData;
  returnData = respData;

  if(returnData.id)
    await AsyncStorage.setItem(userId, JSON.stringify(respData));

  return returnData;
}