import { useRef, useState } from "react";
import { useTodos } from "../../contexts/todosContext";
import { useApp } from "../../contexts/appContext";

function AddTodoMenu() {
    const {createTodo } = useTodos();
    const {handleIdleTodoMode} = useApp();

    const [user, setUser] = useState("");
    const [title, setTitle] = useState("");

    const [userMsg, setUserMsg] = useState("");
    const [titleMsg, setTitleMsg] = useState("");

    const userMsgRef = useRef(null);
    const titleMsgRef = useRef(null);


    const handleUserDataCheck = (data) => {
        if (data === null || data === '') {
            setUserMsg("User Id can't be emplty field!");
            userMsgRef.current.className = 'msg error';
            return false;
        }else if (data !== null && data !== ''){
            setUser(data);
            setUserMsg("Input data is correct!");
            userMsgRef.current.className = 'msg ok';
            return true;
        }
    };

    const handleTitleDataCheck = (data) => {
        if (data === null || data === '') {
            setTitleMsg("Title can't be emplty field!");
            titleMsgRef.current.className = 'msg error';
            return false;
        } else if (data !== null && data !== ''){
            setTitle(data);
            setTitleMsg("Input data is correct!");
            titleMsgRef.current.className = 'msg ok';
            return true;
        }
    };

    const handleCreateRequest = () => {
        console.log(user, title);
        createTodo(user, title);
        setTitle("");
        setUser("");
        setUserMsg("");
        setTitleMsg("");
        userMsgRef.current.className = '';
        titleMsgRef.current.className = '';
    };

    return (
        <div className="add-todo-menu-container">
            <h2>Create todo menu</h2>
            <div className="input-box">
                <input className="user" placeholder="UserId" value={user} onChange={(e) => setUser(e.target.value)}/>
                <p className="msg" ref={userMsgRef}>{userMsg}</p>
                <input className="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <p className="msg" ref={titleMsgRef}>{titleMsg}</p>
            </div>
            <div className="button-box">
                <button className="create" onClick={() => {
                    const titleFlag = handleTitleDataCheck(title);
                    const userFlag = handleUserDataCheck(user);
                   if (titleFlag) {
                    if (userFlag) {
                        handleCreateRequest();
                    } else {
                        userMsgRef.current.className = 'msg error popup'
                    }
                        
                   } else {
                    titleMsgRef.current.className = 'msg error popup'
                   }
                }
                   }>Create</button>
                <button className="close" onClick={() => handleIdleTodoMode()}>Close</button>
            </div>
        </div>
    );
}

export default AddTodoMenu;