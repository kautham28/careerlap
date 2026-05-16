import { companies } from './src/data/companies.js';
import fs from 'fs';

const header = ['id', 'name', 'shortName', 'industry', 'industryLabel', 'icon', 'tagline', 'description', 'headquarters', 'factory', 'phone', 'email', 'careersUrl', 'careersLabel', 'roles', 'chemDivisions', 'labFacilities', 'featured', 'students'];

const escapeCsv = (str) => {
  if (str == null) return '';
  const s = String(str);
  if (s.includes(',') || s.includes('\"') || s.includes('\n')) {
    return '\"' + s.replace(/\"/g, '\"\"') + '\"';
  }
  return s;
};

const rows = [header.join(',')];
for (const key in companies) {
  const co = companies[key];
  const row = [
    co.id,
    co.name,
    co.shortName,
    co.industry,
    co.industryLabel,
    co.icon,
    co.tagline,
    co.description,
    co.location?.headquarters || '',
    co.location?.factory || '',
    co.contact?.phone || '',
    co.contact?.email || '',
    co.careers?.url || '',
    co.careers?.label || '',
    (co.roles || []).join(';'),
    (co.chemDivisions || []).join(';'),
    (co.labFacilities || []).join(';'),
    co.featured ? 'TRUE' : 'FALSE',
    (co.students || []).join(';')
  ].map(escapeCsv);
  rows.push(row.join(','));
}

fs.writeFileSync('public/companies.csv', rows.join('\n'));
console.log('Exported to public/companies.csv');
