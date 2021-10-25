import React, { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {TravelData, ParkData, UserData} from '../../global/scripts/apis';
import {getDBEstabData, checkUserData} from '../../global/scripts/database';

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

  const [usData, setData] = useState<UserData>();
  function getData(){
    checkUserData().then(function(result){
      if(result != null)
        setData(result);
      else
        setData(undefined);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(useCallback(() => {
    getData()
  },[]));

  return (
    <Container onTouchStart={handleNavigationSetup}>
      <HeaderStyle>
        <UserWrapper>
           <UserInfo>
            {/* <Photo
              source={{ uri: 'https://www.pinpng.com/pngs/m/341-3415688_no-avatar-png-transparent-png.png'}}
            /> */}
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{usData == null ? 'Visitante' : usData.name}</UserName>
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