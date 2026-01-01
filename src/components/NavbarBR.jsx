import { Link } from "react-router-dom";
function NavbarBR({mode}) {
    let showtext;
    if(mode==="Buyer")
    {
        mode = "Runner"
        showtext = "Buyer"
    }
    else{
        mode="Buyer"
        showtext="Runner"
    }
    return(
    <nav className="navbar">
        <Link className="beta" to="/"><img className="logo-sm" src="images/logo2.png" alt="campus assist logo" /></Link>
            <h1 style={{textAlign:"center",fontSize:"4.8rem"}}><span className="highlight highlight-tertiary">{showtext} Mode</span></h1>
        <ul className="nav-btn-container">
            <li><Link to={`/${mode}`} className="btn btn-primary" >{mode}</Link></li>
        </ul>
    </nav>)
}
export default NavbarBR;