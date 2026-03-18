export default function CompanyCard({ company, onClick }) {
  return (
    <div className="company-card fade-slide-up" onClick={onClick} id={`card-${company.id}`}>
      <div className="card-header">
        <div className="card-icon">{company.icon}</div>
        <div>
          <div className="card-title">{company.name}</div>
          <span className="card-industry-badge">{company.industryLabel}</span>
        </div>
      </div>
      <p className="card-tagline">{company.tagline}</p>
      <div className="card-roles">
        {company.roles.slice(0, 3).map((role) => (
          <span key={role} className="role-tag">{role}</span>
        ))}
        {company.roles.length > 3 && (
          <span className="role-tag">+{company.roles.length - 3} more</span>
        )}
      </div>
    </div>
  );
}
