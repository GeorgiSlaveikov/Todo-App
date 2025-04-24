//contexts
import {useTodos} from './contexts/todosContext.jsx';
import { useApp } from './contexts/appContext.jsx';

//styles
import './assets/ComponentsStyles/card.css';
import "./assets/ComponentsStyles/button.css";
import './assets/ComponentsStyles/displayBox.css';
import './assets/ComponentsStyles/topMenuBar.css';
import './assets/ComponentsStyles/managerBox.css';
import './assets/ComponentsStyles/intro.css';
import './assets/ComponentsStyles/addTodoMenu.css';

//components
import DisplayBox from './components/DisplayBox.jsx';
import ManagerBox from './components/ManagerBox.jsx';
import TopMenuBar from './components/TopMenuBar.jsx';
import Intro from './components/Intro.jsx';
import AddTodoMenu from './components/TodoFileManagerComponents/AddTodoMenu.jsx';

function App() {
  const {todos} = useTodos();
  const {appMode, operation} = useApp();

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  return (
    <>
    {appMode === 'home' && <Intro/>}
    {(appMode === 'api' || appMode === 'custom') && <>
      <TopMenuBar/>
      <ManagerBox/>
      <div className="main-container">
          <DisplayBox title="Pending" todos={incompleteTodos} count={incompleteTodos.length} statusLabel="pending tasks"/>
          <DisplayBox title="Completed" todos={completedTodos} count={completedTodos.length} statusLabel="completed tasks"/>
          <div className='controller-column'>
            {(operation === 'create' && appMode === 'custom') && <AddTodoMenu/>}
            {(operation === 'file-create' && appMode === 'custom') && <AddTodoMenu/>}
          </div>
      </div>
    </>}
    </>
  )
}

export default App;
