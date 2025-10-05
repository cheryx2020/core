import React from 'react';

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const DetailsModal = ({ details, isLoading, error, onClose, onDelete, imageUrl }) => {
  if (!details && !isLoading && !error) {
    return null;
  }

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${details.name}"? This action cannot be undone.`)) {
      onDelete();
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading">Fetching details...</div>;
    }

    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    if (details) {
      return (
        <>
          {imageUrl && (
            <div className="modal-image-preview">
              <img src={imageUrl} alt={`Preview of ${details.name}`} />
            </div>
          )}

          <ul className="details-list">
            <li><strong>Name:</strong> <span>{details.name}</span></li>
            <li><strong>Path:</strong> <span>{process.env.NEXT_PUBLIC_apiBaseUrl}{details.path}</span></li>
            <li><strong>Size:</strong> <span>{formatBytes(details.size)}</span></li>
            <li><strong>Created:</strong> <span>{new Date(details.createdAt).toLocaleString()}</span></li>
            <li><strong>Modified:</strong> <span>{new Date(details.modifiedAt).toLocaleString()}</span></li>
            <li><strong>Permissions:</strong> <span>{details.permissions}</span></li>
          </ul>
        </>
      );
    }
    return null;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>File Details</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          {renderContent()}
        </div>
        {details && !isLoading && !error && (
          <div className="modal-footer">
            <button 
              onClick={handleDeleteClick} 
              className="delete-button"
            >
              Delete File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsModal;