import { createContext, useContext, useEffect, useState, useRef } from "react";
import { readLocalJsonFile, writeToJsonFile} from "../api/controller";
import { useTodos } from "./todosContext";
import { useApp } from "./appContext";

const FileContext = createContext();

export function FileProvider({children}) {
    const [isSessionSaved, setSessionStatus] = useState(false);

    const [currentOpenedFileDirectory, setCurrentOpenedFileDirectory] = useState("");
    const [currentOpenedFileName, setCurrentOpenedFileName] = useState("");

    const {todos, setTodos, setCompletedTodos, setIncompleteTodos, updateCompletedAndIncomplete } = useTodos();
    const {handleIdleTodoMode, appMode, prevAppMode} = useApp();

    useEffect(() =>  {
      saveUponExit();
    }, [appMode]);

    useEffect(() => {
        // console.log("change in the todos array, requires save");
        setSessionStatus(false);
    }, [todos]);

    const saveUponExit = async () => {
      console.log("change in the app mode, from: " + prevAppMode.current + " to -> " + appMode );
      if (appMode === 'home' && prevAppMode.current === 'custom') {
        console.log("opening home menu, saving files...");
        await handleCloseMenu();
        setCurrentOpenedFileDirectory('');
      }
    };

    const handleCloseMenu = async () => {
      if (!isSessionSaved && currentOpenedFileDirectory) {
        console.log("previous file not saved, saving it now...");
        await saveFile();
        console.log("file saved at " + currentOpenedFileDirectory);
      } else if (currentOpenedFileDirectory === null || currentOpenedFileDirectory === '') {
        console.log("No file loaded, save not requiered");
      } else if (isSessionSaved) {
        console.log("file saved, open new file");
      }
    };

    const createFile = async (path, fileName) => {
        await handleCloseMenu();
        const result = await window.electronAPI.createJsonFile(path, fileName);
        const fullFileDir = path + "\\" + fileName;
        if (result) {
            setCurrentOpenedFileName(fileName);
            setCurrentOpenedFileDirectory(fullFileDir);
            await openFile(fullFileDir);
            console.log(`Context: Full file dir+name: ${fullFileDir}`);
        }
        return result;
    };

    const directoryPick = async () => {
        const result = await window.electronAPI.pickDirectory();
        return result;
    };

    const pickFile = async () => {
        const result = await window.electronAPI.openFileDialog();
        return result;
    };

    const openFile = async (path) => {
        await handleCloseMenu();

        if (path) {
            setCurrentOpenedFileDirectory(path);
        }
        const data = await readLocalJsonFile(path);
        console.log("return of the content of the opened file: "+ data);
        setTodos(data);
        updateCompletedAndIncomplete(data)
        // readLocalJsonFile(path).then((data) => {
        //     console.log("return of the content of the opened file: "+ data);
        //     setTodos(data);
        // });
        handleIdleTodoMode();
    };

    const saveFile = async () => {
        if (!currentOpenedFileDirectory) {
          console.warn("No file path provided.");
          return;
        }
      
        if (!Array.isArray(todos)) {
          console.error("Todos is not an array. Cannot save.");
          return;
        }
      
        try {
          const cleanedTodos = todos.map(todo =>
            typeof todo === "string" ? JSON.parse(todo) : todo
          );
      
          const jsonData = JSON.stringify(cleanedTodos, null, 2);
          const success = await writeToJsonFile(currentOpenedFileDirectory, jsonData);
      
          if (success !== false) {
            setSessionStatus(true);
          } else {
            console.error("Save failed");
          }
        } catch (error) {
          console.error("Error during save:", error);
        }
      };

    const value = {currentOpenedFileDirectory, setCurrentOpenedFileDirectory,
        currentOpenedFileName, setCurrentOpenedFileName,
        createFile, directoryPick, pickFile, openFile, saveFile,
        isSessionSaved};

    return (
        <FileContext.Provider value={value}>
            {children}
        </FileContext.Provider>
    );
}

export function useFile() {
    return useContext(FileContext);
}

