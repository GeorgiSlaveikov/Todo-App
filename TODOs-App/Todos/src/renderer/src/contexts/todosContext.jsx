import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchData, getUniqueId } from "../api/controller.js";
import { useApp } from "./appContext.jsx";

const TodosContext = createContext();

const api_url = "https://jsonplaceholder.typicode.com/todos";

export function TodosProvider({ children }) {
    const [todos, setTodos] = useState([]);
    const [isTodosFetched, setIsTodosFetched] = useState(false);
    const [completedTimes, setCompletedTimes] = useState({});
    const [times, setTimes] = useState([]);

    const [completedTodos, setCompletedTodos] = useState([]);
    const [incompleteTodos, setIncompleteTodos] = useState([]);

    const {handleApiMode, handleAddTodoMode} = useApp();
    
    // let completedTodos = todos.filter(todo => todo.completed);
    // let incompleteTodos = todos.filter(todo => !todo.completed);

    const updateCompletedAndIncomplete = (newTodos) => {
        setCompletedTodos(newTodos.filter(todo => todo.completed));
        setIncompleteTodos(newTodos.filter(todo => !todo.completed));
    };

    const fetchOption = async () => {
        const data = await fetchData(api_url);
        setTodos(data);
        updateCompletedAndIncomplete(data);
        setIsTodosFetched(true);
        handleApiMode();
    };

    useEffect(() => {
        if (isTodosFetched) {
            handlePrecompletedTodos();
        }
    }, [isTodosFetched]);

    const clearTodos = () => {
        setTodos([]);
        setCompletedTodos([]);
        setIncompleteTodos([]);
    };

    const handlePrecompletedTodos = () => {
        const now = new Date();
        const time = `${now.toDateString()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        completedTodos.forEach((todo) => {
            setCompletedTimes((prev) => ({...prev, [todo.id]: `Pre-completed on ${time}`}));
            setTimes((prev) => ({...prev, [todo.id]: time}));
        });
    };

    const completeTodo = (todoId) => {
        const now = new Date();
        const time = `${now.toDateString()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        // setTodos((prevTodos) =>
        //     prevTodos.map((todo) =>
        //         todo.id === todoId ? { ...todo, completed: true } : todo
        //     )
        // );

        setTodos((prevTodos) => {
            const newTodos = prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: true } : todo
            );
            // setTodos(newTodos);
            updateCompletedAndIncomplete(newTodos);
            return newTodos;
        });

        setCompletedTimes((prev) => ({...prev, [todoId]: `Completed on: ${time}`}));
        setTimes((prev) => ({...prev, [todoId]: time}));
    };

    const undoTodo = (todoId) => {
        setTodos((prevTodos) =>{
            const newTodos = prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: false } : todo
            );
            // setTodos(newTodos);
            updateCompletedAndIncomplete(newTodos);
            return newTodos;
        });

        setCompletedTimes((prev) => {
            const updated = { ...prev };
            delete updated[todoId];
            return updated;
        });
    };

    const createTodo = (inputUserId, inputTitle) => {
        handleAddTodoMode();
        const newTodo = {
            userId: Number(inputUserId), 
            id: getUniqueId(todos.length), 
            title: inputTitle, 
            completed: false
        };

        console.log(todos);
        console.log("new todo is:", newTodo);

        const newTodosArray = [...todos, newTodo];

        setTodos(newTodosArray); 
        updateCompletedAndIncomplete(newTodosArray);

        console.log("New todos array:", newTodosArray);
    };

    const value = { todos, setTodos, completeTodo, undoTodo, completedTimes, times, fetchOption, clearTodos, createTodo, 
        completedTodos, incompleteTodos, setCompletedTodos, setIncompleteTodos, updateCompletedAndIncomplete
    };

    return (
        <TodosContext.Provider value={value}>
            {children}
        </TodosContext.Provider>
    );
}

export function useTodos() {
    return useContext(TodosContext);
}
