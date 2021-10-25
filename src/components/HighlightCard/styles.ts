import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome5 } from '@expo/vector-icons';

interface TypeProps {
  type: 'open' | 'closed' | 'empty';
}

export const Container = styled.TouchableOpacity<TypeProps>`
  background-color: ${({ theme, type }) =>
  type === 'empty' ? theme.colors.secondary_light :  theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 15px;
  padding: ${RFValue(15)}px ${RFValue(15)}px;
  margin-bottom: 25px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, type }) =>
  type === 'empty' ? theme.colors.shape :  theme.colors.text_dark};
`;

export const Icon = styled(FontAwesome5)<TypeProps>`
  font-size: ${RFValue(33)}px;
  ${({ type }) => type === 'open' && css`
    color: ${({ theme }) => theme.colors.success};
  `};
  ${({ type }) => type === 'closed' && css`
    color: ${({ theme }) => theme.colors.attention};
  `};
  ${({ type }) => type === 'empty' && css`
    color: ${({ theme }) => theme.colors.shape};
  `};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(19)}px;
  font-weight: bold;
  color: ${({ theme, type }) =>
  type === 'empty' ? theme.colors.shape :  theme.colors.text_dark};
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(13)}px;
  color: ${({ theme, type }) =>
  type === 'empty' ? theme.colors.shape :  theme.colors.text};
`;