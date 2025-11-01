import React, { useState, useEffect, useCallback } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { 
    setSiteData, 
    setActivePageId, 
    setIsLoading,
    addPage,
    deletePage,
    selectSiteData,
    selectActivePageId,
    selectIsLoading
} from './store';
import { generateId, regenerateIds } from './utils';
import { getMockSiteData, PAGE_TEMPLATES } from './data';
import NoCodeBuilder from './NoCodeBuilder';
import TemplateSelectionModal from './TemplateSelectionModal';
import PageManager from './PageManager';

const SiteBuilderContent = ({ domain }) => {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const activePageId = useSelector(selectActivePageId);
  const isLoading = useSelector(selectIsLoading);
  
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  useEffect(() => {
    const fetchSiteData = async () => {
      dispatch(setIsLoading(true));
      console.log(`Fetching site data for domain: ${domain}`);
      const mockApiResponse = getMockSiteData();
      dispatch(setSiteData(mockApiResponse));
      const homepage = mockApiResponse.pages.find(p => p.isHomepage);
      dispatch(setActivePageId(homepage ? homepage.id : mockApiResponse.pages[0]?.id));
      dispatch(setIsLoading(false));
    };
    fetchSiteData();
  }, [domain, dispatch]);

  const handleSelectPage = (pageId) => {
    dispatch(setActivePageId(pageId));
  };

  const handleAddPage = () => {
    setIsTemplateModalOpen(true);
  };

  const handleCreatePageFromTemplate = (templateKey, pageName) => {
    const template = PAGE_TEMPLATES[templateKey];
    if (!template) { console.error(`Template "${templateKey}" not found.`); return; }

    const newPageConfig = regenerateIds(JSON.parse(JSON.stringify(template.config)));
    const newPage = {
      id: generateId('page'),
      name: pageName,
      slug: `/${pageName.toLowerCase().replace(/\s+/g, '-')}`,
      isHomepage: false,
      templateKey: templateKey,
      config: newPageConfig
    };

    dispatch(addPage(newPage));
    setIsTemplateModalOpen(false);
  };

  const handleDeletePage = (pageIdToDelete) => {
    const pageToDelete = siteData?.pages?.find(p => p.id === pageIdToDelete);
    if (!pageToDelete) return;

    if (siteData?.pages?.length <= 1) {
      alert("Cannot delete the last page.");
      return;
    }
    
    dispatch(deletePage(pageIdToDelete));
  };

  const handleSaveSite = async () => {
    console.log("Saving site data to backend:", JSON.stringify(siteData, null, 2));
    alert('Site saved! Check the browser console for the full JSON data.');
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#666'
      }}>
        Loading Site...
      </div>
    );
  }

  const activePage = siteData?.pages?.find(p => p.id === activePageId);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <PageManager
        pages={siteData.pages}
        activePageId={activePageId}
        onSelectPage={handleSelectPage}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage}
      />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {activePage ? (
          <NoCodeBuilder
            key={activePage.id}
            onSave={handleSaveSite}
            activePageId={activePage.id}
            templateKey={activePage.templateKey}
          />
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#999'
          }}>
            <h2>Please select a page to edit.</h2>
          </div>
        )}
      </div>

      <TemplateSelectionModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onCreate={handleCreatePageFromTemplate}
      />
    </div>
  );
};

const SiteBuilderApp = () => {
  return (
    <Provider store={store}>
      <SiteBuilderContent domain="portfolio.example.com" />
    </Provider>
  );
};

export default SiteBuilderApp;