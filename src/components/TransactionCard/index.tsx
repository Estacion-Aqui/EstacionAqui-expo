import React from 'react';
import {ParkData} from '../../global/scripts/apis';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';


export function TransactionCard(pkData : ParkData){
  return (
    <Container>
      <Title>
        {pkData.title}
      </Title>

      <Amount >
        {pkData.amount}
      </Amount>

      <Footer>
        <Date>
          {pkData.quantitySpots}
        </Date>
      </Footer>
    </Container>
  )
}