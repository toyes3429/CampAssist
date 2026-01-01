import {Link} from "react-router-dom"
export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-card">
        <h2 className="cta-heading">Get started now</h2>
        <Link className="btn btn-secondary" to="/register">Join CampusAssist</Link>
      </div>
    </section>
  );
}
