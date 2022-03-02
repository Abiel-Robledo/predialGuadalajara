import React from 'react';
import styled from 'styled-components/native';
import fonts from '../../../utils/fonts';

const Title: React.FC = () => (
  <Container>
    <Text>
      Imprimir Recibo
    </Text>
  </Container>
);

const Container = styled.View`
  padding-vertical: 10px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  text-align: center;
  font-family: ${fonts.extraBold};
  font-size: 25px;
  color: #ffffff;
`;

export default Title;
