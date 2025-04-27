import { useState } from "react";
import { useTodos } from "../contexts/todosContext.jsx";
import { useApp } from "../contexts/appContext.jsx";


function Intro() {
    const {fetchOption, clearTodos} = useTodos();
    const {handleCustomMode, handleAnoutMode} = useApp();

    const [introBoxStatus, setIntroBoxStatus] = useState(false);

    const handleChoice = (action) => {
        clearTodos();
        setIntroBoxStatus(true); 
        setTimeout(() => {
            action(); 
        }, 600);
    };

    const handleAboutAppMenu = () => {
        handleAnoutMode();
    };

    return (
        <div className={`intro-box${introBoxStatus ? ' disappear' : ''}`}>
            <div className="choice-box" onClick={() => setTimeout(() => {handleChoice(fetchOption)}, 300)}>
                <h2>Fetch</h2>
                <p>Use todos from api</p>
            </div>
            <div className="operation-btn-wrapper">
                <div className="operation-btn about-app" onClick={() => handleAboutAppMenu()}>
                    <p>Info</p>
                </div>
                <div className="operation-btn exit-app" onClick={() => window.electronAPI.exitApp()}>
                    <p>Exit</p>
                </div>
            </div>
            <div className="choice-box" onClick={() => setTimeout(() => {handleChoice(handleCustomMode)}, 300)}>
                <h2>File</h2>
                <p>Create todos from scratch, save them, open and use them later!</p>
            </div>
        </div>
    );
}

export default Intro;