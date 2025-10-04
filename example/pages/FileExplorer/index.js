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

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    selectedItem: null,
  });

  useEffect(() => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }

    const fetchPathContents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await APIService.get(`${API_BASE_URL}/${currentPath}`);

        const data = await response.data;
        // Sort items to show folders first, then alphabetically
        const sortedData = data.sort((a, b) => {
            if (a.type === b.type) {
              return a.name.localeCompare(b.name);
            }
            return a.type === 'folder' ? -1 : 1;
        });
        setItems(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

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
    return `${API_BASE_URL}/${currentPath ? `${currentPath}/` : ''}${itemName}`;
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
  
  const handleShowDetails = () => {
    if (contextMenu.selectedItem) {
      const { name, type } = contextMenu.selectedItem;
      alert(`Details:\n\nName: ${name}\nType: ${type}`);
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  const renderContextMenu = () => {
    if (!contextMenu.visible) return null;

    return (
      <div
        className="context-menu"
        style={{ top: contextMenu.y, left: contextMenu.x }}
      >
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
          Current Path: /public/{currentPath}
        </span>
      </div>

      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      
      {!isLoading && !error && (
        <ul className="item-list">
          {items.map((item) => (
            <li 
              key={item.name}
              onContextMenu={(e) => handleContextMenu(e, item)}
            >
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
      {renderContextMenu()}
    </div>
  );
};

export default FileExplorer;