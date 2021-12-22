import axios from 'axios';
import { CommonResponse, ApiError } from '../types/api';

const BASE_URL = 'https://apipagoenlinea.guadalajara.gob.mx/predialApi';

const consultaAdedudo = async (
  recaudadora: string,
  tipo: string,
  cuenta: string,
  correo?: string,
  onError?: (error: ApiError) => void,
) => {
  try {
    const body = new URLSearchParams();
    body.append('recaudadora', recaudadora);
    body.append('tipo', tipo);
    body.append('cuenta', cuenta);
    body.append('correo', correo || '');

    const response = await axios.post<CommonResponse>(
      `${BASE_URL}/consulta_adeudo`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    if (response.data.status) {
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
