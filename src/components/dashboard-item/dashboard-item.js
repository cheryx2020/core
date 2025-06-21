import React from 'react';

const DashboardItem = ({ Link = ({children}) => <>{children}</>, url, text, onClick }) => {
  return (
    <Link href={onClick ? '#' : url} passHref>
      <a
        href={onClick ? '#' : url}
        target={onClick ? '_self' : '_blank'}
        onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '8rem',
          height: '8rem',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          margin: '0.5rem',
          padding: '1rem',
          textAlign: 'center',
          color: '#374151',
          fontSize: '0.875rem',
          fontWeight: '500',
          textDecoration: 'none',
          transition: 'background-color 0.2s, box-shadow 0.2s',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}
      >
        {text}
      </a>
    </Link>
  );
};

export default DashboardItem;