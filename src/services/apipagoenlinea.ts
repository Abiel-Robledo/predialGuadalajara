import axios from 'axios';
import { ApiError, ConsultaAdedudoResponse, PredioProps } from '../types/api';

const BASE_URL = 'https://apipagoenlinea.guadalajara.gob.mx/predialApiTest/';
const BASE_URL_PROD = 'https://apipagoenlinea.guadalajara.gob.mx/predialApi/';

const consultaAdedudo = async (
  recaudadora: string,
  tipo: string,
  cuenta: string,
  correo?: string,
  onError?: (error: ApiError) => void,
): Promise<PredioProps | null> => {
  try {
    const body = new URLSearchParams();
    body.append('recaudadora', recaudadora);
    body.append('tipo', tipo);
    body.append('cuenta', cuenta);
    body.append('correo', correo || '');

    const response = await axios.post<ConsultaAdedudoResponse>(
      `${BASE_URL}consulta_adeudo_app`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    if (response.data.status && response.data.data) {
      return response.data.data;
    }

    if (response.data.message) {
      onError?.({
        message: response.data.message,
      });
    }
  } catch (error) {
    onError?.(error as ApiError);
  }

  return null;
};

export {
  consultaAdedudo,
};
