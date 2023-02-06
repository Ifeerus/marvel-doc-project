import { useState, useCallback } from "react";

//http - ent. that works with requests
export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); //false

    const request = useCallback(async (url, method = 'GET', body = null, headers = {"Content-Type": "application/json"}) => {

        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers}); //sending request

            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json(); //getting data

            setLoading(false);
            return data;
        } catch(err) {
            setLoading(false);
            setError(err.message);
            throw err;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}