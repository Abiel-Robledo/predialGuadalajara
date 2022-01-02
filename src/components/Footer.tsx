import React from 'react';
import styled from 'styled-components/native';

import fonts from '../utils/fonts';
import colors from '../utils/colors';

const Footer: React.FC = () => (
  <Container>
    <PrimaryText>
      Dudas y/o problemas para realizar el pago por internet del impuesto Predial.
    </PrimaryText>

    <SecondaryText>
      33-3837-2600 ext. 2613, 2457 y 2466, pagos.electronicos@guadalajara.gob.mx
    </SecondaryText>
  </Container>
);

const Container = styled.View`
  padding: 15px;
  background-color: rgba(204, 52, 97, 0.5);
  margin-top: 40px;
  border-radius: 10px;
`;

const PrimaryText = styled.Text`
  margin-bottom: 10px;
  text-align: center;
  color: #ffffff;
  font-family: ${fonts.regular};
`;

const SecondaryText = styled.Text`
  margin-bottom: 10px;
  text-align: center;
  color: ${colors.text};
  font-family: ${fonts.regular};
`;

export default Footer;
