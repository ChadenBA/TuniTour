import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store'
import { Provider } from "react-redux"

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'


const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store)
root.render(

      <Provider store={store} >
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                  <App />
            </PersistGate>
      </Provider>


);


