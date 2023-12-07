import { useNavigate } from "react-router-dom"


export default function Logout({ setToken }) {
    const navigate = useNavigate()


    return (
        <>
        {setToken(null)}
        {localStorage.clear()}
        {navigate('/products')}
        </>

    )
}