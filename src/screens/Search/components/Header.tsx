import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Logo from '../../../components/icons/Logo';

const LOGO_WIDTH = 67;

const Header: React.FC = () => {
  // Hooks
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <LogoContainer
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 8,
        }}
      >
        <Logo
          size={LOGO_WIDTH}
        />
      </LogoContainer>

      <InnerContainer>
        <Text>
          some
        </Text>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  padding-horizontal: 20px;
`;

const InnerContainer = styled.View``;

const LogoContainer = styled.View`
  background-color: #FF254B;
  padding-horizontal: 18px;
`;

const Text = styled.Text`
`;

export default Header;
