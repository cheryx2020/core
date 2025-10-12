import React, { useEffect, useState } from "react";
import Select from "react-select";
import { APIService } from "@cheryx2020/api-service";
import Loader from "../loader/loader";
import JsonEditor from "../json-editor/json-editor";

const FormField = ({ label, name, value, onChange, type = "text", ...props }) => (
    <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>{label}</label>
        {type === 'checkbox' ? (
            <input type="checkbox" name={name} checked={!!value} onChange={onChange} {...props} />
        ) : (
            <input
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                style={{ width: "100%", padding: "8px", boxSizing: "border-box", borderRadius: 4, border: '1px solid #ccc' }}
                {...props}
            />
        )}
    </div>
);

export default function PostEditor({ language = "en" }) {
    const [posts, setPosts] = useState([]);
    const [selectedPostOption, setSelectedPostOption] = useState(null);
    const [currentPost, setCurrentPost] = useState(null);

    const [loadingPosts, setLoadingPosts] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    // Fetch the list of posts for the specified language
    useEffect(() => {
        const fetchPosts = async () => {
            setSelectedPostOption(null);
            setCurrentPost(null);
            setMessage(null);
            setLoadingPosts(true);

            try {
                // CHANGED: The backend's `getListPost` uses the `checkLanguage` utility,
                // which likely reads a query parameter. We'll assume it's `language`.
                const res = await APIService.get(`list-post?language=${language}`);
                
                const postOptions = res.data.data.map((p) => ({
                    value: p._id,
                    label: `${p.title} (${p.id})`,
                }));
                setPosts(postOptions);
            } catch (err) {
                console.error(`Error fetching posts for language '${language}':`, err);
                setMessage(`❌ Failed to load posts for language: ${language}.`);
            } finally {
                setLoadingPosts(false);
            }
        };
        fetchPosts();
    }, [language]);

    // Fetch the full details of a post when it's selected from the dropdown
    // This effect does not need to be changed.
    useEffect(() => {
        if (!selectedPostOption) {
            setCurrentPost(null);
            return;
        }

        const fetchPostDetails = async () => {
            setLoadingDetails(true);
            setMessage(null);
            try {
                // Use the getPostById endpoint which returns the full post object
                const matches = [...selectedPostOption.label.matchAll(/\(([^)]+)\)/g)];
                const res = await APIService.get(`post?id=${matches.at(-1)[1]}`);
                // Safely parse the content string into a JSON object for the editor
                try {
                    res.data.data.content = JSON.parse(res.data.data.content);
                } catch (e) {
                    console.warn("Content is not valid JSON, initializing as empty array.", res.data.content);
                    res.data.data.content = []; // Fallback for invalid or empty content
                }
                setCurrentPost(res.data.data);
            } catch (err) {
                console.error("Error fetching post details:", err);
                setMessage(`❌ Failed to load details for ${selectedPostOption.label}.`);
            } finally {
                setLoadingDetails(false);
            }
        };
        fetchPostDetails();
    }, [selectedPostOption]);


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentPost(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleContentChange = (newContent) => {
        setCurrentPost(prev => ({
            ...prev,
            content: newContent
        }));
    };

    const handleSave = async () => {
        if (!currentPost) return;

        setSaving(true);
        setMessage(null);

        // Create a payload with only the fields we want to update.
        // Important: Stringify the content object before sending it to the backend.
        const payload = {
            ...currentPost,
            content: JSON.stringify(currentPost.content),
        };
        // The backend `updatePost` function uses the MongoDB `_id` from the URL parameter.
        const postId = currentPost._id;

        try {
            await APIService.put(`posts/${postId}`, payload);
            setMessage("✅ Post updated successfully!");
        } catch (err) {
            console.error("Error saving post:", err);
            setMessage(`❌ Failed to update post. ${err.response?.data?.error || ''}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
            <h2>Post Editor ({language.toUpperCase()})</h2>

            <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Select a Post to Edit</label>
                <Select
                    options={posts}
                    value={selectedPostOption}
                    onChange={setSelectedPostOption}
                    placeholder={`Search and select a ${language.toUpperCase()} post...`}
                    isSearchable
                    isLoading={loadingPosts}
                    key={language} 
                />
            </div>

            {loadingDetails && <Loader />}

            {!loadingDetails && currentPost && (
                <div style={{ borderTop: '2px solid #eee', paddingTop: 20 }}>
                    <h3>Editing: {currentPost.title}</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <FormField label="Title" name="title" value={currentPost.title} onChange={handleInputChange} />
                            <FormField label="Slug (ID)" name="id" value={currentPost.id} onChange={handleInputChange} />
                            <FormField label="Category" name="category" value={currentPost.category} onChange={handleInputChange} />
                            <FormField label="Main Image URL" name="imgUrl" value={currentPost.imgUrl} onChange={handleInputChange} />
                            <FormField label="Language" name="language" value={currentPost.language} onChange={handleInputChange} />
                        </div>
                        <div>
                            <FormField label="SEO Title" name="seoTitle" value={currentPost.seoTitle} onChange={handleInputChange} />
                            <FormField label="SEO Description" name="seoDescription" value={currentPost.seoDescription} onChange={handleInputChange} />
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                                <FormField label="Is Big" name="isBig" type="checkbox" checked={currentPost.isBig} onChange={handleInputChange} />
                                <FormField label="Is Pattern" name="isPattern" type="checkbox" checked={currentPost.isPattern} onChange={handleInputChange} />
                                <FormField label="Is Menu" name="isMenu" type="checkbox" checked={currentPost.isMenu} onChange={handleInputChange} />
                                <FormField label="Is Free" name="isFree" type="checkbox" checked={currentPost.isFree} onChange={handleInputChange} />
                                <FormField label="Show at Home" name="isShowAtHome" type="checkbox" checked={currentPost.isShowAtHome} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <h4 style={{marginBottom: 10}}>Content</h4>
                        <JsonEditor
                            data={currentPost.content}
                            onChange={handleContentChange}
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            marginTop: 20, padding: "10px 20px", fontSize: 16,
                            backgroundColor: saving ? "#aaa" : "#007bff", color: "white",
                            border: "none", borderRadius: 6, cursor: saving ? "not-allowed" : "pointer",
                        }}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                    {message && (
                        <div style={{ marginTop: 10, color: message.startsWith("✅") ? "green" : "red", fontWeight: "bold" }}>
                            {message}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}