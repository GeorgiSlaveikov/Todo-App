import { useState } from "react";
import { useApp } from "../../contexts/appContext";
import { useFile } from "../../contexts/filesContext";



function OpenFileMenu() {
    const {handleIdleTodoMode} = useApp();
    const {openFile, pickFile} = useFile();

    const [msg, setMsg] = useState('');
    const [filePath, setFilePath] = useState('');
    const [status, setStatus] = useState(true);

    const handleFilePick = async () => {
        const result = await pickFile();
        if (result) {
            setFilePath(result);
            setStatus(true);
        }else  {
            setStatus(false);
            setMsg("No file opened!");
            setTimeout(() => {
                setStatus(true);
                setMsg("");
            }, 1500);
        }
    };

    const handleOpenFile = async () => {
        if (filePath) {
            await openFile(filePath);
        } else {
            setStatus(false);
            setMsg("No file selected!");
        }
        setFilePath("");
    };

    return (
        <div className="open-file-menu-container">
            <h2>Open existing .json file</h2>
            <div className="input-box-open">
                <div className="file-box">
                    <input placeholder="File path" value={filePath} readOnly/>
                    <button onClick={() => handleFilePick()}>../</button>
                </div>
                {!status && <p className="msg-box">{msg}</p>}
                <div className="action-box">
                    <button className="create" onClick={() => handleOpenFile()}>Open file</button>
                    <button className="close" onClick={() => handleIdleTodoMode()}>Close</button>
                </div>
            </div>
        </div>
    );
}


export default OpenFileMenu;