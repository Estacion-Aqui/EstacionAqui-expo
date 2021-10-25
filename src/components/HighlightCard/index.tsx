import React, { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {ParkData} from '../../global/scripts/apis';
import {getDBEstabData} from '../../global/scripts/database';

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

  const [title, settitle] = useState<string>('');
  
  function getData(){
    if(pkData.title != ''){
      settitle(pkData.title);
    }else{
      getDBEstabData(pkData.id).then(function(result){
        settitle(result.title);
      });
    }
  }
  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(useCallback(() => {
    getData()
  },[]));

  return (
    <Container type={pkData.type}>
      <Header>
        <Title type={pkData.type}>
          {pkData.distance}
        </Title>
        <Icon
          name={icon[pkData.type]}
          type={pkData.type}
        />
      </Header>

      <Footer>
        <Amount type={pkData.type}>
          {title}
        </Amount>
        <LastTransaction type={pkData.type}>
          {pkData.quantitySpots}
        </LastTransaction>
      </Footer>

    </Container>
  )
}