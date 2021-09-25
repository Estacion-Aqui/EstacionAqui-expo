import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;


export const HighlightCards = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  height: 84%;

  position: absolute;
  margin-top: ${RFPercentage(15)}px;
`;

export const Transactions = styled.View`
  flex: 1%;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
