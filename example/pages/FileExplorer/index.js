import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import { APIService } from '@cheryx2020/api-service';
import DetailsModal from './DetailsModal';

// Base URL of the API
const API_BASE_URL = 'v2/file/files';

// Icons for file types
const FolderIcon = '📁';
const FileIcon = '📄';
const ListViewIcon = '☰';
const GalleryViewIcon = '🖼️';

const isImageFile = (fileName) => /\.(jpe?g|png|gif|svg|webp)$/i.test(fileName);


const FileExplorer = () => {
  const [items, setItems] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('name_asc');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'gallery'

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

  const fetchPathContents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        sort: sortOrder,
      });
      const response = await APIService.get(`${API_BASE_URL}/${currentPath}?${queryParams.toString()}`);
      const data = await response.data;
      const folders = data.filter(item => item.type === 'folder');
      const files = data.filter(item => item.type === 'file');
      
      setItems([...folders, ...files]);

    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPath, sortOrder]);

  useEffect(() => {
    fetchPathContents();
  }, [fetchPathContents]);


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

  const getFileUrl = (path) => {
    return `${process.env.NEXT_PUBLIC_apiBaseUrl}${path}`;
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

  const renderItems = () => {
    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <ul className={`item-list ${viewMode === 'gallery' ? 'gallery-view' : ''}`}>
            {items.map((item) => {
                const itemFullPath = currentPath ? `${currentPath}/${item.name}` : item.name;
                const isImage = item.type === 'file' && isImageFile(item.name);

                if (viewMode === 'list') {
                    return (
                        <li key={item.name} onContextMenu={(e) => handleContextMenu(e, item)}>
                        {item.type === 'folder' ? (
                            <div className="item folder" onClick={() => handleItemClick(item)}>
                            <span className="icon">{FolderIcon}</span>
                            <span className="name">{item.name}</span>
                            </div>
                        ) : (
                            <a href={getFileUrl(itemFullPath)} className="item file" target="_blank" rel="noopener noreferrer">
                            <span className="icon">{FileIcon}</span>
                            <span className="name">{item.name}</span>
                            </a>
                        )}
                        </li>
                    );
                }
                
                return (
                    <li key={item.name} className="gallery-item-wrapper" onContextMenu={(e) => handleContextMenu(e, item)}>
                    {item.type === 'folder' ? (
                        <div className="gallery-item folder" onClick={() => handleItemClick(item)}>
                            <div className="item-preview">
                                <span className="icon-gallery">{FolderIcon}</span>
                            </div>
                            <span className="name">{item.name}</span>
                        </div>
                    ) : (
                        <a href={getFileUrl(itemFullPath)} className="gallery-item file" target="_blank" rel="noopener noreferrer">
                            <div className="item-preview">
                                {isImage ? (
                                    <img src={getFileUrl(itemFullPath)} alt={item.name} loading="lazy" />
                                ) : (
                                    <span className="icon-gallery">{FileIcon}</span>
                                )}
                            </div>
                            <span className="name">{item.name}</span>
                        </a>
                    )}
                    </li>
                );
            })}
        </ul>
    );
  };


  return (
    <div className="file-explorer">
      <div className="navigation-bar">
        <div className="nav-left">
          {currentPath && (
            <button onClick={handleGoBack} className="back-button">
              &larr; Back
            </button>
          )}
          <span className="current-path">
            Path: /public/{currentPath}
          </span>
        </div>
        
        <div className="nav-right">
            <div className="sort-container">
                <label htmlFor="sort-select">Sort by:</label>
                <select 
                    id="sort-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="name_desc">Name (Z-A)</option>
                    <option value="date_desc">Newest First</option>
                    <option value="date_asc">Oldest First</option>
                </select>
            </div>
            <div className="view-mode-switcher">
                <button
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'active' : ''}
                    title="List View"
                >
                    {ListViewIcon}
                </button>
                <button
                    onClick={() => setViewMode('gallery')}
                    className={viewMode === 'gallery' ? 'active' : ''}
                    title="Gallery View"
                >
                    {GalleryViewIcon}
                </button>
            </div>
        </div>
      </div>

      {renderItems()}
      
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