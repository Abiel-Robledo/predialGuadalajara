import { useContext } from 'react';

import PredioContext from '../context/Predio';

const usePredio = () => {
  const predioContext = useContext(PredioContext);

  return [predioContext.predio, predioContext.setPredio];
};

export { usePredio };
