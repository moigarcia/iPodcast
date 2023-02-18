import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoadingContextProvider } from './contexts/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
        <LoadingContextProvider>
            <App />
        </LoadingContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
