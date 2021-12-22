import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Logo from '../../../components/icons/Logo';
import fonts from '../../../utils/fonts';

interface HeaderProps {
  title?: string;
}

const LOGO_WIDTH = 67;

const Header: React.FC<HeaderProps> = ({
  title,
}) => {
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

      {
        Boolean(title) && (
          <InnerContainer
            style={{
              paddingTop: insets.top + 8,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            <Text>
              { title }
            </Text>
          </InnerContainer>
        )
      }
    </Container>
  );
};

Header.defaultProps = {
  title: '',
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
  font-family: ${fonts.bold};
  font-size: 16px;
  color: #ffffff;
`;

export default Header;
