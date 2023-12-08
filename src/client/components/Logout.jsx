import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Logout({ setToken }) {
    const navigate = useNavigate()

    useEffect(() => {
        {navigate('/products')}
    })

    return (
        <>
        {setToken(null)}
        {localStorage.clear()}
        </>
    )
}