import { useState } from "react";
import { useTodos } from "../contexts/todosContext.jsx";
import { useApp } from "../contexts/appContext.jsx";


function Intro() {
    const {fetchOption, clearTodos} = useTodos();
    const {handleCustomMode} = useApp();

    const [introBoxStatus, setIntroBoxStatus] = useState(false);

    const handleChoice = (action) => {
        clearTodos();
        setIntroBoxStatus(true); 
        setTimeout(() => {
            action(); 
        }, 600);
    };

    return (
        <div className={`intro-box${introBoxStatus ? ' disappear' : ''}`}>
            <div className="choice-box" onClick={() => setTimeout(() => {handleChoice(fetchOption)}, 300)}>
                <h2>Fetch data!</h2>
                <p>You are going to use todo data from: https://jsonplaceholder.typicode.com/todos</p>
                {/* <button onClick={() => fetchOption()}>Select</button> */}
            </div>
            <div className="operation-btn-wrapper">
                <div className="operation-btn about-app"></div>
                <div className="operation-btn exit-app" onClick={() => window.electronAPI.exitApp()}></div>
            </div>
            <div className="choice-box" onClick={() => setTimeout(() => {handleChoice(handleCustomMode)}, 300)}>
                <h2>Use your own files and data!</h2>
                <p>You can create todo list from scratch, save them, open and use them later!</p>
                {/* <button onClick={() => handleCustomMode()}>Select</button> */}
            </div>
        </div>
    );
}

export default Intro;