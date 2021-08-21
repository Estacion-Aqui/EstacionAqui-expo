import React from 'react';

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from './styles';

interface Props {
  type: 'open' | 'closed' | 'empty';
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  open: 'parking',
  closed: 'lock',
  empty: 'minus-circle'
}


export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction
} : Props){
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>
          {title}
        </Title>
        <Icon
          name={icon[type]}
          type={type}
        />
      </Header>

      <Footer>
        <Amount type={type}>
          {amount}
        </Amount>
        <LastTransaction type={type}>
          {lastTransaction}
        </LastTransaction>
      </Footer>

    </Container>
  )
}