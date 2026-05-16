import { useState, useEffect } from 'react';
import Papa from 'papaparse';

// Replace this URL with your Google Sheets "Publish to the web" CSV URL
// Example: https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv
export const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQO0naH0lkkmHsejkiGIORRD1bg5ZbP2Zg3PyL2q1dB_QSvzn1NheRwhrkp1vR7ad2LvqkPTN3mPz8U/pub?output=csv'; 

export function useCompaniesData() {
  const [companiesData, setCompaniesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Papa.parse(GOOGLE_SHEET_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const parsedCompanies = {};
          results.data.forEach((row) => {
            if (!row.id) return;
            parsedCompanies[row.id] = {
              id: row.id,
              name: row.name,
              shortName: row.shortName,
              industry: row.industry,
              industryLabel: row.industryLabel,
              icon: row.icon,
              tagline: row.tagline,
              description: row.description,
              location: {
                headquarters: row.headquarters || '',
                factory: row.factory || '',
              },
              contact: {
                phone: row.phone || '',
                email: row.email || '',
              },
              careers: {
                url: row.careersUrl || '',
                label: row.careersLabel || '',
              },
              roles: row.roles ? row.roles.split(';').filter(Boolean) : [],
              chemDivisions: row.chemDivisions ? row.chemDivisions.split(';').filter(Boolean) : [],
              labFacilities: row.labFacilities ? row.labFacilities.split(';').filter(Boolean) : [],
              featured: row.featured === 'TRUE' || row.featured === 'true',
              students: row.students ? row.students.split(';').filter(Boolean) : [],
            };
          });
          setCompaniesData(parsedCompanies);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      }
    });
  }, []);

  return { companiesData, loading, error };
}
