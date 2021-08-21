import React from 'react';

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


export function TransactionCard(){
  return (
    <Container>
      <Title>
        2.5 Km de distancia
      </Title>

      <Amount >
        Golden Square Shopping
      </Amount>

      <Footer>
        <Date>
          10 Vagas
        </Date>
      </Footer>
    </Container>
  )
}