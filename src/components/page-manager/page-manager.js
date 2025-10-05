import React, { useEffect, useState } from "react";
import Select from "react-select";
import { APIService } from "@cheryx2020/api-service";
import Loader from "../loader/loader";
import JsonEditor from "../json-editor/json-editor";
import PageItem from "../../utils/page";
import PagePreviewModal from "../page-preview-modal/page-preview-modal";
import { getPageConfig } from "@cheryx2020/utils";
import { COMPONENT_DEFINITIONS } from "../../utils/component-definition";

export default function PagesManager({ domain, language, router, useRouter, Image, Link }) {
    const [domains, setDomains] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [pages, setPages] = useState([]);
    const [content, setContent] = useState(null);

    const [selectedDomain, setSelectedDomain] = useState(domain ? { value: domain, label: domain } : null);
    const [selectedLanguage, setSelectedLanguage] = useState(language ? { value: language, label: language } : null);
    const [editingPageName, setEditingPageName] = useState(null);

    const [newPageName, setNewPageName] = useState("");

    const [loadingDomains, setLoadingDomains] = useState(false);
    const [loadingLanguages, setLoadingLanguages] = useState(false);
    const [loadingPages, setLoadingPages] = useState(false);
    const [loadingContent, setLoadingContent] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [message, setMessage] = useState(null);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [loadingPreview, setLoadingPreview] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const [publishingPageName, setPublishingPageName] = useState(null);
    const [selectedComponentTypeToAdd, setSelectedComponentTypeToAdd] = useState(COMPONENT_DEFINITIONS[0] || null);

    // Fetch domains only if domain prop is not provided
    useEffect(() => {
        if (domain) return;
        setLoadingDomains(true);
        APIService.get("page/domains")
            .then(res => setDomains(res.data.map((d) => ({ value: d, label: d }))))
            .catch(err => console.error("Error fetching domains:", err))
            .finally(() => setLoadingDomains(false));
    }, [domain]);

    // Fetch languages when domain changes or use provided language
    useEffect(() => {
        const currentDomain = selectedDomain?.value;
        if (!currentDomain) {
            if (language) setLanguages([{ value: language, label: language }]);
            return;
        }
        setLoadingLanguages(true);
        APIService.get(`page/languages?domain=${currentDomain}`)
            .then(res => {
                setLanguages(res.data.map((l) => ({ value: l, label: l })));
                setSelectedLanguage(null);
                setPages([]);
            })
            .catch(err => console.error("Error fetching languages:", err))
            .finally(() => setLoadingLanguages(false));
    }, [selectedDomain, language]);

    // Fetch pages when language changes
    useEffect(() => {
        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;
        if (!currentDomain || !currentLanguage) return;
        setLoadingPages(true);
        APIService.get(`page/pages?domain=${currentDomain}&language=${currentLanguage}`)
            .then(res => {
                const sortedPages = res.data.sort((a, b) => a.name.localeCompare(b.name));
                setPages(sortedPages);
            })
            .catch(err => {
                console.error("Error fetching pages:", err);
                setPages([]);
            })
            .finally(() => setLoadingPages(false));
    }, [selectedDomain, selectedLanguage, domain, language]);

    useEffect(() => {
        if (!editingPageName) {
            setContent(null);
            return;
        }

        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;

        setLoadingContent(true);
        APIService.get(`page/page-content?domain=${currentDomain}&language=${currentLanguage}&name=${editingPageName}`)
            .then(res => setContent(res.data))
            .catch(err => {
                console.error("Error fetching page content:", err);
                setContent([]);
            })
            .finally(() => setLoadingContent(false));
    }, [editingPageName, selectedDomain, selectedLanguage, domain, language]);

    const handleAddNewPage = () => {
        const trimmedName = newPageName.trim();
        if (!trimmedName) {
            setMessage({ text: "❌ Page name cannot be empty.", type: "error" });
            return;
        }

        const pageExists = pages.some(p => p.name.toLowerCase() === trimmedName.toLowerCase());
        if (pageExists) {
            setMessage({ text: `❌ Page "${trimmedName}" already exists.`, type: "error" });
            return;
        }

        setEditingPageName(trimmedName);
        setNewPageName("");
        setMessage(null);
    };

    const handleSave = async () => {
        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;

        if (!currentDomain || !currentLanguage || !editingPageName || content === null) {
            setMessage({ text: "Missing data for saving.", type: "error" });
            return;
        }

        setSaving(true);
        setMessage(null);

        try {
            await APIService.post("page/page-content", {
                domain: currentDomain,
                language: currentLanguage,
                name: editingPageName,
                content
            });
            setMessage({ text: "✅ Page content saved successfully!", type: "success" });
            if (!pages.some(p => p.name === editingPageName)) {
                const newPage = { name: editingPageName, isPublished: false };
                setPages(prevPages => [...prevPages, newPage].sort((a, b) => a.name.localeCompare(b.name)));
            }

        } catch (err) {
            console.error("Error saving page content:", err);
            setMessage({ text: "❌ Failed to save page content.", type: "error" });
        } finally {
            setSaving(false);
        }
    };
    const handleDeletePage = async (pageName) => {
        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;

        if (!window.confirm(`Are you sure you want to permanently delete the page "${pageName}"? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        setMessage(null);

        try {
            await APIService.delete(`page/page?domain=${currentDomain}&language=${currentLanguage}&name=${pageName}`);
            setMessage({ text: `✅ Page "${pageName}" deleted successfully!`, type: "success" });
            // Filter based on the 'name' property
            setPages(prevPages => prevPages.filter(p => p.name !== pageName));

        } catch (err) {
            console.error("Error deleting page:", err);
            const errorMsg = err.response?.data?.error || 'An unknown error occurred.';
            setMessage({ text: `❌ Failed to delete page: ${errorMsg}`, type: "error" });
        } finally {
            setIsDeleting(false);
        }
    };

    const handleTogglePublish = async (pageName, currentStatus) => {
        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;
        const newStatus = !currentStatus;

        setPublishingPageName(pageName);
        setMessage(null);

        try {
            await APIService.patch("page/publish-status", {
                domain: currentDomain,
                language: currentLanguage,
                name: pageName,
                isPublished: newStatus
            });

            setPages(prevPages =>
                prevPages.map(p =>
                    p.name === pageName ? { ...p, isPublished: newStatus } : p
                )
            );
            setMessage({ text: `✅ Page "${pageName}" has been ${newStatus ? 'published' : 'unpublished'}.`, type: "success" });

        } catch (err) {
            console.error("Error updating publish status:", err);
            setMessage({ text: `❌ Failed to update status for "${pageName}".`, type: "error" });
        } finally {
            setPublishingPageName(null); // Clear loading state
        }
    };

    const handlePreview = async () => {
        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;

        setLoadingPreview(true);
        setIsPreviewing(true);
        setPreviewData(null); // Clear old preview data
        setMessage(null);

        try {
            setPreviewData(await getPageConfig({ domain: currentDomain, name: editingPageName, language: currentLanguage }));
        } catch (err) {
            console.error("Error fetching preview:", err);
            setMessage({ text: "❌ Failed to load page preview.", type: "error" });
            setIsPreviewing(false); // Close modal on error
        } finally {
            setLoadingPreview(false);
        }
    };
    
    const moveItemUp = (index) => {
        if (index === 0) return;
        const newContent = [...content];
        [newContent[index - 1], newContent[index]] = [newContent[index], newContent[index - 1]];
        setContent(newContent);
    };
    const moveItemDown = (index) => {
        if (index === content.length - 1) return;
        const newContent = [...content];
        [newContent[index], newContent[index + 1]] = [newContent[index + 1], newContent[index]];
        setContent(newContent);
    };
    const addNewItem = () => {
        if (!selectedComponentTypeToAdd) {
            setMessage({ text: "❌ Please select a component type to add.", type: "error" });
            return;
        }

        const newItem = {
            id: selectedComponentTypeToAdd.value,
            ...selectedComponentTypeToAdd.isGlobal ? {} : { _uid: `${selectedComponentTypeToAdd.value}-${Date.now()}` },
            ...selectedComponentTypeToAdd.defaultData,
        };
        setContent(currentContent => Array.isArray(currentContent) ? [...currentContent, newItem] : [newItem]);
    };
    const deleteItem = (index) => {
        const newContent = content.filter((_, i) => i !== index);
        setContent(newContent.length > 0 ? newContent : []);
    };

    const tableStyles = {
        table: { width: '100%', borderCollapse: 'collapse', marginTop: 20 },
        th: { backgroundColor: '#f2f2f2', padding: '12px', border: '1px solid #ddd', textAlign: 'left' },
        td: { padding: '12px', border: '1px solid #ddd', transition: 'background-color 0.3s ease' },
        actionButton: {
            padding: "6px 12px",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            marginRight: 8,
            minWidth: '80px',
            textAlign: 'center'
        }
    };

    const renderEditor = () => (
        <div>
            <button
                onClick={() => setEditingPageName(null)} // Go back to the list
                style={{ marginBottom: 20, padding: "8px 16px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
            >
                &larr; Back to Page List
            </button>
            {loadingContent ? <Loader /> : content !== null && (
                <div style={{ marginTop: 10, borderTop: '2px solid #eee', paddingTop: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Editing Content for: "{editingPageName}"</h3>
                        <div>
                            <button
                                onClick={handlePreview}
                                disabled={loadingPreview}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: loadingPreview ? '#aaa' : "#17a2b8",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 4,
                                    cursor: loadingPreview ? 'not-allowed' : "pointer",
                                }}
                            >
                                {loadingPreview ? "Loading..." : "Preview Page"}
                            </button>
                        </div>
                    </div>

                    {Array.isArray(content) ? (
                        <>
                            <div style={{ display: 'flex', gap: 10, margin: "20px 0", alignItems: 'flex-end' }}>
                                <div style={{ flex: 1 }}>
                                    <label htmlFor="component-type-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Add New Component:</label>
                                    <Select
                                        id="component-type-select"
                                        options={COMPONENT_DEFINITIONS}
                                        value={selectedComponentTypeToAdd}
                                        onChange={setSelectedComponentTypeToAdd}
                                        styles={{ container: (base) => ({ ...base, width: '100%' }) }}
                                    />
                                </div>
                                <button onClick={addNewItem} style={{ padding: "8px 16px", backgroundColor: "#17a2b8", color: "white", border: "none", borderRadius: 4, cursor: "pointer", height: '38px' }}>
                                    Add Selected Component
                                </button>
                            </div>

                            {content.length === 0 && <p style={{ color: '#666' }}>This page is empty. Select a component type and click "Add Selected Component" to get started.</p>}
                            {content.map((item, index) => (
                                <div key={item._uid || item.id || index} style={{ marginBottom: 20, backgroundColor: "#f6f8fa", padding: 10, borderRadius: 8, position: "relative" }}>
                                    <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 5, zIndex: 10 }}>
                                        <button onClick={() => moveItemUp(index)} disabled={index === 0} style={{ padding: "5px 10px", backgroundColor: index === 0 ? "#aaa" : "#007bff", color: "white", border: "none", borderRadius: 4, cursor: index === 0 ? "not-allowed" : "pointer" }}>Up</button>
                                        <button onClick={() => moveItemDown(index)} disabled={index === content.length - 1} style={{ padding: "5px 10px", backgroundColor: index === content.length - 1 ? "#aaa" : "#007bff", color: "white", border: "none", borderRadius: 4, cursor: index === content.length - 1 ? "not-allowed" : "pointer" }}>Down</button>
                                        <button onClick={() => deleteItem(index)} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>Delete</button>
                                    </div>
                                    <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4>Item {index + 1} ({COMPONENT_DEFINITIONS.find(def => def.value === item.id)?.label || item.id || 'Unknown'}) (Editor)</h4>
                                            <JsonEditor data={item} onChange={(updatedItem) => setContent(c => c.map((i, idx) => idx === index ? updatedItem : i))} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0, border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: 'white' }}>
                                            <h4>Preview</h4>
                                            <PageItem Link={Link} Image={Image} data={item} isAdmin={false} isEdit={false} isMobile={false} router={router} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : <JsonEditor data={content} onChange={setContent} />}

                    <button onClick={handleSave} disabled={saving} style={{ marginTop: 20, padding: "10px 20px", backgroundColor: saving ? "#aaa" : "#007bff", color: "white", border: "none", borderRadius: 6, cursor: saving ? "not-allowed" : "pointer", fontSize: 16 }}>
                        {saving ? "Saving..." : "Save Page"}
                    </button>
                </div>
            )}
        </div>
    );

    const renderList = () => (
        <div>
            <h2>Page Management</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: 20 }}>
                {!domain && (
                    <div>
                        <label>Domain</label>
                        <Select
                            options={domains}
                            value={selectedDomain}
                            onChange={(option) => { setSelectedDomain(option); setSelectedLanguage(null); setPages([]); }}
                            isLoading={loadingDomains}
                        />
                    </div>
                )}
                {!language && (selectedDomain || domain) && (
                    <div>
                        <label>Language</label>
                        <Select
                            options={languages}
                            value={selectedLanguage}
                            onChange={(option) => setSelectedLanguage(option)}
                            isLoading={loadingLanguages}
                        />
                    </div>
                )}
            </div>

            {(selectedLanguage || language) && (
                <>
                    <div style={{ marginTop: 20, borderTop: '2px solid #eee', paddingTop: 20 }}>
                        <h4>Add New Page</h4>
                        <div style={{ display: "flex", gap: 10 }}>
                            <input
                                type="text"
                                value={newPageName}
                                onChange={(e) => setNewPageName(e.target.value)}
                                placeholder="Enter new page name (e.g., about-us)"
                                style={{ flex: 1, padding: "8px 12px", border: "1px solid #ccc", borderRadius: 4 }}
                            />
                            <button
                                onClick={handleAddNewPage}
                                style={{ padding: "8px 16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
                            >
                                Create & Edit Page
                            </button>
                        </div>
                    </div>

                    <h4 style={{ marginTop: 30 }}>Existing Pages</h4>
                    {loadingPages ? <Loader /> : (
                        <table style={tableStyles.table}>
                            <thead>
                                <tr>
                                    <th style={tableStyles.th}>Page Name</th>
                                    <th style={tableStyles.th}>Status</th>
                                    <th style={tableStyles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages.length > 0 ? pages.map(page => (
                                    <tr
                                        key={page.name}
                                        style={{ backgroundColor: page.isPublished ? '#e6ffed' : 'transparent' }}
                                    >
                                        <td style={tableStyles.td}>{page.name}</td>
                                        <td style={tableStyles.td}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '12px',
                                                color: 'white',
                                                backgroundColor: page.isPublished ? '#28a745' : '#6c757d',
                                                fontSize: '0.8rem'
                                            }}>
                                                {page.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td style={tableStyles.td}>
                                            <button
                                                style={{ ...tableStyles.actionButton, backgroundColor: page.isPublished ? '#ffc107' : '#28a745' }}
                                                onClick={() => handleTogglePublish(page.name, page.isPublished)}
                                                disabled={publishingPageName === page.name}
                                            >
                                                {publishingPageName === page.name ? '...' : (page.isPublished ? 'Unpublish' : 'Publish')}
                                            </button>
                                            <button
                                                style={{ ...tableStyles.actionButton, backgroundColor: '#007bff' }}
                                                onClick={() => setEditingPageName(page.name)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                style={{ ...tableStyles.actionButton, backgroundColor: '#dc3545' }}
                                                onClick={() => handleDeletePage(page.name)}
                                                disabled={isDeleting}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" style={{ ...tableStyles.td, textAlign: 'center', color: '#666' }}>No pages found for this domain/language.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );


    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
            {editingPageName ? renderEditor() : renderList()}

            {message && (
                <div style={{ marginTop: 20, padding: 10, borderRadius: 5, backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24', fontWeight: "bold" }}>
                    {message.text}
                </div>
            )}
            <PagePreviewModal
                isOpen={isPreviewing}
                onClose={() => setIsPreviewing(false)}
                data={previewData}
                loading={loadingPreview}
                router={router}
                useRouter={useRouter}
                Image={Image}
                Link={Link}
            />
        </div>
    );
}