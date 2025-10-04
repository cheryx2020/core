import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import { APIService } from '@cheryx2020/api-service';
import DetailsModal from './DetailsModal';

// Base URL of the API
const API_BASE_URL = 'v2/file/files';

// Icons for file types
const FolderIcon = '📁';
const FileIcon = '📄';

const FileExplorer = () => {
  const [items, setItems] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    selectedItem: null,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const fetchPathContents = useCallback (async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await APIService.get(`${API_BASE_URL}/${currentPath}`);
      const data = await response.data;
      const sortedData = data.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'folder' ? -1 : 1;
      });
      setItems(sortedData);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPath]);

  useEffect(() => {
    // This effect now only closes the context menu on outside click
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }

    fetchPathContents();
  }, [currentPath]);

  useEffect(() => {
    const handleClick = () => {
      if (contextMenu.visible) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [contextMenu]);

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      const newPath = currentPath ? `${currentPath}/${item.name}` : item.name;
      setCurrentPath(newPath);
    }
  };

  const handleGoBack = () => {
    const pathParts = currentPath.split('/');
    pathParts.pop();
    setCurrentPath(pathParts.join('/'));
  };

  const getFileUrl = (itemName) => {
    return `/${API_BASE_URL}/${currentPath ? `${currentPath}/` : ''}${itemName}`;
  };

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.pageX,
      y: event.pageY,
      selectedItem: item,
    });
  };
  
  const handleShowDetails = async () => {
    if (!contextMenu.selectedItem) return;

    const { name, type } = contextMenu.selectedItem;
    
    if (type === 'folder') {
      alert("Details are only available for files.");
      return;
    }
    
    setContextMenu({ ...contextMenu, visible: false });
    setIsModalVisible(true);
    setIsDetailsLoading(true);
    setDetailsError(null);
    setFileDetails(null);

    const itemPath = currentPath ? `${currentPath}/${name}` : name;
    
    try {
      const response = await APIService.get(`${API_BASE_URL}/details/${itemPath}`);
      setFileDetails(response.data);
    } catch (err) {
      setDetailsError(err.response?.data || err.message);
    } finally {
      setIsDetailsLoading(false);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setFileDetails(null);
    setDetailsError(null);
  };

  const handleDeleteFile = async () => {
    if (!fileDetails) return;

    try {
      await APIService.delete(`${API_BASE_URL}/${fileDetails.path}`);
      
      alert('File deleted successfully!');
      
      handleCloseModal();
      fetchPathContents();

    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      console.error('Failed to delete file:', errorMessage);
      alert(`Error: Could not delete the file. ${errorMessage}`);
    }
  };

  const renderContextMenu = () => {
    if (!contextMenu.visible) return null;
    return (
      <div className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
        <ul>
          <li onClick={handleShowDetails}>Details</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="file-explorer">
      <div className="navigation-bar">
        {currentPath && (
          <button onClick={handleGoBack} className="back-button">
            &larr; Back
          </button>
        )}
        <span className="current-path">
          Path: /public/{currentPath}
        </span>
      </div>

      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      
      {!isLoading && !error && (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.name} onContextMenu={(e) => handleContextMenu(e, item)}>
              {item.type === 'folder' ? (
                <div className="item folder" onClick={() => handleItemClick(item)}>
                  <span className="icon">{FolderIcon}</span>
                  <span className="name">{item.name}</span>
                </div>
              ) : (
                <a href={getFileUrl(item.name)} className="item file" target="_blank" rel="noopener noreferrer">
                  <span className="icon">{FileIcon}</span>
                  <span className="name">{item.name}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
      {renderContextMenu()}

      {isModalVisible && (
        <DetailsModal
          details={fileDetails}
          isLoading={isDetailsLoading}
          error={detailsError}
          onClose={handleCloseModal}
          onDelete={handleDeleteFile}
        />
      )}
    </div>
  );
};

export default FileExplorer;