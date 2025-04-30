//contexts
import {useTodos} from './contexts/todosContext.jsx';
import { useApp } from './contexts/appContext.jsx';
import { useUsers } from './contexts/usersContext.jsx';

//styles
import './assets/ComponentsStyles/card.css';
import "./assets/ComponentsStyles/button.css";
import './assets/ComponentsStyles/displayBox.css';
import './assets/ComponentsStyles/topMenuBar.css';
import './assets/ComponentsStyles/managerBox.css';
import './assets/ComponentsStyles/intro.css';
import './assets/ComponentsStyles/addTodoMenu.css';
import './assets/ComponentsStyles/createFileMenu.css';
import './assets/ComponentsStyles/openFileMenu.css';
import './assets/ComponentsStyles/saveFileMenu.css';
import './assets/ComponentsStyles/infoBox.css';
import './assets/ComponentsStyles/additionalContainer.css';

//components
import DisplayBox from './components/DisplayBox.jsx';
import ManagerBox from './components/ManagerBox.jsx';
import IncompletedTodosMenu from './components/TodoMenues/IncompletedTodosMenu.jsx';
import CompletedTodosMenu from './components/TodoMenues/CompletedTodosMenu.jsx';
import TopMenuBar from './components/TopMenuBar.jsx';
import Intro from './components/Intro.jsx';
import InfoBox from './components/InfoBox.jsx';
import AddTodoMenu from './components/TodoFileManagerComponents/AddTodoMenu.jsx';
import CreateFileMenu from './components/TodoFileManagerComponents/CreateFileMenu.jsx';
import OpenFileMenu from './components/TodoFileManagerComponents/OpenFileMenu.jsx';
import SaveFileMenu from './components/TodoFileManagerComponents/SaveFileBMenu.jsx';
import AdditionalContainer from './components/AdditonalContainer.jsx';

function App() {
  const {completedTodos, incompleteTodos} = useTodos();
  const {appMode, operation} = useApp();

  const {users} = useUsers();

  return (
    <div className="background"
    style={{
      backgroundImage: 'url(./public/bg.jpg)',
      width: '100%',
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
    {appMode === 'home' && <Intro/>}
    {appMode === 'about' && <InfoBox/>}
    {(appMode === 'api' || appMode === 'custom') && <>
      <TopMenuBar/>
      <div className="main-container">
        <div>
          <IncompletedTodosMenu users={users}/>
          <DisplayBox title="Pending" todos={incompleteTodos} count={incompleteTodos.length} statusLabel="pending tasks"/>
        </div>
        <div>
          <CompletedTodosMenu/>
          <DisplayBox title="Completed" todos={completedTodos} count={completedTodos.length} statusLabel="completed tasks"/>
        </div>
        {appMode === 'custom' && <div className='controller-column'>
          {(operation === 'create' && appMode === 'custom') && <AddTodoMenu/>}
          {(operation === 'file-create' && appMode === 'custom') && <CreateFileMenu/>}
          {(operation === 'file-open' && appMode === 'custom') && <OpenFileMenu/>}
        </div>}
        {appMode === 'api' && <div>
           <AdditionalContainer/>
        </div>}
      </div>
      {appMode === 'custom' && <SaveFileMenu/>}
    </>}
    </div>
  )
}

export default App;
