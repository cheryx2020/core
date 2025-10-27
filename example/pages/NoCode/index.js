import React, { useState, useEffect, useCallback } from 'react';
import { generateId, regenerateIds } from './utils';
import { getMockSiteData, PAGE_TEMPLATES } from './data';
import NoCodeBuilder from './NoCodeBuilder';
import TemplateSelectionModal from './TemplateSelectionModal';
import PageManager from './PageManager';
import useBuilderStore from './store';

const SiteBuilder = ({ domain }) => {
  const { siteData, activePageId, setSiteData, setActivePageId, addPage, deletePage } = useBuilderStore()
  const [isLoading, setIsLoading] = useState(true);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  useEffect(() => {
    const fetchSiteData = async () => {
      setIsLoading(true);
      console.log(`Fetching site data for domain: ${domain}`);
      const mockApiResponse = getMockSiteData();
      setSiteData(mockApiResponse);
      const homepage = mockApiResponse.pages.find(p => p.isHomepage);
      setActivePageId(homepage ? homepage.id : mockApiResponse.pages[0]?.id);
      setIsLoading(false);
    };
    fetchSiteData();
  }, [domain, setSiteData, setActivePageId]);

  const handleSelectPage = (pageId) => {
    setActivePageId(pageId);
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
      templateKey: templateKey, // Store the template key
      config: newPageConfig
    };

    addPage(newPage);
    setIsTemplateModalOpen(false);
  };

  const handleDeletePage = (pageIdToDelete) => {
    const pageToDelete = siteData?.pages?.find(p => p.id === pageIdToDelete);
    if (!pageToDelete) return;

    if (siteData?.pages?.length <= 1) {
      alert("Cannot delete the last page.");
      return;
    }
    
    deletePage(pageIdToDelete);
  };

  const handleSaveSite = async () => {
    console.log("Saving site data to backend:", JSON.stringify(siteData, null, 2));

    // In a real app, this would be an API call:
    // try {
    //   await api.updateSite(siteData._id, siteData);
    //   alert('Site saved successfully!');
    // } catch (error) {
    //   alert('Error saving site: ' + error.message);
    // }

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
  return <SiteBuilder domain="portfolio.example.com" />;
};

export default SiteBuilderApp;