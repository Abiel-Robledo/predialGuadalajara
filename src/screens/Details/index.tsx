import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ELLIPSE from '../../../assets/images/Ellipse.png';
import ListItem from './components/ListItem';
import fonts from '../../utils/fonts';
import { usePredio } from '../../utils/predio';
import Header from './components/Header';
import { PredioProps } from '../../types/api';
import { numberFormat } from '../../utils/numbers';
import { RootStackParamList } from '../../types/navigation';
import colors from '../../utils/colors';

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'details'>;

type Prop = {
  fieldName: string;
  propertie: keyof Omit<Omit<Omit<PredioProps, 'bbva'>, 'ecommerce'>, 'adeudos'>;
  render?: (value: unknown) => string | undefined;
};

const PROPERTIES: Prop[] = [
  {
    fieldName: 'Tipo',
    propertie: 'Tipo',
  },
  {
    fieldName: 'Cuenta',
    propertie: 'Cuenta',
  },
  {
    fieldName: 'Clave Catastral',
    propertie: 'ClaveCatastral',
  },
  {
    fieldName: 'ID Cuenta',
    propertie: 'IdCuenta',
  },
  {
    fieldName: 'Calle',
    propertie: 'Calle',
  },
  {
    fieldName: 'No. Interior',
    propertie: 'NoInterior',
  },
  {
    fieldName: 'No. Exterior',
    propertie: 'NoExterior',
  },
  {
    fieldName: 'Colonia',
    propertie: 'Colonia',
  },
  {
    fieldName: 'Mts. Terreno',
    propertie: 'MtsTerreno',
  },
  {
    fieldName: 'Mts. Construcción',
    propertie: 'MtsConstruccion',
  },
  {
    fieldName: 'Valor Terreno',
    propertie: 'ValorTerreno',
    render: (val) => numberFormat(val as string),
  },
  {
    fieldName: 'Valor Construcción',
    propertie: 'ValorConstruccion',
    render: (val) => numberFormat(val as string),
  },
  {
    fieldName: 'Valor Catastral',
    propertie: 'ValorCatastral',
    render: (val) => numberFormat(val as string),
  },
];

const DetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [predio] = usePredio();

  const navigation = useNavigation<DetailsScreenNavigationProp>();

  return (
    <Container>

      <Header
        onPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        bounces={false}
      >

        <Title>
          Verificar Datos
        </Title>

        <Description>
          Verifique la información que a continuación se le
          presenta para generar su orden de pago o hacer
          directamente el pago en línea con su tarjeta de
          crédito o cuenta bancaria.
        </Description>

        <ListItem
          fieldName="Recaudadora"
          value={predio?.Recaudadora}
          style={{
            backgroundColor: colors.button,
            marginTop: 30,
          }}
        />

        {
          PROPERTIES.map((
            {
              fieldName,
              propertie,
              render = (val) => val || 'Sin información',
            },
            index,
          ) => (
              <ListItem
                key={propertie}
                fieldName={fieldName}
                value={render(predio?.[propertie]) as string}
                style={{
                  marginTop: 2,
                  flex: index === PROPERTIES.length - 1 ? 1 : 0,
                  paddingBottom: index === PROPERTIES.length - 1 ? 10 + insets.bottom : 10,
                }}
              />
            ))
        }
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary};
`;

const BackgroundDecoration = styled.Image.attrs({
  source: ELLIPSE,
})`
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  font-size: 20px;
  font-family: ${fonts.bold};
  color: #fff;
  text-align: center;
  margin-top: 26px;
`;

const Description = styled.Text`
  font-size: 16px;
  padding-horizontal: 20px;
  font-family: ${fonts.regular};
  color: #fff;
  margin-top: 30px;
`;

export default DetailsScreen;
