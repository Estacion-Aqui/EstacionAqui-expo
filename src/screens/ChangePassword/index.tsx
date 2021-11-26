import { Button } from 'react-native-elements';
import { Modular } from '../../components/Modular';

import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

import React, { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {TravelData, ParkData, UserData, changePasswordData} from '../../global/scripts/apis';
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

export function ChangePassword({ route, navigation }){

  const [usId, setUsId] = useState<String>(route.params.usId);
  const [password, setPassword] = useState<string>();
  const [passwordNew, setPasswordNew] = useState<string>();
  const [passwordNewConfirmation, setPasswordNewConfirmation] = useState<string>();
 function loginSucess(){
  Alert.alert(
    "Senha alterada com Sucesso",
    "",
    [
      { text: "OK", onPress: () => navigation.navigate('Setup') }
    ]
  );
 }
 function loginError(){
  Alert.alert(
    "Informações incorretas, digite novamente!!",
    "",
    [
      { text: "OK", onPress: () => console.log('Setup') }
    ]
  );
 }
 function changePassword(){
    if(password && passwordNew && passwordNewConfirmation && passwordNew == passwordNewConfirmation){
      changePasswordData(usId, password, passwordNew, passwordNewConfirmation).then(function(item){
        if(item?.message == 'Password changed with success'){
          loginSucess();
        }else{
          loginError();
        }
      });
    }else{
      Alert.alert(
        "Digite todas as informações necessárias, verifique os dados digitados",
        "",
        [
          { text: "OK", onPress: () => console.log('Setup') }
        ]
      );
    }
 }

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
            placeholder="Senha Atual"
            onChangeText={text => setPassword(text)}
            style={styles.inputs}
            secureTextEntry={true}
            keyboardType="default"
          />
          <TextInput
            placeholder="Nova Senha"
            onChangeText={text => setPasswordNew(text)}
            style={styles.inputs}
            secureTextEntry={true}
            keyboardType="default"
          />
          <TextInput
            placeholder="Confirmar Nova Senha"
            onChangeText={text => setPasswordNewConfirmation(text)}
            style={styles.inputs}
            secureTextEntry={true}
            keyboardType="default"
          />
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonText}
            onPress = {() => changePassword()}
            title="Mudar Senha"
          />
        </ContentViewInput>
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