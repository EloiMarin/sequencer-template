import { useContext } from 'react';
import { ServicesContext, ServicesContextType } from '../providers/Services';

function useServices() {
  return useContext<ServicesContextType>(ServicesContext);
}

export default useServices;
