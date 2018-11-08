import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
let weatherAPIKey = '327427b8847d53c7636094261e589171';
let newsAPIKey = '3bf8d0104306485b8fe03faa66652b01';
export { weatherAPIKey, newsAPIKey }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
