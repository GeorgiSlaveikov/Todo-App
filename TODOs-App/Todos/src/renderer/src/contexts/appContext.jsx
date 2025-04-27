import { createContext, useContext, useState, useEffect, useRef } from "react";

const AppContext = createContext();

export function AppProvider({children}) {   
    const [appMode, setAppMode] = useState('home'); //home, api, custom
    const [operation, setOperation] = useState('idle');
    const prevAppMode = useRef('home');

    useEffect(() => {
        prevAppMode.current = appMode;
    }, [appMode]);

    const handleHomeMode = () => {
        setAppMode('home');
        console.log("mode swithched to 'home'");
    };
    
    const handleApiMode = () => {
        setAppMode('api');
        console.log("mode swithched to 'api'");
    };
    
    const handleCustomMode = () => {
        setAppMode('custom');
        console.log("mode swithched to 'custom'");
    };

    const handleAnoutMode = () => {
        setAppMode('about');
        console.log("mode swithched to 'about'");
    };

    const handleAddTodoMode = () => {
        setOperation('create');
        console.log("mode switched to 'custom-create'");
    };

    const handleOpenFileMode = () => {
        setOperation('file-open');
        console.log("mode switched to 'custom-create'");
    };

    const handleCreateFileMode = () => {
        setOperation('file-create');
        console.log("mode switched to 'custom-create'");
    };

    const handleSaveFileMode = () => {
        setOperation('file-save');
        console.log("mode switched to 'custom-save'");
    };

    const handleIdleTodoMode = () => {
        setOperation('idle');
        console.log("mode switched to 'idle'");
    };
    
    const value = {appMode,operation, prevAppMode,handleHomeMode, handleApiMode, 
        handleCustomMode, handleAddTodoMode, handleIdleTodoMode, 
        handleOpenFileMode, handleCreateFileMode, handleSaveFileMode, handleAnoutMode};

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}