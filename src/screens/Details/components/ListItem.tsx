import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';

interface ListItemProps {
  fieldName: string;
  value?: string;
  style?: StyleProp<ViewStyle>;
}

const ListItem: React.FC<ListItemProps> = ({
  fieldName,
  value,
  style,
}) => (
    <Container
      style={style}
    >
      <PropName>
        {fieldName}
        {': '}
      </PropName>

      <Value>
        {value}
      </Value>
    </Container>
  );

ListItem.defaultProps = {
  style: {},
  // eslint-disable-next-line no-undefined
  value: undefined,
};

const Container = styled.View`
  width: 100%;
  padding-horizontal: 20px;
  padding-vertical: 15px;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.3);
`;

const PropName = styled.Text`
  font-size: 16px;
  font-family: ${fonts.semiBold};
  color: #fff;
`;

const Value = styled.Text`
  font-size: 16px;
  font-family: ${fonts.regular};
  color: #fff;
  flex: 1;
`;

export default ListItem;
