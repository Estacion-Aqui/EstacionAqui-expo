import React from 'react';
import {ParkData} from '../../global/scripts/apis';

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from './styles';

const icon = {
  open: 'parking',
  closed: 'lock',
  empty: 'minus-circle'
}


export function HighlightCard(pkData : ParkData){
  return (
    <Container type={pkData.type}>
      <Header>
        <Title type={pkData.type}>
          {pkData.title}
        </Title>
        <Icon
          name={icon[pkData.type]}
          type={pkData.type}
        />
      </Header>

      <Footer>
        <Amount type={pkData.type}>
          {pkData.amount}
        </Amount>
        <LastTransaction type={pkData.type}>
          {pkData.quantitySpots}
        </LastTransaction>
      </Footer>

    </Container>
  )
}