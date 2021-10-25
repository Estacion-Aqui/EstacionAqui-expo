import { useState } from 'react';
import {getDistance, getPreciseDistance} from 'geolib';
import {ParkData} from '../scripts/apis';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export interface TravelData {
  lat: number;
  long : number;
}
export async function getDistParkData(inData : ParkData){   
    const { latitude , longitude } = await getCurrentLocation();
    return getDistanceData({lat : inData.latitude, long : inData.longitude}, {lat : latitude, long : longitude});
}
export async function getDistanceParkData(inData : ParkData){   
    const { latitude , longitude } = await getCurrentLocation();
    return getDistanceStringData({lat : inData.latitude, long : inData.longitude}, {lat : latitude, long : longitude});
}

export function getDistanceData(inData : TravelData, outData : TravelData){    
    return getDistance(
      {latitude: inData.lat, longitude: inData.long},
      {latitude: outData.lat, longitude: outData.long},
    ) /1000;
}
export function getDistanceStringData(inData : TravelData, outData : TravelData){
    var dis = outData.lat != 0 && outData.long != 0 ? (getDistanceData(inData, outData)).toFixed(2)+' Km de distancia'  : ' - ';    
    return dis;
}
export async function getCurrentLocation(){
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    return location.coords;
}