import React from 'react';
import Container from '../component/Container';
import {Colors} from '../../assets';

const CreateJourney = () => {
  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="dark-content"
      backgroundBody={Colors.white}></Container>
  );
};

export default CreateJourney;
