import React, {useState} from "react";

import { useOperations } from "../../contexts/operationsContext";
import { useTodos } from "../../contexts/todosContext";

function InompletedTodosMenu({users}) {
    const [selectedId, setSelectedId] = useState(0);
    const {filterByUserId, sortByTitleIncompleted, sortByUserName} = useOperations();
    const {incompleteTodos, todos} = useTodos();

    const handleUserIdChoice = (e) => {
        const id = e.target.value;
        setSelectedId(id);
        console.log(`Selected Id: ${id}`);
        filterByUserId(id);
    };
    
    const handleTitleSort = (e) => {
        const id = e.target.value;
        console.log(`Selected title Id: ${id}`);
        sortByTitleIncompleted(id, incompleteTodos);
    };

    const handleUsernameSort = (e) => {
        const id = e.target.value;
        console.log(`Selected title Id: ${id}`);
        sortByUserName(id, todos);
    };

    return (
        <div className="manage-box">
            <div className="dropdown-box">
                <p>Filter by username</p>
                <select onChange={handleUserIdChoice} value={selectedId} className="select-dropdown">
                    <option key={0} value={0}>No filter</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username + ` (${user.id})`}
                        </option>
                    ))};
                </select>
            </div>
            <div className="dropdown-box">
                <p>Sort by username</p>
                <select onChange={handleUsernameSort} className="select-dropdown">
                    <option key={0} value={0}>No sort</option>
                    <option key={1} value={1}>Username (asc)</option>
                    <option key={2} value={2}>Username (dec)</option>
                </select>
            </div>
            <div className="dropdown-box">
                <p>Sort by title</p>
                <select onChange={handleTitleSort} className="select-dropdown">
                    <option key={0} value={0}>No sort</option>
                    <option key={1} value={1}>Title (asc)</option>
                    <option key={2} value={2}>Title (dec)</option>
                </select>
            </div>
        </div>
    );
}

export default InompletedTodosMenu;