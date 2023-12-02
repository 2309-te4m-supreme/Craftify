import { Link } from 'react-router-dom'

function Navigation(){
  return(
    <nav className='nav-bar'>
     <Link to='/products'>Home</Link>
     <Link to='/login'>Login</Link>
    </nav>
  )
}
export default Navigation