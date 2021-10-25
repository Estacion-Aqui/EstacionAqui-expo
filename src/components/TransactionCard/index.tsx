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
        {pkData.distance}
      </Title>

      <Amount >
        {pkData.title}
      </Amount>

      <Footer>
        <Date>
          {pkData.quantitySpots}
        </Date>
      </Footer>
    </Container>
  )
}