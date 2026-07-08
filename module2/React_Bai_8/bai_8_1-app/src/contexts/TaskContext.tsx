import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("smart_tasks");
        return saved ? JSON.parse(saved) : [];
    });
    
    useEffect(() => {
        localStorage.setItem("smart_tasks", JSON.stringify("smart_tasks"));
    }, [tasks]);

    const addTask = useCallback((text: string, priority: string) => {
        const newTask = { id: Date.now(), text, priority: priority, completed: false, createAt: new Date() };
        setTasks((pre) => [newTask, ...pre]);
    }, []);

    const deleteTask = useCallback((id) => {
        setTasks((pre) => pre.filter((item) => item.id !== id));
    }, []);

    const toggleTask = useCallback((id) => { 
        setTasks((pre) => pre.map((t) =>(t.id === id ? { ...t, complete: !t.complete } : t)));
    }, []);

    const value = useMemo(()=>({tasks, addTask, deleteTask, toggleTask}),[tasks, addTask, deleteTask, toggleTask]);

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
