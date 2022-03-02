import { useContext } from 'react';

import PredioContext from '../context/Predio';
import { PredioProps } from '../types/api';

type PredioSetter = (pred: PredioProps | null) => void;

const usePredio = (): [(PredioProps | null), PredioSetter] => {
  const { predio, setPredio } = useContext(PredioContext);
  return [predio, setPredio];
};

export { usePredio };
