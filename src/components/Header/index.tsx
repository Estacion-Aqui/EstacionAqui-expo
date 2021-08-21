import React from 'react';

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

export function Header(){
  return (
    <Container>
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