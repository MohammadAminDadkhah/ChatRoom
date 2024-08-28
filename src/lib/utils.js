export const formError = (errors, setError) => {
    Object.entries(errors).forEach(([key, value]) => {
        setError(key, {type: "custom", message: value})
    })
}