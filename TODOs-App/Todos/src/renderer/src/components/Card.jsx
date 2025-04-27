import { useTodos } from "../contexts/todosContext.jsx";
import { useState } from "react";
import Button from "./Button";

function Card({userId, id, title, status}) {
    // const date = new Date().toDateString();
    // const hour = new Date().getHours();
    // const minutes = new Date().getMinutes();
    // const seconds = new Date().getSeconds();
    
    // const time = status ? `${date} ${hour}:${minutes}:${seconds}` : null;

    const {completeTodo, undoTodo, completedTimes} = useTodos();

    const btnType = status ? 'undo-btn' : 'do-btn';
    // const btnAction = () => status ? undoTodo(id) : completeTodo(id);
    const btnPrompt = status ? 'Undo' : 'Complete';

    const [cardStatus, setCardStatus] = useState(false);

    const btnAction = () => {
        setCardStatus(true);
        setTimeout(() => {
          status ? undoTodo(id) : completeTodo(id);
          setCardStatus(false);
        }, 300);
      };

    return (
        <div key={id} className={`card-box ${cardStatus ? 'card-box-shrink' : ''}`}>
            <div className="card-info-box">
                {/* <p>User Id: {userId}</p> */}
                <p>{title}</p>
                {status && <p className="cmpl-msg-txt">{completedTimes[id]}</p>}
            </div>
            <div className="card-action-box">
                <Button btnType={btnType} prompt={btnPrompt} btnAction={btnAction}/>
            </div>
        </div>
    );
}   

export default Card;