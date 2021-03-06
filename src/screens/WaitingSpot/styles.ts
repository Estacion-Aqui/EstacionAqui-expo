import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentView = styled.View.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0;

  position: absolute;
  margin-top: ${RFPercentage(15)}px;
`;


export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.primary_select};
  margin-top:${RFValue(0)}px; 
  font-size: ${RFValue(14)}px;
  width:  ${RFValue(280)}px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
`;