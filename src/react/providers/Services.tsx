import { createContext, useEffect, useMemo } from 'react';
import { sequencerFactory } from '../../factories';
import { Environment } from '../../types'; 

import type { FC } from 'react';
import type { Services as ServicesType } from '../../app';

interface ServicesProps {
  environment: Environment;
}

type ServicesContextType = ServicesType;

const defaultContext: ServicesContextType = {
  sequencer: sequencerFactory(Environment.Test),
};

const ServicesContext = createContext<ServicesContextType>(defaultContext);

const Services: FC<ServicesProps> = ({ children, environment }) => {
  const sequencer = useMemo(() => sequencerFactory(environment), [environment]);

  useEffect(() => () => {
    sequencer.teardown();
  }, [sequencer]);

  const context = {
    sequencer,
  };

  return (
    <ServicesContext.Provider value={context}>
      {children}
    </ServicesContext.Provider>
  );
};

export { Services, ServicesContext };
export type { ServicesContextType };
