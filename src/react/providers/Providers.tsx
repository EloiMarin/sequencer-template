import { Services } from './Services';

import type { FC } from 'react';
import type { Environment } from '../../types'; 

interface ProvidersProps {
  environment: Environment;
}

const Providers: FC<ProvidersProps> = ({ children, environment }) => (
  <Services environment={environment}>
    {children}
  </Services>
);

export { Providers };
