import React from 'react';

import { Button } from 'react-native-elements';
import { Modular } from '../../components/Modular';

import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

import Input from 'react-native-input-style';

import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    View,
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
  function onChangeData(){

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
              <Photo source={{ uri: 'https://avatars.githubusercontent.com/GTeixeirinha7?v=4'}}/>
            </ContainerPhoto>
          </UserInfo>
        </UserWrapper>
      </HeaderStyle>
      <ContentView>
        <ContentViewInput>        
          <Input
            id="name"
            label="Nome Completo"
            required
            contain=" "
            initialValue="Gabriel Teixeira"
            outlined
            borderColor={theme.colors.primary}
            inputStyle={styles.inputs}
            labelStyle={styles.inputsLabel}
            formControlStyle={styles.inputsLabel} 
            onInputChange={onChangeData}
          />

          <Input
            id="car"
            label="Carro"
            required
            contain=" "
            initialValue="Audi A3"
            outlined
            borderColor={theme.colors.primary}
            inputStyle={styles.inputs}
            labelStyle={styles.inputsLabel}
            formControlStyle={styles.inputsLabel} 
            onInputChange={onChangeData}
          />

          <Input
            id="email"
            label="Email"
            required
            contain=" "
            initialValue="gabrielteixeir137@gmail.com"
            outlined
            initia
            borderColor={theme.colors.primary}
            inputStyle={styles.inputs}
            labelStyle={styles.inputsLabel}
            formControlStyle={styles.inputsLabel} 
            onInputChange={onChangeData}
          />
        </ContentViewInput>
        
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          title="Esqueci minha senha"
        />

        <Button
          buttonStyle={styles.buttonAttentionStyle}
          titleStyle={styles.buttonText}
          title="Sair"
        />

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