import { useTodos } from "../contexts/todosContext.jsx";
import { useApp } from "../contexts/appContext.jsx";

function TopMenuBar() {
    const {fetchOption, createTodo} = useTodos();
    const {appMode, handleHomeMode, handleAddTodoMode, handleOpenFileMode, handleCreateFileMode, handleSaveFileMode} = useApp();
    return (
        <div className="top-menu-bar">
            {(appMode === 'api' || appMode === 'custom') && <button onClick={() => handleHomeMode()}>Start Page</button>}
            {appMode === 'api' && <>
                <button onClick={() => fetchOption()}>Refresh</button>
            </>}
            {appMode === 'custom' && <>
                <button onClick={() => handleAddTodoMode()}>Create Todo</button>
                <button onClick={() => handleCreateFileMode()}>New File</button>
                <button onClick={() => handleOpenFileMode()}>Open File</button>
                <button onClick={() => handleSaveFileMode()}>Save File</button>
                
            </>}
            {(appMode === 'api' || appMode === 'custom') && <button className="exit-app-btn" onClick={() => window.electronAPI.exitApp()}>Exit</button>}
        </div>
    );
}

export default TopMenuBar;