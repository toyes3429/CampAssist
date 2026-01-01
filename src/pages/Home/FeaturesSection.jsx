export default function FeaturesSection() {
  return (
    <section className="features-section">
      <h2 className="features-main-heading">
        Finally, a <span className="highlight highlight-tertiary">fast and reliable</span> campus help network
      </h2>

      <div className="features-grid-container">
        <div>
          <h3 className="feature-headings">Request items without leaving your room</h3>
          <p>Post your need on the app—whether it's a practical file, stationery, printouts, snacks, or medicines—and let a nearby student deliver it to you instantly.</p>
        </div>
        <img className="feature-img" src="images/features-1.png" alt="room based requests" />

        <div>
          <h3 className="feature-headings">Earn money while helping your peers</h3>
          <p>Accept nearby requests when you're already at a shop or canteen, purchase the item, deliver it securely, and earn quick rewards with minimal effort.</p>
        </div>
        <img className="feature-img feature-img-swap-order" src="images/features-2.png" alt="earn rewards" />

        <div>
          <h3 className="feature-headings">Smart matching for faster response</h3>
          <p>The system ensures that requests reach the most suitable helper based on proximity, urgency, and reliability, improving campus cooperation and efficiency.</p>
        </div>
        <img className="feature-img" src="images/features-3.png" alt="smart matching" />
      </div>
    </section>
  );
}
