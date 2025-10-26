import React, { useState } from "react";
import LayoutEditor from "../../src/components/layout-editor/layout-editor";
import { useRouter } from "next/router";
import Select from "react-select";

export default function LayoutEditorPage() {
  const router = useRouter();
  const [domain, setDomain] = useState("cheryx.com");
  const [language, setLanguage] = useState("en");

  const domainOptions = [
    { value: "cheryx.com", label: "cheryx.com" },
    { value: "gocnhacolen.com", label: "gocnhacolen.com" }
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "vi", label: "Vietnamese" }
  ];

  const selectedDomain = domainOptions.find(option => option.value === domain);
  const selectedLanguage = languageOptions.find(option => option.value === language);

  const handleDomainChange = (selectedOption) => {
    setDomain(selectedOption.value);
  };

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption.value);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        alignItems: 'flex-end'
      }}>
        <button
          onClick={handleBack}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          ← Back
        </button>

        <div style={{ minWidth: '200px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            Domain:
          </label>
          <Select
            value={selectedDomain}
            onChange={handleDomainChange}
            options={domainOptions}
            placeholder="Select domain..."
          />
        </div>

        <div style={{ minWidth: '200px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            Language:
          </label>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            options={languageOptions}
            placeholder="Select language..."
          />
        </div>
      </div>

      <div className="p-4">
        <LayoutEditor 
          domain={domain} 
          language={language} 
        />
      </div>
    </div>
  );
}
