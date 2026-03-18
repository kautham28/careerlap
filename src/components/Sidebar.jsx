import { useState } from "react";
import { industries, topRecruiters, quickLinks, companies } from "../data/companies";

function AccordionSection({ trigger, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion-item">
      <button
        className={`accordion-trigger${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        {trigger}
        <span className={`accordion-chevron${open ? " open" : ""}`}>▼</span>
      </button>
      <div className={`accordion-body${open ? " open" : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default function Sidebar({ selectedCompany, onSelectCompany }) {
  const topRecruiterData = topRecruiters.map((id) => companies[id]);

  return (
    <aside className="sidebar">
      {/* ── Industry Sectors ────────────── */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Industry Sectors</div>
        {industries.map((industry) => (
          <AccordionSection
            key={industry.id}
            trigger={
              <>
                <span className="accordion-icon-emoji">{industry.icon}</span>
                <span className="accordion-label">{industry.label}</span>
              </>
            }
          >
            <ul className="accordion-company-list">
              {industry.companies.map((cid) => {
                const co = companies[cid];
                if (!co) return null;
                return (
                  <li key={cid}>
                    <button
                      className={`sidebar-company-btn${selectedCompany === cid ? " active" : ""}`}
                      onClick={() => onSelectCompany(cid)}
                    >
                      <span className="sidebar-company-icon">{co.icon}</span>
                      {co.shortName}
                    </button>
                  </li>
                );
              })}
            </ul>
          </AccordionSection>
        ))}
      </div>

      <div className="sidebar-divider" />

      {/* ── Top Recruiters ──────────────── */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Top Recruiters</div>
        {topRecruiterData.map((co) => (
          <button
            key={co.id}
            className={`top-recruiter-btn${selectedCompany === co.id ? " active" : ""}`}
            onClick={() => onSelectCompany(co.id)}
          >
            <span className="recruiter-dot" />
            {co.shortName}
          </button>
        ))}
      </div>

      <div className="sidebar-divider" />

      {/* ── Quick Links ─────────────────── */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Quick Links</div>

        {/* Current Vacancies */}
        <AccordionSection
          trigger={
            <>
              <span className="accordion-icon-emoji">💼</span>
              <span className="accordion-label">Current Vacancies</span>
            </>
          }
        >
          <div className="accordion-company-list quick-link-accordion">
            {quickLinks[0].links.map((link) => (
              <div key={link.name} className="quick-link-item">
                <a href={link.url} target="_blank" rel="noreferrer">
                  <span>↗</span>
                  {link.name}
                  <span className="quick-link-arrow">›</span>
                </a>
              </div>
            ))}
          </div>
        </AccordionSection>

        {/* Lab Equipment Guide */}
        <AccordionSection
          trigger={
            <>
              <span className="accordion-icon-emoji">🔭</span>
              <span className="accordion-label">Lab Equipment Guide</span>
            </>
          }
        >
          <div className="lab-items">
            {quickLinks[1].items.map((item) => (
              <span key={item} className="lab-tag">⚙️ {item}</span>
            ))}
          </div>
        </AccordionSection>
      </div>
    </aside>
  );
}
