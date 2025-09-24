import React, { useEffect, useState } from "react";
import Select from "react-select";
import { APIService } from "@cheryx2020/api-service";
import Loader from "../loader/loader";
import JsonEditor from "../json-editor/json-editor";

export default function PageEditor({ domain, language }) {
    const [domains, setDomains] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [pages, setPages] = useState([]);
    const [content, setContent] = useState(null);

    const [selectedDomain, setSelectedDomain] = useState(domain ? { value: domain, label: domain } : null);
    const [selectedLanguage, setSelectedLanguage] = useState(language ? { value: language, label: language } : null);
    const [selectedPage, setSelectedPage] = useState(null);

    const [loadingDomains, setLoadingDomains] = useState(false);
    const [loadingLanguages, setLoadingLanguages] = useState(false);
    const [loadingPages, setLoadingPages] = useState(false);
    const [loadingContent, setLoadingContent] = useState(false);

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

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
        if (!currentDomain || language) {
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
                setContent(null);
            } finally {
                setLoadingContent(false);
            }
        };
        fetchContent();
    }, [selectedPage, selectedDomain, selectedLanguage, domain, language]);

    const handleSave = async () => {
        const currentDomain = selectedDomain?.value || domain;
        const currentLanguage = selectedLanguage?.value || language;

        if (!currentDomain || !currentLanguage || !selectedPage || !content) {
            setMessage("Please select domain, language, page, and provide content.");
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

            setMessage("✅ Page content saved successfully!");
        } catch (err) {
            console.error("Error saving page content:", err);
            setMessage("❌ Failed to save page content.");
        } finally {
            setSaving(false);
        }
    };

    // Function to move content item up
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
        if (!Array.isArray(content)) {
            setContent([{ id: `item-${Date.now()}`, content: {} }]);
            return;
        }
        const newContent = [...content, { id: `item-${Date.now()}`, content: {} }];
        setContent(newContent);
    };

    // Function to delete content item
    const deleteItem = (index) => {
        if (!Array.isArray(content)) return;
        if (content.length === 1) {
            setContent(null);
            return;
        }
        const newContent = content.filter((_, i) => i !== index);
        setContent(newContent);
    };

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
            <h2>Select Page</h2>

            {!domain && (
                <div style={{ marginBottom: 20 }}>
                    <label>Domain</label>
                    <Select
                        options={domains}
                        value={selectedDomain}
                        onChange={setSelectedDomain}
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
                        onChange={setSelectedLanguage}
                        placeholder="Select a language..."
                        isSearchable
                        isLoading={loadingLanguages}
                    />
                </div>
            )}

            {(selectedLanguage || language) && (
                <div style={{ marginBottom: 20 }}>
                    <label>Page</label>
                    <Select
                        options={pages}
                        value={selectedPage}
                        onChange={setSelectedPage}
                        placeholder="Select a page..."
                        isSearchable
                        isLoading={loadingPages}
                    />
                </div>
            )}

            {loadingContent && <Loader />}

            {!loadingContent && content && (
                <div style={{ marginTop: 30 }}>
                    <h3>Page Content</h3>

                    {Array.isArray(content) ? (
                        <>
                            <button
                                onClick={addNewItem}
                                style={{
                                    marginBottom: 20,
                                    padding: "8px 16px",
                                    backgroundColor: "#28a745",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 4,
                                    cursor: "pointer"
                                }}
                            >
                                Add New Item
                            </button>
                            {content.map((item, index) => (
                                <div
                                    key={item.id}
                                    style={{
                                        marginBottom: 20,
                                        backgroundColor: "#f6f8fa",
                                        padding: 10,
                                        borderRadius: 8,
                                        position: "relative"
                                    }}
                                >
                                    <div style={{ 
                                        position: "absolute", 
                                        top: 10, 
                                        right: 10,
                                        display: "flex",
                                        gap: 5
                                    }}>
                                        <button
                                            onClick={() => moveItemUp(index)}
                                            disabled={index === 0}
                                            style={{
                                                padding: "5px 10px",
                                                backgroundColor: index === 0 ? "#aaa" : "#007bff",
                                                color: "white",
                                                border: "none",
                                                borderRadius: 4,
                                                cursor: index === 0 ? "not-allowed" : "pointer"
                                            }}
                                        >
                                            Move Up
                                        </button>
                                        <button
                                            onClick={() => moveItemDown(index)}
                                            disabled={index === content.length - 1}
                                            style={{
                                                padding: "5px 10px",
                                                backgroundColor: index === content.length - 1 ? "#aaa" : "#007bff",
                                                color: "white",
                                                border: "none",
                                                borderRadius: 4,
                                                cursor: index === content.length - 1 ? "not-allowed" : "pointer"
                                            }}
                                        >
                                            Move Down
                                        </button>
                                        <button
                                            onClick={() => deleteItem(index)}
                                            style={{
                                                padding: "5px 10px",
                                                backgroundColor: "#dc3545",
                                                color: "white",
                                                border: "none",
                                                borderRadius: 4,
                                                cursor: "pointer"
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <h4>Item {index + 1}</h4>
                                    <JsonEditor
                                        data={item}
                                        onChange={(updatedItem) => {
                                            const newContent = [...content];
                                            newContent[index] = updatedItem;
                                            setContent(newContent);
                                        }}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <JsonEditor data={content} onChange={setContent} />
                    )}

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            marginTop: 20,
                            padding: "10px 20px",
                            backgroundColor: saving ? "#aaa" : "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            cursor: saving ? "not-allowed" : "pointer",
                            fontSize: 16
                        }}
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>

                    {message && (
                        <div style={{ marginTop: 10, color: message.startsWith("✅") ? "green" : "red" }}>
                            {message}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}