import React from 'react';
import { PredioProps } from '../types/api';

type PredioContextProps = {
  predio: PredioProps | null;
  setPredio: (predio: PredioProps | null) => void;
};

const PredioContext = React.createContext<PredioContextProps>({
  predio: null,
  setPredio: () => { },
});

export default PredioContext;
