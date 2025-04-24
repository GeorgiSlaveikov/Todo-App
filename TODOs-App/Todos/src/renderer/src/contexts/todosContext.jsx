import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchData, getUniqueId } from "../api/controller.js";
import { useApp } from "./appContext.jsx";

const TodosContext = createContext();
const api_url = "https://jsonplaceholder.typicode.com/todos";

export function TodosProvider({ children }) {
    const [todos, setTodos] = useState([]);
    const [completedTimes, setCompletedTimes] = useState({});

    const {handleApiMode, handleAddTodoMode} = useApp();

    const fetchOption = () => {
        fetchData(api_url).then(setTodos);
        handleApiMode();
    };

    const clearTodos = () => {
        setTodos([]);
    };

    // useEffect(() => {
    //     fetchData(api_url).then(setTodos);
    // }, []);

    const completeTodo = (todoId) => {
        const now = new Date();
        const time = `${now.toDateString()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: true } : todo
            )
        );

        setCompletedTimes((prev) => ({...prev, [todoId]: time}));
    };

    const undoTodo = (todoId) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: false } : todo
            )
        );

        setCompletedTimes((prev) => {
            const updated = { ...prev };
            delete updated[todoId];
            return updated;
        });
    };

    const createTodo = (inputUserId, inputTitle) => {
        handleAddTodoMode();
        const todo = {
            userId: inputUserId, 
            id: getUniqueId(todos.length), 
            title: inputTitle, 
            completed: false
        };

        setTodos((prev)=> [...prev, todo])
    };

    const value = { todos, setTodos, completeTodo, undoTodo, completedTimes, fetchOption, clearTodos, createTodo};

    return (
        <TodosContext.Provider value={value}>
            {children}
        </TodosContext.Provider>
    );
}

export function useTodos() {
    return useContext(TodosContext);
}
