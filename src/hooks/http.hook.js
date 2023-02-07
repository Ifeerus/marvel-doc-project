import { useState, useCallback } from "react";

//http - ent. that works with requests
export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {"Content-Type": "application/json"}) => {

        setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers}); //sending request

            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json(); //getting data

            return data;
        } catch(err) {
            setProcess('error');
            throw err;
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading');
    }, []);

    return {request, clearError, process, setProcess}
}