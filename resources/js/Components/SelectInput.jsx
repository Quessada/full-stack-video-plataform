import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ className = '', isFocused = false, options = [], ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >
            {options.map((option) => {
                if (typeof option === 'string') {
                    return (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    );
                } else {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label || option.value}
                        </option>
                    );
                }
            })}
        </select>
    );
});