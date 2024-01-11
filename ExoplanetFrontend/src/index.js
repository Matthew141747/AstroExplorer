import  ReactDOM  from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import './styles/index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
<StrictMode>
    <App />
</StrictMode>

);