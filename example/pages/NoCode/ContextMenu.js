// ContextMenu.jsx
import React, { useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';

const ContextMenu = ({ x, y, isOpen, onClose, onAddAbove, onAddBelow }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Adjust position to prevent going off-screen
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 120);

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: adjustedY,
        left: adjustedX,
        background: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        zIndex: 10000,
        minWidth: '160px',
        padding: '4px 0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
      }}
    >
      <div
        onClick={onAddAbove}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <Plus size={16} />
        Add Above
      </div>
      <div
        onClick={onAddBelow}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <Plus size={16} />
        Add Below
      </div>
    </div>
  );
};

export default ContextMenu;