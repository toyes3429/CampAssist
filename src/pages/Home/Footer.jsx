import {Link} from "react-router-dom"
export default function Footer() {
  return (
    <footer className="footer">
      <a href="index.html">
        <img className="logo-md" src="images/logo2.png" alt="campus assist logo" />
      </a>

      <ul className="social-icons-container">
        {["instagram", "facebook", "tiktok", "linkedin", "youtube"].map((icon) => (
          <li key={icon}>
            <a href="#"><img className="social-icons" src={`images/${icon}.svg`} alt={icon} /></a>
          </li>
        ))}
      </ul>

      <ul className="footer-links-container">

        <li><a href="#main-navbar">Home</a></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>

      <p className="small-text">Made with <span className="heart-icon">♥︎</span> in India for students</p>
    </footer>
  );
}
