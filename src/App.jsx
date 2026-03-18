import { useState } from "react";
import "./index.css";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="app">
      <TopBar
        onSearch={handleSearch}
        onNavClick={handleNavClick}
        activePage={activePage}
      />
      <div className="main-layout">
        <Sidebar
          selectedCompany={selectedCompany}
          onSelectCompany={handleSelectCompany}
        />
        <MainContent
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
