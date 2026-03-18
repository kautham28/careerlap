import { useState } from "react";

export default function TopBar({ onSearch, onNavClick, activePage }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "all", label: "All Companies" },
    { id: "resources", label: "Career Resources" },
    { id: "about", label: "About" },
  ];

  return (
    <header className="topbar">
      {/* Logo */}
      <div className="topbar-logo">
        <div className="topbar-logo-icon">🧪</div>
        <div className="topbar-logo-text">
          Lanka <span>Career Lab</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="topbar-nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={activePage === item.id ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              onNavClick(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Search */}
      <div className="topbar-search">
        <span className="topbar-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search companies or industries…"
          value={query}
          onChange={handleChange}
          id="topbar-search-input"
        />
      </div>
    </header>
  );
}
