import React, {useState} from "react";

import { useOperations } from "../../contexts/operationsContext";
import { useTodos } from "../../contexts/todosContext";

function CompletedTodosMenu() {
    const {sortByTitleCompleted, sortByDate} = useOperations();
    const {completedTodos} = useTodos();
    
    const handleTitleSort = (e) => {
        const id = e.target.value;
        console.log(`Selected title Id: ${id}`);
        sortByTitleCompleted(id, completedTodos);
    };

    const handleDateSort = (e) => {
        const id = e.target.value;
        console.log(`Selected title Id: ${id}`);
        sortByDate(id, completedTodos);
    };

    return (
        <div className="manage-box">
            <div className="dropdown-box">
                <p>Sort by title</p>
                <select onChange={handleTitleSort} className="select-dropdown">
                    <option key={0} value={0}>No sort</option>
                    <option key={1} value={1}>Title (asc)</option>
                    <option key={2} value={2}>Title (dec)</option>
                </select>
            </div>
            <div className="dropdown-box">
                <p>Sort by date</p>
                <select onChange={handleDateSort} className="select-dropdown">
                    <option key={0} value={0}>No sort</option>
                    <option key={1} value={1}>Date (asc)</option>
                    <option key={2} value={2}>Date (dec)</option>
                </select>
            </div>
        </div>
    );
}

export default CompletedTodosMenu;