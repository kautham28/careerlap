import { companies } from "../data/companies";
import CompanyCard from "./CompanyCard";
import CompanyProfile from "./CompanyProfile";

const allCompanies = Object.values(companies);

function HomePage({ onSelectCompany }) {
  const featured = allCompanies.filter((c) => c.featured);
  return (
    <>
      {/* Hero */}
      <div className="home-hero">
        <div className="hero-badge">🇱🇰 Sri Lanka's Chemistry Career Guide</div>
        <h1 className="hero-title">
          Find Your Path in<br />
          <span>Chemistry &amp; Science</span>
        </h1>
        <p className="hero-sub">
          Explore leading research institutes, pharmaceutical companies, food manufacturers, and
          more. Discover roles, lab facilities, and direct career portals — all in one place.
        </p>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-value">{allCompanies.length}+</div>
            <div className="hero-stat-label">Organizations</div>
          </div>
          <div>
            <div className="hero-stat-value">6</div>
            <div className="hero-stat-label">Industry Sectors</div>
          </div>
          <div>
            <div className="hero-stat-value">30+</div>
            <div className="hero-stat-label">Chemistry Roles</div>
          </div>
        </div>
      </div>

      {/* Featured Companies */}
      <div className="section-header">
        <div className="section-title">Featured Employers</div>
        <span className="section-count">{featured.length} companies</span>
      </div>
      <div className="company-grid">
        {featured.map((co) => (
          <CompanyCard key={co.id} company={co} onClick={() => onSelectCompany(co.id)} />
        ))}
      </div>
    </>
  );
}

function AllCompaniesPage({ onSelectCompany, searchQuery }) {
  const filtered = allCompanies.filter((co) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      co.name.toLowerCase().includes(q) ||
      co.industryLabel.toLowerCase().includes(q) ||
      co.shortName.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="section-header">
        <div className="section-title">All Companies</div>
        <span className="section-count">{filtered.length} results</span>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">No results found</div>
          <div className="empty-state-sub">Try a different search term or browse by sector in the sidebar.</div>
        </div>
      ) : (
        <div className="company-grid">
          {filtered.map((co) => (
            <CompanyCard key={co.id} company={co} onClick={() => onSelectCompany(co.id)} />
          ))}
        </div>
      )}
    </>
  );
}

function ResourcesPage() {
  const roles = [
    { title: "Quality Control Chemist", icon: "🧪", desc: "Responsible for testing raw materials and finished products to ensure they meet quality standards in pharmaceutical, food, or chemical industries." },
    { title: "Lab Analyst", icon: "🔬", desc: "Performs routine and specialized chemical analyses, maintains lab equipment, and documents results for quality assurance purposes." },
    { title: "Water Treatment Chemist", icon: "💧", desc: "Manages and monitors water purification and treatment processes, critical in breweries, food processing, and industrial plants." },
    { title: "Analytical Chemist", icon: "⚗️", desc: "Uses advanced instruments like HPLC and GC-MS to identify and quantify chemical compounds for research, quality, or regulatory purposes." },
    { title: "Research Scientist", icon: "🧬", desc: "Designs and conducts experiments to advance scientific knowledge or develop new products, typically in research institutes or R&D divisions." },
    { title: "Food Technologist", icon: "🍽️", desc: "Applies chemistry and biology to develop, improve, and ensure the safety of food products in manufacturing settings." },
  ];

  return (
    <>
      <div className="section-header">
        <div className="section-title">Career Resources</div>
        <span className="section-count">Chemistry Roles Guide</span>
      </div>
      <div className="company-grid">
        {roles.map((r) => (
          <div className="company-card" key={r.title} style={{ cursor: "default" }}>
            <div className="card-header">
              <div className="card-icon">{r.icon}</div>
              <div>
                <div className="card-title">{r.title}</div>
                <span className="card-industry-badge">Chemistry Career</span>
              </div>
            </div>
            <p className="card-tagline">{r.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <div className="section-header">
        <div className="section-title">About Lanka Career Lab</div>
      </div>
      <div className="detail-card" style={{ maxWidth: 680 }}>
        <div className="detail-card-title">📖 About This Guide</div>
        <p style={{ fontSize: "0.9rem", color: "var(--text-mid)", lineHeight: 1.8, marginBottom: 16 }}>
          Lanka Career Lab is a comprehensive career directory designed specifically for chemistry, science,
          and laboratory professionals in Sri Lanka. We aggregate information on leading employers, laboratory
          facilities, and career portals to help graduates and professionals navigate the job market efficiently.
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--text-mid)", lineHeight: 1.8, marginBottom: 16 }}>
          Our directory covers six major industry sectors: Research Institutes, Pharmaceutical Manufacturing,
          Food &amp; Beverage, Chemical Manufacturing, Analytical Testing Labs, and Polymer &amp; Rubber — giving
          you a complete picture of where chemistry careers are found in Sri Lanka.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          <a href="mailto:info@lankacareerlab.lk"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--teal-glow)", border: "1px solid var(--teal)", color: "var(--teal-dark)", borderRadius: 8, padding: "8px 18px", fontSize: "0.85rem", fontWeight: 600 }}>
            ✉️ Contact Us
          </a>
        </div>
      </div>
    </>
  );
}

export default function MainContent({ activePage, selectedCompany, onSelectCompany, onBack, searchQuery }) {
  if (selectedCompany) {
    const co = companies[selectedCompany];
    return (
      <main className="content-area">
        <CompanyProfile company={co} onBack={onBack} />
      </main>
    );
  }

  return (
    <main className="content-area">
      {activePage === "home" && <HomePage onSelectCompany={onSelectCompany} />}
      {activePage === "all" && <AllCompaniesPage onSelectCompany={onSelectCompany} searchQuery={searchQuery} />}
      {activePage === "resources" && <ResourcesPage />}
      {activePage === "about" && <AboutPage />}
    </main>
  );
}
