import { useState } from "react";
import "./index.css";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useCompaniesData } from "./data/useCompanies";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { companiesData, loading, error } = useCompaniesData();

  const handleSelectCompany = (id) => {
    setSelectedCompany(id);
    setActivePage("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedCompany(null);
  };

  const handleNavClick = (page) => {
    setActivePage(page);
    setSelectedCompany(null);
    setSearchQuery("");
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.trim()) {
      setActivePage("all");
      setSelectedCompany(null);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading company data from Google Sheets...</div>;
  }

  if (error) {
    return <div className="error-state">Error loading data: {error}</div>;
  }

  return (
    <div className="app">
      <TopBar
        onSearch={handleSearch}
        onNavClick={handleNavClick}
        activePage={activePage}
      />
      <div className="main-layout">
        <Sidebar
          companies={companiesData}
          selectedCompany={selectedCompany}
          onSelectCompany={handleSelectCompany}
        />
        <MainContent
          companies={companiesData}
          activePage={activePage}
          selectedCompany={selectedCompany}
          onSelectCompany={handleSelectCompany}
          onBack={handleBack}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
