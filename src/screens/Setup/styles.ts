import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler';

export const ContentView = styled.View.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  flex: 1;
  margin-top: ${RFPercentage(2)}px;
`;

export const ContentViewInput = styled.View.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  width: 70%;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
`;

export const ContainerPhoto = styled.View`
`;
export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderStyle = styled.View`
  width: 100%;
  height: ${RFPercentage(25)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
    width: 100%;
    
    padding: 0 24px;
    margin-top: ${getStatusBarHeight() + RFValue(5)}px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const UserInfo = styled.View`
    width: 100%;
    margin-top: 45px;
    flex-direction: column;
    align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;

  border-radius: 40px;
`;

export const User = styled.View`
  width: 100%;
  margin-left: 17px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.primary_select};

  font-size: ${RFValue(18)}px;
  padding-right:  ${RFValue(3)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.primary_select};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Icon = styled(Feather)`
`;

export const ReserveSpotAction = styled.TouchableHighlight``;

export const HighlightCards = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  height: 82%;

  position: absolute;
  margin-top: ${RFPercentage(15)}px;
`;

export const Transactions = styled.View`
  flex: 1%;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(39)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: white;
  margin-bottom: 16px;
`;

export const LogoutButton = styled(BorderlessButton)`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 99;
`;
