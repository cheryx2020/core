import React, { useState, useEffect } from 'react';
import { generateId, regenerateIds } from './utils';
import { getMockSiteData, PAGE_TEMPLATES } from './data';
import NoCodeBuilder from './NoCodeBuilder';
import TemplateSelectionModal from './TemplateSelectionModal';
import PageManager from './PageManager';

const SiteBuilder = ({ domain }) => {
  const [siteData, setSiteData] = useState(null);
  const [activePageId, setActivePageId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  useEffect(() => {
    const fetchSiteData = async () => {
      setIsLoading(true);
      console.log(`Fetching site data for domain: ${domain}`);
      // In a real app, this would be an API call, e.g., await api.getSite(domain)
      const mockApiResponse = getMockSiteData();
      setSiteData(mockApiResponse);
      const homepage = mockApiResponse.pages.find(p => p.isHomepage);
      setActivePageId(homepage ? homepage.id : mockApiResponse.pages[0]?.id);
      setIsLoading(false);
    };
    fetchSiteData();
  }, [domain]);

  const handleSelectPage = (pageId) => {
    setActivePageId(pageId);
  };

  const handlePageConfigChange = (newConfig) => {
    setSiteData(prev => ({ ...prev, pages: prev.pages.map(p => p.id === activePageId ? { ...p, config: newConfig } : p) }));
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

    setSiteData(prev => ({ ...prev, pages: [...prev.pages, newPage] }));
    setActivePageId(newPage.id);
    setIsTemplateModalOpen(false);
  };

  const handleDeletePage = (pageIdToDelete) => {
    const pageIndex = siteData.pages.findIndex(p => p.id === pageIdToDelete);
    if (pageIndex === -1) return; // Should not happen if UI is correct

    const newPages = siteData.pages.filter(p => p.id !== pageIdToDelete);

    // If the deleted page was the active one, select a new active page
    if (activePageId === pageIdToDelete) {
      // Try to select the page before it, or the first page if it was the first
      const newActiveIndex = Math.max(0, pageIndex - 1);
      const newActivePageId = newPages[newActiveIndex]?.id || null;
      setActivePageId(newActivePageId);
    }

    setSiteData(prev => ({
      ...prev,
      pages: newPages,
    }));
  };

  const handleSaveSite = async () => {
    console.log("Saving site data to backend:", JSON.stringify(siteData, null, 2));
    alert('Site saved! Check the browser console for the full JSON data.');
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>Loading Site...</div>;
  }

  const activePage = siteData.pages.find(p => p.id === activePageId);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <PageManager
        pages={siteData.pages}
        activePageId={activePageId}
        onSelectPage={handleSelectPage}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage} // Pass the delete handler
      />
      <div style={{ flex: 1, display: 'flex' }}>
        {activePage ? (
          <NoCodeBuilder
            key={activePage.id}
            initialPageConfig={activePage.config}
            onConfigChange={handlePageConfigChange}
            onSave={handleSaveSite}
            activePageId={activePage.id}
            templateKey={activePage.templateKey}
          />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
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