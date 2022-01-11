import { Providers } from './providers';
import { Sequencer } from './views'; 
import type { Environment } from '../types'; 

interface AppProps {
  environment: Environment;
}

function App({ environment }: AppProps) {
  return (
    <Providers environment={environment}>
      <Sequencer />
    </Providers>
  );
}

export default App;
