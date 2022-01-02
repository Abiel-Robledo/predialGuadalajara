import React from 'react';
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';

import fonts from '../utils/fonts';
import colors from '../utils/colors';


interface ButtonProps {
  children?: React.ReactNode | string;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  textStyle,
  disabled,
  onPress,
  style,
  loading,
}) => (
    <BaseButton
      disabled={disabled || loading}
      onPress={onPress}
      style={style}
    >
      {
        loading && (
          <ActivityIndicator
            size="small"
            color="#fff"
          />
        )
      }

      {
        !loading && typeof children === 'string' && (
          <ButtonText
            style={textStyle}
          >
            {children}
          </ButtonText>
        )
      }

      {
        !loading && typeof children !== 'string' ? children : null
      }
    </BaseButton>
  );

Button.defaultProps = {
  disabled: false,
  style: {},
  textStyle: {},
  onPress: () => { },
  children: null,
  loading: false,
};

const BaseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  height: 50px;
  border-radius: 25px;
  background-color: ${colors.button};
  flex-direction: row;
  margin-top: 32px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-family: ${fonts.medium};
`;

export default Button;
