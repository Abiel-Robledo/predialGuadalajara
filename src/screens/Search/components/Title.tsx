import React from 'react';
import styled from 'styled-components/native';
import fonts from '../../../utils/fonts';

const Title: React.FC = () => (
  <Container>
    <Text>
      Consulta y pago
    </Text>

    <Text>
      del
    </Text>

    <Text>
      impuesto predial
    </Text>
  </Container>
);

const Container = styled.View`
  padding-vertical: 30px;
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
