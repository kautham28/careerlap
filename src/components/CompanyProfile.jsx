export default function CompanyProfile({ company, onBack }) {
  return (
    <div className="fade-slide-up" id={`profile-${company.id}`}>
      {/* Back Button */}
      <button className="profile-back-btn" onClick={onBack}>
        ← Back to Companies
      </button>

      {/* Hero Section */}
      <div className="profile-hero">
        <div className="profile-hero-inner">
          <div className="profile-icon">{company.icon}</div>
          <div className="profile-industry-badge">
            <span>{company.icon}</span>
            {company.industryLabel}
          </div>
          <h1 className="profile-name">{company.name}</h1>
          <p className="profile-tagline">{company.tagline}</p>
          <a
            href={company.careers.url}
            target="_blank"
            rel="noreferrer"
            className="profile-careers-btn"
          >
            💼 {company.careers.label}
          </a>
        </div>
      </div>

      {/* Description */}
      <div className="detail-card" style={{ marginBottom: 20 }}>
        <div className="detail-card-title">📋 About</div>
        <p style={{ fontSize: "0.9rem", color: "var(--text-mid)", lineHeight: 1.7 }}>
          {company.description}
        </p>
      </div>

      {/* Chemistry Divisions (Research Institutes) */}
      {company.chemDivisions && company.chemDivisions.length > 0 && (
        <div className="facilities-section" style={{ marginBottom: 20 }}>
          <div className="detail-card-title">🏛️ Chemistry Departments & Labs</div>
          <div className="facilities-list">
            {company.chemDivisions.map((div) => (
              <span key={div} className="facility-chip" style={{ background: "linear-gradient(135deg, #0d4a35, #0a6647)" }}>
                🔬 {div}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="profile-details-grid">
        {/* Location */}
        <div className="detail-card">
          <div className="detail-card-title">📍 Location</div>
          <div className="detail-row">
            <span className="detail-row-label">HQ</span>
            <span className="detail-row-value">{company.location.headquarters}</span>
          </div>
          {company.location.factory && (
            <div className="detail-row">
              <span className="detail-row-label">Factory</span>
              <span className="detail-row-value">{company.location.factory}</span>
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="detail-card">
          <div className="detail-card-title">📞 Contact</div>
          <div className="detail-row">
            <span className="detail-row-label">Phone</span>
            <span className="detail-row-value">{company.contact.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-row-label">Email</span>
            <span className="detail-row-value">
              <a
                href={`mailto:${company.contact.email}`}
                style={{ color: "var(--teal-dark)" }}
              >
                {company.contact.email}
              </a>
            </span>
          </div>
          <div className="detail-row" style={{ marginTop: 8 }}>
            <a
              href={company.careers.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--teal-glow)",
                border: "1px solid var(--teal)",
                color: "var(--teal-dark)",
                borderRadius: 6,
                padding: "5px 14px",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              🔗 Career Portal ›
            </a>
          </div>
        </div>
      </div>

      {/* Chemistry Roles */}
      <div className="roles-section">
        <div className="detail-card-title">👩‍🔬 Chemistry-Related Roles</div>
        <div className="roles-list">
          {company.roles.map((role) => (
            <span key={role} className="role-chip">
              <span className="role-chip-dot" />
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* Lab Facilities */}
      <div className="facilities-section">
        <div className="detail-card-title">🔬 Lab Facilities & Equipment</div>
        <div className="facilities-list">
          {company.labFacilities.map((fac) => (
            <span key={fac} className="facility-chip">⚙️ {fac}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
