import React, { useState, useEffect } from 'react';
import './styles.css'; // We will create this file next
import { APIService } from '@cheryx2020/api-service';

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

  // This effect runs whenever the currentPath changes
  useEffect(() => {
    const fetchPathContents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await APIService.get(`${API_BASE_URL}/${currentPath}`);

        const data = await response.data;
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPathContents();
  }, [currentPath]); // Re-run the effect when currentPath changes

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      // If it's a folder, update the path to navigate into it
      const newPath = currentPath ? `${currentPath}/${item.name}` : item.name;
      setCurrentPath(newPath);
    }
  };

  const handleGoBack = () => {
    // Go up one level in the directory tree
    const pathParts = currentPath.split('/');
    pathParts.pop();
    setCurrentPath(pathParts.join('/'));
  };

  // Helper to construct the full URL for a file link
  const getFileUrl = (itemName) => {
    return `${API_BASE_URL}/${currentPath ? `${currentPath}/` : ''}${itemName}`;
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
          Current Path: /public/{currentPath}
        </span>
      </div>

      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      
      {!isLoading && !error && (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.name}>
              {item.type === 'folder' ? (
                <div className="item folder" onClick={() => handleItemClick(item)}>
                  <span className="icon">{FolderIcon}</span>
                  <span className="name">{item.name}</span>
                </div>
              ) : (
                <a 
                  href={getFileUrl(item.name)} 
                  className="item file" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span className="icon">{FileIcon}</span>
                  <span className="name">{item.name}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileExplorer;