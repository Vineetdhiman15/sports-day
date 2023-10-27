import { useState, useEffect } from 'react';

const useDataFetching = (url) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const useErrorBoundary = () => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (error, info) => {
            setHasError(error);
            console.error(error, info);
        };

        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    return hasError;
}

export {
    useDataFetching,
    useDebounce,
    useErrorBoundary
};