import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import reducers from './combineReducers'
import { rootSaga } from './sagas/rootSaga'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, reducers)

export default function () {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({ serializableCheck: false }), sagaMiddleware],
  })

  let persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
