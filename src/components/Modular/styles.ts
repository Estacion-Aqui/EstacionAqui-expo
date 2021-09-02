import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Modulars = styled.Text`
  font-size: ${RFValue(10)}px;
  align-self: flex-end;
  background-color: ${({ theme }) => theme.colors.primary_select_light};
  border-top-left-radius: ${RFValue(3)}px;
  padding-left: ${RFValue(3)}px;
  color:  ${({ theme }) => theme.colors.empty_light};
  font-family: ${({ theme }) => theme.fonts.regular};
`;