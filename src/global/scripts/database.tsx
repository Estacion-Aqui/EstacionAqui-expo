import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { ActivityIndicator, Alert, PermissionsAndroid, Platform  } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import {getAPIAllPlaces, ParkData, lastTravels, TravelData, UserData, sendUserData, checkLogin, confirmSpot, cancelSpot, checkSpot, SpotData, saveHistoryAPI} from '../scripts/apis';

const placesId = '@EstacionAqui:places';
const historicId = '@EstacionAqui:historic';
const currentSpot = '@EstacionAqui:currentSpot';
const currentSpotData = '@EstacionAqui:currentSpotData';
const userId = '@EstacionAqui:user';
const userTermId = '@EstacionAqui:userTerm';

export async function getDBAllPlaces(){
    var isConnected = await NetInfo.fetch().then(state => {
      return state.isConnected;
    });

    // await AsyncStorage.removeItem(placesId);
    let response = await AsyncStorage.getItem(placesId);

    let getDt = response ? JSON.parse(response) : [];

    const getDtFormatted: ParkData[] = getDt ? getDt.map((item: ParkData) => { return item }) : getDt;

    var respMap = new Map();
    if(isConnected){
      respMap = await getAPIAllPlaces(getDtFormatted);
    }else{      
      getDtFormatted.forEach(function(item : ParkData){
          respMap.set(item.id, item);
      }, {respMap})
    }

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
          user: '',
          plate: '',
          email: '',
          password: '',
          car: ''
        };
      }
        
      getDtFormatted = await lastTravels(responseData?.id);
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
        distance : '',
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

export async function setUserData(id : string,name : string, car : string, email : string, password : string, plate: string){
  var respData = await sendUserData({id: id, user: name, car: car, email: email, password: password, plate: plate});

  await AsyncStorage.setItem(userId, JSON.stringify(respData));
  var returnData :  UserData;
  returnData = respData;

  return returnData;
}

export async function checkDataLogin(email : string, password : string){
  var respData = await checkLogin(email, password);
  var returnData :  UserData;
  returnData = respData;

  if(returnData?.id)
    await AsyncStorage.setItem(userId, JSON.stringify(respData));

  return returnData;
}

export async function checkUserData(){
  var returnData :  UserData;
  returnData = {
    id : "",
    plate : "",
    user : "",
    car : "",
    password : "",
    email : ""
  }
  var returnDataJSON = await AsyncStorage.getItem(userId);
  if(returnDataJSON != null){
    returnData = JSON.parse(returnDataJSON);
    return returnData;
  }else
    return null;
}
export async function logouts(){
  await AsyncStorage.removeItem(userId);
}

export async function confirmSpotDB(parkId : String, spotId : String, usId : String){
  var respData = await confirmSpot(parkId);
  var returnData :  UserData;
  returnData = respData;

  if(returnData?.id)
    await AsyncStorage.setItem(userId, JSON.stringify(respData));

  return returnData;
}

export async function setReserveSpot(dts : ParkData){
  await AsyncStorage.setItem(currentSpot, JSON.stringify(dts));
}

export async function removeReserveSpot(){
  await AsyncStorage.removeItem(currentSpot);
}
export async function getReserveSpot(){
  var returnDataJSON = await AsyncStorage.getItem(currentSpot);
  if(returnDataJSON == null){   
    return returnDataJSON;   
  }else{
    return JSON.parse(returnDataJSON);
  }
}

export async function setCurrentSpot(dts : SpotData){
  await AsyncStorage.setItem(currentSpotData, JSON.stringify(dts));
}
export async function removeCurrentSpot(){
  await AsyncStorage.removeItem(currentSpotData);
}
export async function getCurrentSpot(){
  var returnDataJSON = await AsyncStorage.getItem(currentSpotData);
  if(returnDataJSON == null){   
    return null;   
  }else{
    return JSON.parse(returnDataJSON);
  }
}

export async function checkTerm(){
  var accepts = { accept : true};
  var returnDataJSON = await AsyncStorage.getItem(userTermId);
  if(!returnDataJSON){      
    if(Platform.OS !== 'ios') {
      const granted = await Location.requestForegroundPermissionsAsync();
      if (granted.granted) {
        await AsyncStorage.setItem(userTermId, JSON.stringify(accepts))
      }
    }
  }
}
export async function saveHistory(places : TravelData){
  var returnDataJSON = await AsyncStorage.getItem(userId);
  if(returnDataJSON != null){  
    const getDtFormatted: UserData = JSON.parse(returnDataJSON) ;
    if(getDtFormatted && getDtFormatted.id)
      await saveHistoryAPI(getDtFormatted.id, places);
    await getDBLastTravelAllPlaces();
  }
}