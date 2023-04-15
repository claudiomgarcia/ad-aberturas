import { useState, useEffect } from "react"

export const useAsync = (asyncFunction, dependencies) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    if(!Array.isArray(dependencies)) {
        console.error('Hubo un error al pasar dependencias');
        dependencies = []
    }

    useEffect(() => {
        setLoading(true)

        asyncFunction()
            .then(data => {
                setData(data)
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false)
            })
    },[...dependencies])//eslint-disable-line

    return {
        data,
        loading,
        error
    }
}