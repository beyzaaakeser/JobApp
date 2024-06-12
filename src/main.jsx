import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../src/assets/css/style.css';
import { Provider } from 'react-redux';
import store from './app/store.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </React.StrictMode>
);
