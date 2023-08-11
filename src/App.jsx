import { ChakraProvider } from '@chakra-ui/react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './app/redux/store'
import Root from './app/Root'

const { store, persistor } = configureStore()

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <Root />
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </HashRouter>
  )
}

export default App
