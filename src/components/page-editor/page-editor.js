import React, { useEffect, useState } from "react";
import Select from "react-select";
import { APIService } from "@cheryx2020/api-service";

function SimpleJsonEditor({ data, onChange }) {
    const [text, setText] = useState(JSON.stringify(data, null, 2));
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setText(value);

        try {
            const parsed = JSON.parse(value);
            setError(null);
            onChange(parsed);
        } catch (err) {
            setError("Invalid JSON");
        }
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <textarea
                value={text}
                onChange={handleChange}
                style={{
                    width: "100%",
                    minHeight: 200,
                    fontFamily: "monospace",
                    fontSize: 14,
                    padding: 10,
                    borderRadius: 6,
                    border: error ? "2px solid red" : "1px solid #ccc",
                    backgroundColor: "#fefefe"
                }}
            />
            {error && <div style={{ color: "red", marginTop: 5 }}>{error}</div>}
        </div>
    );
}

export default function PageEditor() {
    const [domains, setDomains] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [pages, setPages] = useState([]);
    const [content, setContent] = useState(null);

    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedPage, setSelectedPage] = useState(null);

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    // Fetch domains
    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const res = await APIService.get("page/domains");
                setDomains(res.data.map((d) => ({ value: d, label: d })));
            } catch (err) {
                console.error("Error fetching domains:", err);
            }
        };
        fetchDomains();
    }, []);

    // Fetch languages when domain changes
    useEffect(() => {
        if (!selectedDomain) return;
        const fetchLanguages = async () => {
            try {
                const res = await APIService.get(
                    `page/languages?domain=${selectedDomain.value}`
                );
                setLanguages(res.data.map((l) => ({ value: l, label: l })));
                setSelectedLanguage(null);
                setPages([]);
                setSelectedPage(null);
                setContent(null);
            } catch (err) {
                console.error("Error fetching languages:", err);
            }
        };
        fetchLanguages();
    }, [selectedDomain]);

    // Fetch pages when language changes
    useEffect(() => {
        if (!selectedDomain || !selectedLanguage) return;
        const fetchPages = async () => {
            try {
                const res = await APIService.get(
                    `page/pages?domain=${selectedDomain.value}&language=${selectedLanguage.value}`
                );
                setPages(res.data.map((p) => ({ value: p, label: p })));
                setSelectedPage(null);
                setContent(null);
            } catch (err) {
                console.error("Error fetching pages:", err);
            }
        };
        fetchPages();
    }, [selectedDomain, selectedLanguage]);

    // Fetch content when page is selected
    useEffect(() => {
        if (!selectedDomain || !selectedLanguage || !selectedPage) return;
        const fetchContent = async () => {
            try {
                const res = await APIService.get(
                    `page/page-content?domain=${selectedDomain.value}&language=${selectedLanguage.value}&name=${selectedPage.value}`
                );
                setContent(res.data);
            } catch (err) {
                console.error("Error fetching page content:", err);
            }
        };
        fetchContent();
    }, [selectedDomain, selectedLanguage, selectedPage]);

    const handleSave = async () => {
        if (!selectedDomain || !selectedLanguage || !selectedPage || !content) {
            setMessage("Please select domain, language, page, and provide content.");
            return;
        }

        setSaving(true);
        setMessage(null);

        try {
            await APIService.post("page/page-content", {
                domain: selectedDomain.value,
                language: selectedLanguage.value,
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

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
            <h2>Select Page</h2>

            <div style={{ marginBottom: 20 }}>
                <label>Domain</label>
                <Select
                    options={domains}
                    value={selectedDomain}
                    onChange={setSelectedDomain}
                    placeholder="Select a domain..."
                    isSearchable
                />
            </div>

            {languages.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                    <label>Language</label>
                    <Select
                        options={languages}
                        value={selectedLanguage}
                        onChange={setSelectedLanguage}
                        placeholder="Select a language..."
                        isSearchable
                    />
                </div>
            )}

            {pages.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                    <label>Page</label>
                    <Select
                        options={pages}
                        value={selectedPage}
                        onChange={setSelectedPage}
                        placeholder="Select a page..."
                        isSearchable
                    />
                </div>
            )}

            {content && (
                <div style={{ marginTop: 30 }}>
                    <h3>Page Content</h3>

                    {Array.isArray(content) ? (
                        content.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    marginBottom: 20,
                                    backgroundColor: "#f6f8fa",
                                    padding: 10,
                                    borderRadius: 8
                                }}
                            >
                                <h4>Item {index + 1}</h4>
                                <SimpleJsonEditor
                                    data={item}
                                    onChange={(updatedItem) => {
                                        const newContent = [...content];
                                        newContent[index] = updatedItem;
                                        setContent(newContent);
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <SimpleJsonEditor data={content} onChange={setContent} />
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
