import { useState } from 'react';
import axios  from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

var token = '';
const api_key = 'SmartParkingnmdtc78b87trfio8ufy';

const api = axios.create({
    baseURL : 'https://estacion-aqui.herokuapp.com/api/v1',
    headers: {Authorization: `Bearer ${token}` }
});

const api_oauth = axios.create({
    baseURL : 'https://estacion-aqui.herokuapp.com/api/v1'
});

export interface TravelData {
  id: string;
  spotSector : string;
  spotId : string;
  estabId : string;
  day : string;
  confirmed: Boolean;
  cancelled: Boolean;
}

export interface ParkData {
  id: string;
  type: 'open' | 'closed' | 'empty';
  title : string;
  distance : string;
  quantitySpots : string;
  latitude : number;   
  longitude : number;
}
export interface UserData {
  id: string;
  name : string;
  car : string;
  plate : string;
  password : string;
  email : string;
}

export function oauth(){
    try {
        api_oauth.post('/oauth', {api_key: api_key})
        .then(function(resp){
            console.log('resp'+resp);
            token = resp.data.token;
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        }).finally(()=> {
        });
    } catch (error) {
        console.log(error);
    }   
}
export async function getAPIAllPlaces(pkData :ParkData[]){
    var respMap = new Map();
    try {
        var resp  = await api.get('/places');
            console.log('resp'+resp);
            var respData = (resp.data);
            
            respData.forEach(function(item : ParkData){
                
                item.latitude = parseFloat( item.latitude );
                item.longitude = parseFloat( item.longitude );
                respMap.set(item.id, item);
                pkData.push(item);
            }, {respMap})

            pkData.forEach(function(item){
                if(respMap.has(item.id)){
                    item.type          = respMap.get(item.id).type;
                    item.title         = respMap.get(item.id).title;
                    // item.distance        = respMap.get(item.id).amount;
                    item.quantitySpots = 'Carregando Vagas!!!';
                    item.latitude = parseFloat(respMap.get(item.id).latitude);
                    item.longitude = parseFloat(respMap.get(item.id).longitude);
                }else{
                    item.type = 'closed';
                }
                respMap.set(item.id, item);
            });
            return respMap;
    } catch (error) {
        console.log(error);
    }  
    return respMap;

}
export async function lastTravels(usId : String){
    var respData : TravelData[];
    respData = [];
    try {
        var resp  = await api.get(`/travelData?usId=${usId}`);
        respData = (resp.data);
    } catch (error) {
        console.log(error);
    }   
    return respData;
}
export async function checkLogin(emails : string, password: string){
    try {
        // var resp = await api.post('/checkLogin', ({email: emails, password: password}));
        var resp = await api.get('/checkLogin');
        console.log('resp'+resp.data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }   
    return null;
}
export async function sendUserData(us : UserData){
    try {
        // var resp = await api.post((us.id ? '/updateData' : '/insertData'), JSON.stringify(us));
        var resp = await api.get((us.id ? '/updateData' : '/insertData'));
        console.log('resp'+resp.data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }   
    return null;
}
export async function reserveSpot(parkId : string){
    var respData : TravelData;


    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();

    respData ={
        id : '',
        spotId : '',
        spotSector : '',
        estabId: parkId,
        day : ( date + '/' + month + '/' + year),
        cancelled: false,
        confirmed: false
    }
    try {
        // var resp = await api.get(`/reserveSpot?user=${usId}&parkId=${parkId}`);
        var resp = await api.get(`/spots/free/${parkId}`);

        // var respSector = await api.get(`/sectors/${resp.data.sector}`);

        respData.id = resp.data?.id;
        respData.spotId = resp.data.message ? null : resp.data?.title;
        respData.spotSector = '23';//respSector.data?.code;
        return respData;
    } catch (error) {
        console.log(error);
    }   
    return respData;
}
export async function confirmSpot( spotId : String){
    return await spotData(`/spots/confirmSpot/${spotId}`);
}
export async function cancelSpot(spotId : String){
    return await spotData(`/spots/cancelSpot/${spotId}`);
}
export async function checkSpot(spotId : String){
    try {
        var resp  = await api.get(`/spots/${spotId}`);
        console.log('resp'+resp);
        return resp.data;
    } catch (error) {
        console.log(error);
    }   
    return null;
}
export async function spotData(endpoint : string){
    try {
        var resp  = await api.post(endpoint);
        console.log('resp'+resp);
        return resp.data;
    } catch (error) {
        console.log(error);
    }   
    return null;
}

export async function getQuantitySpots(pks : ParkData){
    var resultData = 'Não há vagas!!';
    try {
        var resp  = await api.get(`/spots/place/${pks.id}`);
        console.log('resp'+resp);
        let qtdSpots = 0;
        resp.data.forEach(function(item){
            if(item.status){
                qtdSpots++;
            }
        });    
        if(qtdSpots)     
            return `${qtdSpots} vagas disponíveis`;
    } catch (error) {
        console.log(error);
    }  
    return resultData;
}