import React, { useState } from 'react';
import { Trash2, File, PlusCircle } from 'lucide-react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

const PageManager = ({ pages, activePageId, onSelectPage, onAddPage, onDeletePage }) => {
  const [hoveredPageId, setHoveredPageId] = useState(null);
  const [pageToDelete, setPageToDelete] = useState(null);

  const handleDeleteClick = (e, page) => {
    e.stopPropagation(); // Prevent the page from being selected
    if (pages.length <= 1) {
      alert("You cannot delete the last remaining page.");
      return;
    }
    setPageToDelete(page);
  };

  const handleConfirmDelete = () => {
    if (pageToDelete) {
      onDeletePage(pageToDelete.id);
      setPageToDelete(null);
    }
  };


  return (
    <>
      <div style={{ width: '200px', background: '#f1f3f5', borderRight: '1px solid #e0e0e0', padding: '10px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', padding: '0 5px' }}>Pages</h2>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {pages.map(page => (
            <div
              key={page.id}
              onClick={() => onSelectPage(page.id)}
              onMouseEnter={() => setHoveredPageId(page.id)}
              onMouseLeave={() => setHoveredPageId(null)}
              style={{ display: 'flex', alignItems: 'center', padding: '8px 10px', borderRadius: '6px', marginBottom: '5px', cursor: 'pointer', background: page.id === activePageId ? '#667eea' : 'transparent', color: page.id === activePageId ? 'white' : '#333', fontWeight: page.id === activePageId ? 600 : 400 }}
            >
              <File size={16} style={{ marginRight: '8px' }} />
              <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '5px' }}>
                {page.name}
              </span>
              {hoveredPageId === page.id && (
                <button
                  onClick={(e) => handleDeleteClick(e, page)}
                  title={`Delete page "${page.name}"`}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    color: page.id === activePageId ? 'white' : '#777',
                    opacity: 0.8
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={onAddPage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '10px', border: '1px dashed #ccc', borderRadius: '6px', background: 'transparent', cursor: 'pointer', color: '#555', marginTop: '10px' }} >
          <PlusCircle size={16} style={{ marginRight: '8px' }} /> Add Page
        </button>
      </div>

      <ConfirmDeleteModal
        isOpen={!!pageToDelete}
        pageName={pageToDelete?.name}
        onClose={() => setPageToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default PageManager;