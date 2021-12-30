import React from 'react';
import { StyleProp, TextStyle, ViewStyle, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Logo from './icons/Logo';
import fonts from '../utils/fonts';
import IMAGENLOGO from '../../assets/images/logo2.png';


interface HeaderProps {
  title?: string;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

export const LOGO_WIDTH = 67;

const Header: React.FC<HeaderProps> = ({
  title,
  titleContainerStyle,
  titleStyle,
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
        <Image source={IMAGENLOGO} style={{
          height: 123,
          width: 123,
          marginTop: -12,
          marginEnd: 0,

        }} />
      </LogoContainer>

      {
        Boolean(title) && (
          <InnerContainer
            style={[
              titleContainerStyle,
              {
                paddingTop: insets.top + 8,
                paddingLeft: 8,
                paddingRight: 8,
              },
            ]}
          >
            <Text
              style={titleStyle}
            >
              {title}
            </Text>
          </InnerContainer>
        )
      }
    </Container>
  );
};

Header.defaultProps = {
  title: '',
  titleContainerStyle: {},
  titleStyle: {},
};

const Container = styled.View`
  flex-direction: row;
  padding-horizontal: 5px;
`;

const InnerContainer = styled.View`
  flex: 1;
`;

const LogoContainer = styled.View`
`;

const Text = styled.Text`
  font-family: ${fonts.bold};
  font-size: 18px;
  color: #ffffff;
`;

export default Header;
