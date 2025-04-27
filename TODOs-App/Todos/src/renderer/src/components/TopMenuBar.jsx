import { useTodos } from "../contexts/todosContext.jsx";
import { useApp } from "../contexts/appContext.jsx";
import { useFile } from "../contexts/filesContext.jsx";

function TopMenuBar() {
    const {fetchOption, createTodo} = useTodos();
    const {appMode, handleHomeMode, handleAddTodoMode, handleOpenFileMode, handleCreateFileMode, handleSaveFileMode} = useApp();
    const {saveFile} = useFile();

    const handleAppExit = async () => {
        await saveFile()
        window.electronAPI.exitApp();
    };

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
                <button onClick={() =>saveFile()}>Save File</button>
                
            </>}
            {(appMode === 'api' || appMode === 'custom') && <button className="exit-app-btn" onClick={() => handleAppExit()}>Exit</button>}
        </div>
    );
}

export default TopMenuBar;