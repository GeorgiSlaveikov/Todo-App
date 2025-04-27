import { useEffect, useRef, useState } from "react";

import { useFile } from "../../contexts/filesContext";

function SaveFileMenu() {
    const [msgFileStatus, setMsgFileStatus] = useState("");
    const [msgDirectory, setMsgDirectory] = useState("");

    const {currentOpenedFileDirectory, isSessionSaved} = useFile();

    const fileStatusRef = useRef(null);

    useEffect(() => {
        if (isSessionSaved) {
            setMsgFileStatus("Data saved");
            fileStatusRef.current.className = "fstat saved";
        } else {
            setMsgFileStatus("Data not saved");
            fileStatusRef.current.className = "fstat not-saved";
        }

        if (currentOpenedFileDirectory) {
            setMsgDirectory("Opened file:" + currentOpenedFileDirectory);
        } else {
            setMsgDirectory("No file opened");
        }
    }, [isSessionSaved, currentOpenedFileDirectory]);
    

    return (
        <footer className="save-menu-container">
            <div className="msg-container">
                <p className="fstat" ref={fileStatusRef}>{msgFileStatus}</p>
                {currentOpenedFileDirectory && <p>{msgDirectory}</p>}
            </div>
        </footer>
    );
}

export default SaveFileMenu;