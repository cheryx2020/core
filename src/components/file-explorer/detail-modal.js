import React from 'react';
import styles from './detail-modal.module.scss';

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
      return <div className={styles.loading}>Fetching details...</div>;
    }

    if (error) {
      return <div className={styles.error}>Error: {error}</div>;
    }

    if (details) {
      return (
        <>
          {imageUrl && (
            <div className={styles.modalImagePreview}>
              <img src={imageUrl} alt={`Preview of ${details.name}`} />
            </div>
          )}

          <ul className={styles.detailsList}>
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
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>File Details</h2>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          {renderContent()}
        </div>
        {details && !isLoading && !error && (
          <div className={styles.modalFooter}>
            <button 
              onClick={handleDeleteClick} 
              className={styles.deleteButton}
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