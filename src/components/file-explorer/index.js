import React, { useState, useEffect, useCallback } from 'react';
import styles from './index.module.scss';
import { APIService } from '@cheryx2020/api-service';
import DetailsModal from './detail-modal';
import { isImageFile } from './utils';

// Base URL of the API
const API_BASE_URL = 'v2/file/files';

// Icons for file types
const FolderIcon = '📁';
const FileIcon = '📄';
const ListViewIcon = '☰';
const GalleryViewIcon = '🖼️';


const FileExplorer = () => {
  const [items, setItems] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [sortOrder, setSortOrder] = useState('name_asc');
  const [viewMode, setViewMode] = useState('list');

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

  useEffect(() => {
    try {
      const savedSortOrder = localStorage.getItem('fileExplorerSortOrder');
      if (savedSortOrder) {
        setSortOrder(savedSortOrder);
      }
      
      const savedViewMode = localStorage.getItem('fileExplorerViewMode');
      if (savedViewMode === 'gallery' || savedViewMode === 'list') {
        setViewMode(savedViewMode);
      }
    } catch (e) {
      console.error("Could not access localStorage", e);
    }
  }, []);

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
    try {
      localStorage.setItem('fileExplorerSortOrder', sortOrder);
    } catch (e) {
      console.error("Could not access localStorage", e);
    }
  }, [sortOrder]);

  useEffect(() => {
    try {
      localStorage.setItem('fileExplorerViewMode', viewMode);
    } catch (e) {
      console.error("Could not access localStorage", e);
    }
  }, [viewMode]);


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
  
  const handleShowDetails = async (item) => {
    if (!item) return;

    if (item.type === 'folder') {
      alert("Details are only available for files.");
      return;
    }
    
    setContextMenu({ ...contextMenu, visible: false });
    setIsModalVisible(true);
    setIsDetailsLoading(true);
    setDetailsError(null);
    setFileDetails(null);

    const itemPath = currentPath ? `${currentPath}/${item.name}` : item.name;
    
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
      <div className={styles.contextMenu} style={{ top: contextMenu.y, left: contextMenu.x }}>
        <ul>
          <li onClick={() => handleShowDetails(contextMenu.selectedItem)}>Details</li>
        </ul>
      </div>
    );
  };

  const renderItems = () => {
    if (isLoading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    
    const listClassName = `${styles.itemList} ${viewMode === 'gallery' ? styles.galleryView : ''}`;

    return (
        <ul className={listClassName}>
            {items.map((item) => {
                const itemFullPath = currentPath ? `${currentPath}/${item.name}` : item.name;
                const isImage = item.type === 'file' && isImageFile(item.name);

                if (viewMode === 'list') {
                    return (
                        <li key={item.name} onContextMenu={(e) => handleContextMenu(e, item)}>
                        {item.type === 'folder' ? (
                            <div className={`${styles.item} ${styles.folder}`} onClick={() => handleItemClick(item)}>
                                <span className={styles.icon}>{FolderIcon}</span>
                                <span className={styles.name}>{item.name}</span>
                            </div>
                        ) : isImage ? (
                            <div className={`${styles.item} ${styles.file}`} onClick={() => handleShowDetails(item)}>
                                <span className={styles.icon}>{FileIcon}</span>
                                <span className={styles.name}>{item.name}</span>
                            </div>
                        ) : (
                            <a href={getFileUrl(itemFullPath)} className={`${styles.item} ${styles.file}`} target="_blank" rel="noopener noreferrer">
                                <span className={styles.icon}>{FileIcon}</span>
                                <span className={styles.name}>{item.name}</span>
                            </a>
                        )}
                        </li>
                    );
                }
                
                return (
                    <li key={item.name} className={styles.galleryItemWrapper} onContextMenu={(e) => handleContextMenu(e, item)}>
                    {item.type === 'folder' ? (
                        <div className={`${styles.galleryItem} ${styles.folder}`} onClick={() => handleItemClick(item)}>
                            <div className={styles.itemPreview}>
                                <span className={styles.iconGallery}>{FolderIcon}</span>
                            </div>
                            <span className={styles.name}>{item.name}</span>
                        </div>
                    ) : isImage ? (
                        <div className={`${styles.galleryItem} ${styles.file}`} onClick={() => handleShowDetails(item)}>
                             <div className={styles.itemPreview}>
                                <img src={getFileUrl(itemFullPath)} alt={item.name} loading="lazy" />
                            </div>
                            <span className={styles.name}>{item.name}</span>
                        </div>
                    ) : (
                        <a href={getFileUrl(itemFullPath)} className={`${styles.galleryItem} ${styles.file}`} target="_blank" rel="noopener noreferrer">
                            <div className={styles.itemPreview}>
                                <span className={styles.iconGallery}>{FileIcon}</span>
                            </div>
                            <span className={styles.name}>{item.name}</span>
                        </a>
                    )}
                    </li>
                );
            })}
        </ul>
    );
  };


  return (
    <div className={styles.fileExplorer}>
      <div className={styles.navigationBar}>
        <div className={styles.navLeft}>
          {currentPath && (
            <button onClick={handleGoBack} className={styles.backButton}>
              &larr; Back
            </button>
          )}
          <span className={styles.currentPath}>
            Path: /public/{currentPath}
          </span>
        </div>
        
        <div className={styles.navRight}>
            <div className={styles.sortContainer}>
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
            <div className={styles.viewModeSwitcher}>
                <button
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? styles.active : ''}
                    title="List View"
                >
                    {ListViewIcon}
                </button>
                <button
                    onClick={() => setViewMode('gallery')}
                    className={viewMode === 'gallery' ? styles.active : ''}
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
          imageUrl={
            fileDetails && isImageFile(fileDetails.name)
              ? getFileUrl(fileDetails.path)
              : null
          }
        />
      )}
    </div>
  );
};

export default FileExplorer;