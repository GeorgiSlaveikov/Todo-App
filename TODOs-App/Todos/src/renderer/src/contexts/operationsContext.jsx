import React, { createContext, useContext, useState, useEffect, useRef} from "react";

import { useTodos } from "./todosContext";
import { useUsers } from "./usersContext";

const OperationsContext = createContext();

export function OperationsProvider({children}) {

    const {todos, setTodos, completedTodos, incompleteTodos, 
        updateCompletedAndIncomplete, setIncompleteTodos, setCompletedTodos, times} = useTodos();
    
    const {users} = useUsers();
  
    const tempTodosRef = useRef([]);
  
    useEffect(() => {
        if (Array.isArray(todos) && todos.length > 0) {
            console.log("Saving the first full todos to tempTodos: ", todos);
            tempTodosRef.current = todos; 
            updateCompletedAndIncomplete(todos);  
        }}, [todos]);

 
    const filterByUserId = (id) => {
        if (Number(id) === 0) {
            // 0 means show all
            setTodos(tempTodosRef.current); 
            updateCompletedAndIncomplete(tempTodosRef.current); 
            return;
        }
        const filtered = tempTodosRef.current.filter(todo => todo.userId === Number(id));
        updateCompletedAndIncomplete(filtered); 
    };

    const sortByUserName = (operationId, todosArray) => {
         //0-no sort 1-asc, 2-dec
         let sorted = [];
        if (Number(operationId) === 0) {
            console.log('reset');
            setTodos(tempTodosRef.current); 
            updateCompletedAndIncomplete(tempTodosRef.current); 
            return;
        }
        if (Number(operationId) === 1) {
            sorted = todosArray.slice().sort((a, b) => {
                const userA = users.find(user => user.id === a.userId);
                const userB = users.find(user => user.id === b.userId);
              
                return userA.username.localeCompare(userB.username);
            });
        } else if (Number(operationId) === 2) {
            sorted = todosArray.slice().sort((a, b) => {
                const userA = users.find(user => user.id === a.userId);
                const userB = users.find(user => user.id === b.userId);
              
                return userB.username.localeCompare(userA.username);
            });
        }
        // setTodos(sorted);
        updateCompletedAndIncomplete(sorted);
    };

    const sortByTitleCompleted = (operationId, todosArray) => {
        //0-no sort 1-asc, 2-dec
        if (Number(operationId) === 0) {
            const originalCompletedArrayWithoutSort = tempTodosRef.current.filter((todo) => todo.completed);
            setCompletedTodos(originalCompletedArrayWithoutSort);
            return;
        }
        let sorted = [];
        if (Number(operationId) === 1) {
            sorted = [...todosArray].sort((a, b) => {
                if (a.title && b.title) {
                    return a.title.localeCompare(b.title);
                }
                return 0;
            });
        } else if (Number(operationId) === 2) {
            sorted = [...todosArray].sort((a, b) => {
                if (a.title && b.title) {
                    return b.title.localeCompare(a.title);
                }
                return 0;
            });
        }
        
        setCompletedTodos(sorted);
    }; 

    const sortByTitleIncompleted = (operationId, todosArray) => {
         //0-no sort 1-asc, 2-dec
        let sorted = [];
        if (Number(operationId) === 0) {
            const originalCompletedArrayWithoutSort = tempTodosRef.current.filter((todo) => !todo.completed);
            setIncompleteTodos(originalCompletedArrayWithoutSort);
            return;
        }
        if (Number(operationId) === 1) {
            sorted = [...todosArray].sort((a, b) => {
                if (a.title && b.title) {
                    return a.title.localeCompare(b.title);
                }
                return 0;
            });
        } else if (Number(operationId) === 2) {
            sorted = [...todosArray].sort((a, b) => {
                if (a.title && b.title) {
                    return b.title.localeCompare(a.title);
                }
                return 0;
            });
        }
        
        setIncompleteTodos(sorted);
    };
 
    const sortByDate = (operationId, todosArray) => {
         //0-no sort 1-asc, 2-dec
        let sorted = [];
        if (Number(operationId) === 0) {
            const originalCompletedArrayWithoutSort = tempTodosRef.current.filter((todo) => todo.completed);
            setCompletedTodos(originalCompletedArrayWithoutSort);
            return;
        }
        if (Number(operationId) === 1) {
            sorted = todosArray.slice().sort((a, b) => {
               const dateA = new Date(times[a.id]);
               const dateB = new Date(times[b.id]);
               return dateB - dateA;
            });
        } else if (Number(operationId) === 2) {
            sorted = todosArray.slice().sort((a, b) => {
                const dateA = new Date(times[a.id]);
                const dateB = new Date(times[b.id]);
                return dateA - dateB;
             });
        }
        setCompletedTodos(sorted);
    };

    const value = {filterByUserId, sortByUserName, sortByTitleCompleted, sortByTitleIncompleted, sortByDate};

    return (
        <OperationsContext.Provider value={value}>
            {children}
        </OperationsContext.Provider>
    );
}

export function useOperations() {
    return useContext(OperationsContext);
}