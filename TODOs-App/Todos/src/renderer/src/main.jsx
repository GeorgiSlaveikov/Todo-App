import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// context providers
import { TodosProvider } from './contexts/todosContext.jsx'
import { AppProvider } from './contexts/appContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <TodosProvider>
        <App/>
      </TodosProvider>
    </AppProvider>
  </StrictMode>
)
