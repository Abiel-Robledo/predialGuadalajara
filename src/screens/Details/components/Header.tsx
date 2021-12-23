import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  onPress: () => void;
}

export const HEADER_HEIGHT = 55;

const Header: React.FC<HeaderProps> = ({
  onPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Container
      style={{
        paddingTop: insets.top,
      }}
    >

      <InnerContainer>

        <TouchableWithoutFeedback
          onPress={onPress}
        >
          <IconContainer>
            <Icon
              name="ios-arrow-back"
              size={30}
              color="#fff"
            />
          </IconContainer>
        </TouchableWithoutFeedback>

      </InnerContainer>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  background-color: #FF254B;
`;

const InnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  padding-horizontal: 15px;
`;

const IconContainer = styled.View`
  width: ${HEADER_HEIGHT}px;
  height: ${HEADER_HEIGHT}px;
  justify-content: center;
  align-items: center;
`;

export default Header;
