import { useContext } from 'react';
import DropdownalertContext from '../context/Dropdownalert';
import { AlertNotification } from '../types/alert';

const useDropdownAlert = () => {
  const { notification, setNotification } = useContext(DropdownalertContext);

  const notify = (config: AlertNotification) => {
    if (notification === null) {
      setNotification(config);
    }
  };

  const clear = () => {
    setNotification(null);
  };

  return {
    notification,
    notify,
    clear,
  };
};

export {
  useDropdownAlert,
};
