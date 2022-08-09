import { useState } from "react"

export const useLocalStorage = (defaultValue) => {
    const [value, setvalue] = useState(() => {
        const storedData = localStorage.getItem('auth');
        
        return storedData ? JSON.parse(storedData) : defaultValue;
    });

    const setLocalStorage = (newValue) => {
        localStorage.setItem('auth', JSON.stringify(newValue));

        setvalue(newValue);
    }

    return [
        value,
        setLocalStorage
    ];
}