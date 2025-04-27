import { useRef, useState } from "react";
import { useTodos } from "../../contexts/todosContext";
import { useApp } from "../../contexts/appContext";
import { useUsers } from "../../contexts/usersContext";

function AddTodoMenu() {
    const {createTodo } = useTodos();
    const {handleIdleTodoMode} = useApp();
    const {users} = useUsers();

    const [user, setUserId] = useState("");
    const [title, setTitle] = useState("");

    const [msg, setMsg] = useState("");

    const msgRef = useRef(null);


    const resetData = () => {
        setTitle("");
        setMsg("");
        if (msgRef.current) {
            msgRef.current.className = 'msg';
        }
    };

    const setUser = (e) => {
        const id = e.target.value;
        if (Number(id) === 0) {
            setUserId("");
        } else {
            setUserId(id);
        }
    };

    const handleUserDataCheck = (data) => {
        if (data === null || data === '') {
            setMsg("User Id can't be emplty field!");
            return false;
        }else if (data !== null && data !== ''){
            setUserId(data);
            msgRef.current.className = 'msg error';
            return true;
        }
    };

    const handleTitleDataCheck = (data) => {
        if (data === null || data === '') {
            setMsg("Title can't be emplty field!");
            return false;
        } else if (data !== null && data !== ''){
            setTitle(data);
            msgRef.current.className = 'msg error';
            return true;
        }
    };

    const handleCreateRequest = () => {
        const titleFlag = handleTitleDataCheck(title);
        const userFlag = handleUserDataCheck(user);
        if (!titleFlag && !userFlag) { 
            setMsg("User id and title can't be empty fields!"); 
            msgRef.current.className = 'msg error';
        }
        if (titleFlag && userFlag) {
            console.log(user, title);
            createTodo(user, title);
            setMsg("Todo successfuly created!");
            msgRef.current.className = 'msg ok';
            setTimeout(() => {
                resetData();
            }, 1000);
        }
    };

    return (
        <div className="add-todo-menu-container">
            <h2>Create todo</h2>
            <div className="input-box-add">
                {/* <input className="user" placeholder="UserId" value={user} onChange={(e) => setUser(e.target.value)}/> */}
                <select onChange={setUser}>
                            <option key={0} value={0}>
                                User
                            </option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username + ` (${user.id})`}
                        </option>
                    ))};
                </select>
                <input className="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <p className="msg" ref={msgRef}>{msg}</p>
            </div>
            <div className="button-box">
                <button className="create" onClick={() => {
                    handleCreateRequest();
                }
                   }>Create</button>
                <button className="close" onClick={() => handleIdleTodoMode()}>Close</button>
            </div>
        </div>
    );
}

export default AddTodoMenu;