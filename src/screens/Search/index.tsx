import React, { useState, useRef } from 'react';
import {
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../utils/colors';
import fonts from '../../utils/fonts';
import Header from './components/Header';
import Title from './components/Title';

import ModalPicker from '../../components/ModalPicker';
import { useDropdownAlert } from '../../utils/notifications';
import { consultaAdedudo } from '../../services/apipagoenlinea';

const RECAUDADORAS: number[] = [1, 2, 3];
const TIPOS: string[] = ['U', 'R'];

const SearchScreen: React.FC = () => {
  // Refs
  const cuentaRef = useRef<TextInput | undefined>();
  const correoRef = useRef<TextInput | undefined>();

  // State
  const [showRecaudadoraPicker, setShowRecaudadoraPicker] = useState<boolean>(false);
  const [recaudadora, setRecaudadora] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [showTipoPicker, setShowTipoPicker] = useState<boolean>(false);
  const [cuenta, setCuenta] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Hooks
  const { notify, errorHandler } = useDropdownAlert();

  // Methods
  const onSubmit = async () => {
    if (!recaudadora || !tipo || !cuenta) {
      notify({
        type: 'warn',
        title: 'Alerta',
        message: 'Debe completar todos los campos',
      });
    }

    setLoading(true);

    const response = await consultaAdedudo(
      recaudadora,
      tipo,
      cuenta,
      correo,
      errorHandler,
    );

    if (response) {
      notify({
        type: 'success',
        title: 'Éxito',
        message: 'Consulta exitosa',
      });
    }

    setLoading(false);
  };

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        bounces={false}
      >
        <Container>

          <Header />

          <Title />

          <Padder>

            <TouchableWithoutFeedback
              onPress={() => setShowRecaudadoraPicker(true)}
              disabled={loading}
            >
              <FormItem>
                <InputText>
                  {
                    recaudadora || 'Recaudadora *'
                  }
                </InputText>

                <Icon
                  name="ios-caret-down-outline"
                  size={24}
                  color="#FFFFFF"
                  style={{
                    marginRight: 20,
                  }}
                />
              </FormItem>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => setShowTipoPicker(true)}
              disabled={loading}
            >
              <FormItem>
                <InputText>
                  {
                    tipo || 'Tipo *'
                  }
                </InputText>

                <Icon
                  name="ios-caret-down-outline"
                  size={24}
                  color="#FFFFFF"
                  style={{
                    marginRight: 20,
                  }}
                />
              </FormItem>
            </TouchableWithoutFeedback>

            <FormItem>
              <Input
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ref={cuentaRef}
                placeholder="Cuenta *"
                value={cuenta}
                onChangeText={(text) => setCuenta(text)}
                blurOnSubmit={false}
                onSubmitEditing={() => correoRef.current?.focus()}
                editable={!loading}
              />
            </FormItem>

            <FormItem>
              <Input
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ref={correoRef}
                placeholder="Correo Electrónico (Opcional)"
                value={correo}
                onChangeText={(text) => setCorreo(text)}
                editable={!loading}
              />
            </FormItem>

            <Button
              onPress={onSubmit}
              disabled={loading}
            >
              {
                loading ? (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                  />
                ) : (
                  <ButtonText>
                    Consultar Adeudo Predial
                  </ButtonText>
                )
              }
            </Button>

          </Padder>

          <Padder>
            <Footer>
              <FooterPrimaryText>
                Dudas y/o problemas para realizar el pago por internet del impuesto Predial.
              </FooterPrimaryText>

              <FooterSecondaryText>
                33-3837-2600 ext. 2613, 2457 y 2466, pagos.electronicos@guadalajara.gob.mx
              </FooterSecondaryText>
            </Footer>
          </Padder>
        </Container>
      </KeyboardAwareScrollView>

      <ModalPicker
        title="Recaudadora"
        onClose={() => setShowRecaudadoraPicker(false)}
        isVisible={showRecaudadoraPicker}
        value={recaudadora}
        onSelect={(value) => {
          setRecaudadora(value as string);
          setShowRecaudadoraPicker(false);
        }}
        options={RECAUDADORAS.map((r) => ({
          label: `Recaudadora ${r}`,
          value: r,
        }))}
      />

      <ModalPicker
        title="Tipo"
        onClose={() => setShowTipoPicker(false)}
        isVisible={showTipoPicker}
        value={tipo}
        onSelect={(value) => {
          setTipo(value as string);
          setShowTipoPicker(false);
        }}
        options={TIPOS.map((t) => ({
          label: t,
          value: t,
        }))}
      />
    </>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
`;

const Padder = styled.View`
  padding-horizontal: 20px;
`;

const FormItem = styled.View`
  height: 50px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.25);
  flex-direction: row;
  margin-top: 32px;
  align-items: center;
`;

const InputText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-family: ${fonts.medium};
  flex: 1;
  padding-horizontal: 20px;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: '#fff',
})`
  flex: 1;
  padding-horizontal: 20px;
  color: #ffffff;
  font-size: 16px;
  font-family: ${fonts.medium};
`;

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  height: 50px;
  border-radius: 25px;
  background-color: #FF254B;
  flex-direction: row;
  margin-top: 32px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-family: ${fonts.medium};
`;

const Footer = styled.View`
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.12);
  margin-top: 40px;
  border-radius: 10px;
`;

const FooterPrimaryText = styled.Text`
  margin-bottom: 10px;
  text-align: center;
  color: #ffffff;
  font-family: ${fonts.regular};
`;

const FooterSecondaryText = styled.Text`
  margin-bottom: 10px;
  text-align: center;
  color: #FF254B;
  font-family: ${fonts.regular};
`;

export default SearchScreen;
