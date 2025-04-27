import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// context providers
import { TodosProvider } from './contexts/todosContext.jsx'
import { AppProvider } from './contexts/appContext.jsx'
import { FileProvider } from './contexts/filesContext.jsx'
import { UsersProvider } from './contexts/usersContext.jsx'
import { OperationsProvider } from './contexts/operationsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <UsersProvider>
       <AppProvider>
         <TodosProvider>
    <OperationsProvider>
           <FileProvider>
             <App/>
           </FileProvider>
    </OperationsProvider>
         </TodosProvider>
       </AppProvider>
     </UsersProvider>
  </StrictMode>
)
