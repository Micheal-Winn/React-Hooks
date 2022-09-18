import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import {AuthContextProvider} from './components/context/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
// eslint-disable-next-line react/jsx-no-undef
root.render(<AuthContextProvider> <App /> </AuthContextProvider>);
