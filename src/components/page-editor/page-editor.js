import React, { useEffect, useState } from "react";
import Select from "react-select";
import { APIService } from "@cheryx2020/api-service";
import Loader from "../loader/loader";
import JsonEditor from "../json-editor/json-editor";
import PageItem from "../../utils/page";
import PagePreviewModal from "../page-preview-modal/page-preview-modal";
import { getPageConfig } from "@cheryx2020/utils";

export default function PageEditor({ domain, language, router, useRouter }) {
    const [domains, setDomains] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [pages, setPages] = useState([]);
    const [content, setContent] = useState(null);

    const [selectedDomain, setSelectedDomain] = useState(domain ? { value: domain, label: domain } : null);
    const [selectedLanguage, setSelectedLanguage] = useState(language ? { value: language, label: language } : null);
    const [selectedPage, setSelectedPage] = useState(null);

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

    // Fetch domains only if domain prop is not provided
    useEffect(() => {
        if (domain) return;
        const fetchDomains = async () => {
            setLoadingDomains(true);
            try {
                const res = await APIService.get("page/domains");
                setDomains(res.data.map((d) => ({ value: d, label: d })));
            } catch (err) {
                console.error("Error fetching domains:", err);
            } finally {
                setLoadingDomains(false);
            }
        };
        fetchDomains();
    }, []);

    // Fetch languages when domain changes or use provided language
    useEffect(() => {
        const currentDomain = selectedDomain?.value;
        if (!currentDomain) {
            if (language) {
                setLanguages([{ value: language, label: language }]);
            }
            return;
        }

        const fetchLanguages = async () => {
            setLoadingLanguages(true);
            try {
                const res = await APIService.get(
                    `page/languages?domain=${currentDomain}`
                );
                setLanguages(res.data.map((l) => ({ value: l, label: l })));
                setSelectedLanguage(null);
                setPages([]);
                setSelectedPage(null);
                setContent(null);
            } catch (err) {
                console.error("Error fetching languages:", err);
            } finally {
                setLoadingLanguages(false);
            }
        };
        fetchLanguages();
    }, [selectedDomain, language]);

    // Fetch pages when language changes
    useEffect(() => {
        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;

        if (!currentDomain || !currentLanguage) return;

        const fetchPages = async () => {
            setLoadingPages(true);
            try {
                const res = await APIService.get(
                    `page/pages?domain=${currentDomain}&language=${currentLanguage}`
                );
                setPages(res.data.map((p) => ({ value: p, label: p })));
                setSelectedPage(null);
                setContent(null);
            } catch (err) {
                console.error("Error fetching pages:", err);
            } finally {
                setLoadingPages(false);
            }
        };
        fetchPages();
    }, [selectedDomain, selectedLanguage, domain, language]);

    // Fetch content when page is selected
    useEffect(() => {
        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;

        if (!currentDomain || !currentLanguage || !selectedPage) {
            setContent(null);
            return;
        }

        const fetchContent = async () => {
            setLoadingContent(true);
            try {
                const res = await APIService.get(
                    `page/page-content?domain=${currentDomain}&language=${currentLanguage}&name=${selectedPage.value}`
                );
                setContent(res.data);
            } catch (err) {
                console.error("Error fetching page content:", err);
                // If fetching fails (e.g., 404 for a new page), initialize with an empty array
                setContent([]);
            } finally {
                setLoadingContent(false);
            }
        };
        fetchContent();
    }, [selectedPage, selectedDomain, selectedLanguage, domain, language]);

    const handleAddNewPage = () => {
        const trimmedName = newPageName.trim();
        if (!trimmedName) {
            setMessage({ text: "❌ Page name cannot be empty.", type: "error" });
            return;
        }

        const pageExists = pages.some(p => p.value.toLowerCase() === trimmedName.toLowerCase());
        if (pageExists) {
            setMessage({ text: `❌ Page "${trimmedName}" already exists.`, type: "error" });
            return;
        }

        const newPageOption = { value: trimmedName, label: trimmedName };
        setPages(prevPages => [...prevPages, newPageOption].sort((a, b) => a.label.localeCompare(b.label)));
        setSelectedPage(newPageOption);
        setNewPageName("");
        setMessage({ text: `✅ Now editing new page: "${trimmedName}". Add content and save.`, type: "success" });
    };

    const handleSave = async () => {
        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;

        if (!currentDomain || !currentLanguage || !selectedPage || content === null) {
            setMessage({ text: "Please select domain, language, page, and provide content.", type: "error" });
            return;
        }

        setSaving(true);
        setMessage(null);

        try {
            await APIService.post("page/page-content", {
                domain: currentDomain,
                language: currentLanguage,
                name: selectedPage.value,
                content
            });
            setMessage({ text: "✅ Page content saved successfully!", type: "success" });
        } catch (err) {
            console.error("Error saving page content:", err);
            setMessage({ text: "❌ Failed to save page content.", type: "error" });
        } finally {
            setSaving(false);
        }
    };

    const handleDeletePage = async () => {
        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;

        if (!selectedPage) {
            setMessage({ text: "❌ Please select a page to delete.", type: "error" });
            return;
        }

        if (!window.confirm(`Are you sure you want to permanently delete the page "${selectedPage.label}"? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        setMessage(null);

        try {
            await APIService.delete(`page/page?domain=${currentDomain}&language=${currentLanguage}&name=${selectedPage.value}`);
            setMessage({ text: `✅ Page "${selectedPage.label}" deleted successfully!`, type: "success" });

            // Remove the page from the dropdown list
            setPages(prevPages => prevPages.filter(p => p.value !== selectedPage.value));

            // Reset the view
            setSelectedPage(null);
            setContent(null);

        } catch (err) {
            console.error("Error deleting page:", err);
            const errorMsg = err.response?.data?.error || 'An unknown error occurred.';
            setMessage({ text: `❌ Failed to delete page: ${errorMsg}`, type: "error" });
        } finally {
            setIsDeleting(false);
        }
    };

    const handlePreview = async () => {
        if (!selectedPage) return;

        setLoadingPreview(true);
        setIsPreviewing(true); 
        setPreviewData(null);

        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;
        const currentName = selectedPage.value;

        try {
            setPreviewData(await getPageConfig({domain: currentDomain, name: currentName, language: currentLanguage}));
        } catch (err) {
            console.error("Error fetching data for preview:", err);
            setMessage({ text: "❌ Could not load preview data.", type: "error" });
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

    // Function to move content item down
    const moveItemDown = (index) => {
        if (index === content.length - 1) return;
        const newContent = [...content];
        [newContent[index], newContent[index + 1]] = [newContent[index + 1], newContent[index]];
        setContent(newContent);
    };

    // Function to add new content item
    const addNewItem = () => {
        const newItem = { id: `item-${Date.now()}`, type: "default", content: {} };
        if (!Array.isArray(content)) {
            setContent([newItem]);
            return;
        }
        setContent([...content, newItem]);
    };

    // Function to delete content item
    const deleteItem = (index) => {
        if (!Array.isArray(content)) return;
        const newContent = content.filter((_, i) => i !== index);
        setContent(newContent.length > 0 ? newContent : []);
    };

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
            <h2>Page Editor</h2>

            {!domain && (
                <div style={{ marginBottom: 20 }}>
                    <label>Domain</label>
                    <Select
                        options={domains}
                        value={selectedDomain}
                        onChange={(option) => {
                            setSelectedDomain(option);
                            setSelectedLanguage(null);
                            setSelectedPage(null);
                            setPages([]);
                            setContent(null);
                        }}
                        placeholder="Select a domain..."
                        isSearchable
                        isLoading={loadingDomains}
                    />
                </div>
            )}

            {!language && (selectedDomain || domain) && (
                <div style={{ marginBottom: 20 }}>
                    <label>Language</label>
                    <Select
                        options={languages}
                        value={selectedLanguage}
                        onChange={(option) => {
                            setSelectedLanguage(option);
                            setSelectedPage(null);
                            setPages([]);
                            setContent(null);
                        }}
                        placeholder="Select a language..."
                        isSearchable
                        isLoading={loadingLanguages}
                    />
                </div>
            )}

            {(selectedLanguage || language) && (
                <div style={{ marginBottom: 20 }}>
                    <label>Page</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ flex: 1 }}>
                            <Select
                                options={pages}
                                value={selectedPage}
                                onChange={setSelectedPage}
                                placeholder="Select a page to edit..."
                                isSearchable
                                isLoading={loadingPages}
                            />
                        </div>
                        {selectedPage && (
                            <>
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
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {loadingPreview ? "Loading..." : "Preview"}
                                </button>
                                <button
                                    onClick={handleDeletePage}
                                    disabled={isDeleting}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: isDeleting ? "#aaa" : "#dc3545",
                                        color: "white",
                                        border: "none",
                                        borderRadius: 4,
                                        cursor: isDeleting ? "not-allowed" : "pointer",
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {isDeleting ? "Deleting..." : "Delete Page"}
                                </button>
                            </>
                        )}
                    </div>
                    <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
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
                            Add New Page
                        </button>
                    </div>
                </div>
            )}

            {loadingContent && <Loader />}

            {!loadingContent && content !== null && (
                <div style={{ marginTop: 30, borderTop: '2px solid #eee', paddingTop: 20 }}>
                    <h3>
                        {selectedPage ? `Editing Content for: "${selectedPage.label}"` : 'Page Content'}
                    </h3>

                    {Array.isArray(content) ? (
                        <>
                            <button onClick={addNewItem} style={{ marginBottom: 20, padding: "8px 16px", backgroundColor: "#17a2b8", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
                                Add Content Item
                            </button>
                            {content.length === 0 && <p style={{ color: '#666' }}>This page is empty. Click "Add Content Item" to get started.</p>}
                            {content.map((item, index) => (
                                <div key={item.id || index} style={{ marginBottom: 20, backgroundColor: "#f6f8fa", padding: 10, borderRadius: 8, position: "relative" }}>
                                    <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 5, zIndex: 10 }}>
                                        <button onClick={() => moveItemUp(index)} disabled={index === 0} style={{ padding: "5px 10px", backgroundColor: index === 0 ? "#aaa" : "#007bff", color: "white", border: "none", borderRadius: 4, cursor: index === 0 ? "not-allowed" : "pointer" }}>
                                            Up
                                        </button>
                                        <button onClick={() => moveItemDown(index)} disabled={index === content.length - 1} style={{ padding: "5px 10px", backgroundColor: index === content.length - 1 ? "#aaa" : "#007bff", color: "white", border: "none", borderRadius: 4, cursor: index === content.length - 1 ? "not-allowed" : "pointer" }}>
                                            Down
                                        </button>
                                        <button onClick={() => deleteItem(index)} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
                                            Delete
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4>Item {index + 1} (Editor)</h4>
                                            <JsonEditor
                                                data={item}
                                                onChange={(updatedItem) => {
                                                    const newContent = [...content];
                                                    newContent[index] = updatedItem;
                                                    setContent(newContent);
                                                }}
                                            />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0, border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: 'white' }}>
                                            <h4>Preview</h4>
                                            <PageItem data={item} isAdmin={false} isEdit={false} isMobile={false} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <JsonEditor data={content} onChange={setContent} />
                    )}

                    <button onClick={handleSave} disabled={saving} style={{ marginTop: 20, padding: "10px 20px", backgroundColor: saving ? "#aaa" : "#007bff", color: "white", border: "none", borderRadius: 6, cursor: saving ? "not-allowed" : "pointer", fontSize: 16 }}>
                        {saving ? "Saving..." : "Save"}
                    </button>

                    {message && (
                        <div style={{ marginTop: 10, color: message.type === 'success' ? "green" : "red", fontWeight: "bold" }}>
                            {message.text}
                        </div>
                    )}
                </div>
            )}
            <PagePreviewModal
                isOpen={isPreviewing}
                onClose={() => setIsPreviewing(false)}
                data={previewData}
                loading={loadingPreview}
                router={router}
                useRouter={useRouter}
            />
        </div>
    );
}