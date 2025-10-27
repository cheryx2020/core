import React from "react";
export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, pageName }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1002 }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '90%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '10px' }}>Confirm Deletion</h2>
        <p style={{ marginBottom: '24px', color: '#555' }}>
          Are you sure you want to delete the page "<strong>{pageName}</strong>"? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '6px', background: 'white', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '10px 20px', border: 'none', borderRadius: '6px', background: '#e53e3e', color: 'white', cursor: 'pointer', fontWeight: 500 }}>Delete</button>
        </div>
      </div>
    </div>
  );
};