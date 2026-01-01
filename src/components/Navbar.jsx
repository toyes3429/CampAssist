import { Link } from "react-router-dom";
function Navbar() {
    return(
    <nav className="navbar" id="main-navbar">
        <Link className="beta" to="/"><img className="logo-sm" src="images/logo2.png" alt="campus assist logo" /></Link>
        <ul className="nav-btn-container">
            <li><Link to="/login" className="btn btn-primary-outline" >Login</Link></li>
            <li><Link to="/register" className="btn btn-primary" >Register</Link></li>
        </ul>
    </nav>)
}
export default Navbar;