import React, { useState } from 'react';

const TemplateSelectionModal = ({ isOpen, onClose, onCreate }) => {
  const [pageName, setPageName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!pageName.trim()) { alert('Please enter a page name.'); return; }
    onCreate(selectedTemplate, pageName);
    setPageName('');
    setSelectedTemplate('blank');
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1001 }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '90%', maxWidth: '600px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Create a New Page</h2>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Page Name</label>
          <input type="text" value={pageName} onChange={(e) => setPageName(e.target.value)} placeholder="e.g., About Us" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px' }} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '12px', fontWeight: 500 }}>Choose a Template</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
            {Object.entries(PAGE_TEMPLATES).map(([key, { name }]) => (
              <div key={key} onClick={() => setSelectedTemplate(key)} style={{ padding: '16px', border: `2px solid ${selectedTemplate === key ? '#667eea' : '#e0e0e0'}`, borderRadius: '8px', cursor: 'pointer', textAlign: 'center', fontWeight: 500, transition: 'all 0.2s ease', transform: selectedTemplate === key ? 'scale(1.03)' : 'scale(1)', }}>{name}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleCreate} style={{ padding: '10px 20px', border: 'none', borderRadius: '6px', background: '#667eea', color: 'white', cursor: 'pointer' }}>Create Page</button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionModal;
