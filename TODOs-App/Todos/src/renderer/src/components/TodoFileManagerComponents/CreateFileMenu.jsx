import { useState, useRef, useEffect } from "react";

import { useApp } from "../../contexts/appContext";
import { useFile } from "../../contexts/filesContext";

function CreateFileMenu() {
    const [msg, setMsg] = useState('');
    const [fileName, setFileName] = useState('');
    const [path, setPath] = useState('');
    const [displayMsg, setDisplayMsg] = useState(true);
    const msgBoxRef = useRef(null);

    const {handleIdleTodoMode} = useApp();
    const {createFile, directoryPick} = useFile();
    

    const resetFields = () => {
        setPath('');
        setFileName('');
        setTimeout(() => {
            setDisplayMsg(true); // should be set to false so the msg box to disappear
            setMsg('');
        }, 1000);
    };

    const handleDirectoryPick = async () => {
       const result = await directoryPick();
       if (result) {
            setPath(result);
       }
    };

    const handleCreateFile = async () => {
        setDisplayMsg(true);
        if (!fileName) {
            setMsg('File name cannot be empty field!');
            msgBoxRef.current.className = "msg-box error";
            return;
        }
        if (!path) {
            setMsg('Directory cannot be empty field!');
            msgBoxRef.current.className = "msg-box error";
            return;
        }

        const finalFileName = `${fileName}.json`;
        const result = createFile(path, finalFileName);
        if (result) {
            setMsg("File created!");
            msgBoxRef.current.className = "msg-box ok";
        } else {
            setMsg("Error creating file!");
            msgBoxRef.current.className = "msg-box error";
        }
        resetFields();
    };

    return (
        <div className="create-file-menu-container">
            <h2>Create new .json file</h2>
            <div className="input-box-create">
                <div className="file-name-box">
                    <input placeholder="File name" value={fileName} onChange={(e) => setFileName(e.target.value)}/>
                    <p className="side-info-text">.json</p>
                </div>
                <div className="directory-box">
                    <input placeholder="Path" value={path} readOnly/>
                    <button onClick={() => handleDirectoryPick()}>../</button>
                </div>
                {displayMsg && <p className="msg-box" ref={msgBoxRef}>{msg}</p>}
                <div className="action-box">
                    <button className="create" onClick={() => handleCreateFile()}>Create file</button>
                    <button className="close" onClick={() => handleIdleTodoMode()}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default CreateFileMenu;