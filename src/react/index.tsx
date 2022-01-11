import { hydrate, render } from 'react-dom';
import App from './App';
import { Environment } from '../types';

function run() {
  if (document.body) {
    const root = document.getElementById('root');
    const renderFn = root && root.hasChildNodes() ? hydrate : render;
    renderFn(
      <App environment={Environment.Browser} />,
      root,
    );
  }
}

export default run;
