import { useContext } from 'react';
import DropdownalertContext from '../context/Dropdownalert';
import { AlertNotification } from '../types/alert';

const useDropdownAlert = () => {
  const { notification, setNotification } = useContext(DropdownalertContext);

  const notify = (notification: AlertNotification) => {

    if (notification === null) {
      setNotification(notification);
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
