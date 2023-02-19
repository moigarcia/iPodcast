import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
    const [storedValue, setValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : initialValue;
    });

    const setLocalStorage = (value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    };

    return [storedValue, setLocalStorage];
};

export default useLocalStorage;
