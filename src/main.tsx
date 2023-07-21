import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <App />
    );
});
