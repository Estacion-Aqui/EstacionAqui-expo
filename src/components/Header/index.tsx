import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  HeaderStyle,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  LogoutButton
} from './styles'

type NavigationProps = {
   navigate:(screen:string) => void;
}

export function Header(){
  const navigation = useNavigation<NavigationProps>()

  function handleNavigationSetup(){
    navigation.navigate('Config.');
  }
  return (
    <Container onTouchStart={handleNavigationSetup}>
      <HeaderStyle>
        <UserWrapper>
           <UserInfo>
            <Photo
              source={{ uri: 'https://avatars.githubusercontent.com/GTeixeirinha7?v=4'}}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Teixeira</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power"/>
          </LogoutButton>
        </UserWrapper>
      </HeaderStyle>
    </Container>
  )
}