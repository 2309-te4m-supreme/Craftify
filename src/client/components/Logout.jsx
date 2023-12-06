import { useNavigate } from "react-router-dom"


export default function Logout() {
    const navigate = useNavigate()

    return (
        <>
        {localStorage.clear()}
        {navigate('/products')}
        </>

    )
}