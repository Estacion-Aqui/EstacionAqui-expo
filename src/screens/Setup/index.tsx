import { Button } from 'react-native-elements';
import { Modular } from '../../components/Modular';

import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

import React, { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {TravelData, ParkData, UserData} from '../../global/scripts/apis';
import {getDBEstabData, checkUserData, logouts, setUserData, checkDataLogin} from '../../global/scripts/database';

import { useNavigation } from '@react-navigation/native';

import {
    ActivityIndicator, 
    Alert,
    TextInput,
    StyleSheet
} from 'react-native';

import {
  Container,
  ContentViewInput,
  ContentView,
  HeaderStyle,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  LogoutButton,
  ContainerPhoto
} from './styles'

import { Header } from '../../components/Header';

export function Setup({ navigation }){

  const [usData, setData] = useState<UserData>();
  const [usDataName, setName] = useState<string>();
  const [usDataCar, setCar] = useState<string>();
  const [usDataEmail, setEmail] = useState<string>();
  const [usDataPassword, setPassword] = useState<string>();
  const [usDataPlate, setPlate] = useState<string>();
  function getData(){
    checkUserData().then(function(result){
      if(result != null)
        setData(result);
      else
        setData(undefined);
    });
  }

 function logout(){
    logouts();
    setData(undefined);
    setName('');
    setCar('');
    setEmail('');
    setPassword('');
    setPlate('');
 }
 function loginSucess(item : UserData){
  Alert.alert(
    "Login Realizado com Sucesso",
    "",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
  setData({id : item.id, user : item.user,email : item.email,car : item.car,password : item.password, plate : item.plate});

 }
 function checkData(){
   if(usDataName && usDataCar && usDataEmail && usDataPassword && usDataPlate){
    setUserData('', usDataName, usDataCar, usDataEmail, usDataPassword, usDataPlate).then(function(item){
      if(!item.id){
        Alert.alert(
          "Usuario Invalido",
          "Usuario invalido favor realizar novamente a solicitação",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }else{
        loginSucess(item);
      }
    })

   }else{
      Alert.alert(
      "Preencha todos os dados",
      "Favor preencher os dados de Nome, Email, Placa do Carro, Carro e Senha!!",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
   }

 }
 function checkDataLogins(){
   if(usDataEmail && usDataPassword){
    checkDataLogin(usDataEmail, usDataPassword).then(function(item){
      if(!item.id){
        Alert.alert(
          "Usuario Invalido",
          "Usuario invalido favor realizar novamente a solicitação",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }else{
        setName(item.user);
        setCar(item.car);
        setPlate(item.plate);
        loginSucess(item);
      }
    })
   }else{
      Alert.alert(
      "Preencha todos os dados",
      "Favor preencher os dados de Email e Senha!!",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
   }
 }

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(useCallback(() => {
    getData()
  },[]));
  return (
    <Container> 
      <HeaderStyle>
        <UserWrapper>
           <UserInfo>
            <ContainerPhoto> 
              <LogoutButton onPress={() => {}}>
                <Icon name="edit"/>
              </LogoutButton>
              {/* https://avatars.githubusercontent.com/GTeixeirinha7?v=4 */}
              {/* <Photo source={{ uri: 'https://www.pinpng.com/pngs/m/341-3415688_no-avatar-png-transparent-png.png'}}/> */}
            </ContainerPhoto>
          </UserInfo>
        </UserWrapper>
      </HeaderStyle>
      <ContentView>
        <ContentViewInput>        
          <TextInput
            placeholder="Nome Completo"
            onChangeText={text => setName(text)}
            defaultValue={usData == null ? "" : usData.user}
            style={styles.inputs}
            keyboardType="default"
          />
          <TextInput
            placeholder="Carro"
            onChangeText={text => setCar(text)}
            defaultValue={usData == null ? "" : usData.car}
            style={styles.inputs}
            keyboardType="default"
          />
          <TextInput
            placeholder="Placa do Carro"
            onChangeText={text => setPlate(text)}
            defaultValue={usData == null ? "" : usData.plate}
            style={styles.inputs}
            keyboardType="default"
          />
          <TextInput
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            defaultValue={usData == null ? "" : usData.email}
            style={styles.inputs}
            keyboardType="default"
          />
        </ContentViewInput>
        {
          usData == null ? 
        <>
          <ContentViewInput>     
          <TextInput
            placeholder="Senha"
            onChangeText={text => setPassword(text)}
            style={styles.inputs}
            secureTextEntry={true}
            keyboardType="default"
          />
          </ContentViewInput>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            onPress = {() => checkDataLogins()}
            title="Entrar"
          />

          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            onPress = {() => checkData()}
            title="Se Cadastrar"
          />
        </>
          :
        <>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            onPress = {() => navigation.navigate('ChangePassword', {usId: usData.id})}
            title="Mudar Senha"
          />
          <Button
            buttonStyle={styles.buttonAttentionStyle}
            titleStyle={styles.buttonText}
            title="Sair"
            onPress = {() => logout()}
          />
        </>
        }

      </ContentView> 
      <Modular/>
    </Container>
  )
}

const styles = StyleSheet.create({
    inputs: {
      width: '100%',
      fontSize: RFValue(12),
      textAlignVertical: 'center',
      backgroundColor: theme.colors.background,
      color: theme.colors.empty,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    buttonAttentionStyle: {
      backgroundColor: theme.colors.attention,
      paddingRight: RFValue(15),
      paddingLeft: RFValue(15),
      margin: RFValue(15),
    },
    buttonStyle: {
      backgroundColor: theme.colors.primary,
      paddingRight: RFValue(15),
      paddingLeft: RFValue(15),
      margin: RFValue(15),
    },
    inputsLabel: {
      backgroundColor: theme.colors.background,
      color: theme.colors.empty
    },
    buttonText: {
        color: '#FFF',
        fontSize: RFValue(14),
        fontWeight: 'bold',
    },
});