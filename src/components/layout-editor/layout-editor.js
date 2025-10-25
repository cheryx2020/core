import React, { useEffect, useState, useCallback } from "react";
import { APIService } from "@cheryx2020/api-service";
import HeaderCherxy from "../header-cheryx/header-cheryx";
import ImageUploadable from "../image-uploadable/image-uploadable"; // Adjust path as needed
import JsonEditor from "../json-editor/json-editor";

/**
 * A component for editing website layout configurations.
 * It fetches and manages layout data based on the provided domain and language.
 *
 * @param {{ domain: string, language: string }} props
 * @param {string} props.domain The domain for which to edit the layout (e.g., 'cheryx.com').
 * @param {string} props.language The language code for the layout (e.g., 'en').
 */
export default function LayoutEditor({ domain, language }) {
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMenu, setNewMenu] = useState({ text: "", url: "" });
  const [selectedId, setSelectedId] = useState("");
  const [layoutIds, setLayoutIds] = useState([]);
  const [isJsonMode, setIsJsonMode] = useState(false);

  // Fetches the list of available layout IDs and sets the first one as active.
  const fetchLayoutIds = useCallback(async () => {
    if (!domain || !language) return;

    try {
      const res = await APIService.get(`layout/ids?domain=${domain}&language=${language}`);
      if (res.data.success && res.data.data.length > 0) {
        const newIds = res.data.data;
        setLayoutIds(newIds);
        setSelectedId(newIds[0]); // Default to the first available ID
      } else {
        setLayoutIds([]);
        setSelectedId("");
        setLayout(null); // Clear layout if no IDs are found
      }
    } catch (err) {
      console.error("Error fetching layout IDs:", err);
      setLayoutIds([]);
      setSelectedId("");
      setLayout(null);
    }
  }, [domain, language]);

  // Fetches the full layout data based on the current selections.
  const fetchLayout = useCallback(async () => {
    if (!selectedId) {
      setLayout(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await APIService.get(
        `layout?language=${language}&domain=${domain}&id=${selectedId}`
      );
      const parsed = { ...res.data, content: JSON.parse(res.data.content) };
      setLayout(parsed);
    } catch (err) {
      console.error("Error fetching layout:", err);
      setLayout(null);
    } finally {
      setLoading(false);
    }
  }, [selectedId, domain, language]);

  // Effect to fetch layout IDs when domain or language props change.
  useEffect(() => {
    setLoading(true);
    setLayout(null); // Clear previous layout data on prop change
    fetchLayoutIds();
  }, [fetchLayoutIds]);

  // Effect to fetch the full layout data when the selected ID changes.
  useEffect(() => {
    fetchLayout();
  }, [fetchLayout]);

  const saveLayout = async () => {
    if (!layout) {
      alert("No layout data to save.");
      return;
    }
    try {
      const updated = {
        domain, // from props
        id: selectedId,
        language, // from props
        name: layout.name,
        content: JSON.stringify(layout.content),
      };
      const response = await APIService.put(`layout`, updated);
      if (response.data.success) {
        alert("Layout saved successfully!");
      } else {
        alert("Failed to save layout: " + response.data.error);
      }
    } catch (err) {
      console.error("Error saving layout:", err);
      alert("Failed to save layout");
    }
  };

  /**
   * 2. Handles image upload to the server and updates the state.
   * Assumes an API endpoint 'upload/image' that accepts multipart/form-data.
   *
   * @param {'header' | 'footer'} section The layout section to update.
   * @param {string} key The specific key within the section (e.g., 'logo', 'image').
   * @param {object} fileData The data from ImageUploadable's onChangeImage callback.
   */
  const handleImageUpload = async (section, key, fileData) => {
    if (!fileData || !fileData.imgFile) {
      console.warn("No file selected for upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", fileData.imgFile);
      formData.append("isTemp", "true");

      const response = await APIService.post('v2/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.imageUrl;

      if (imageUrl) {
        if (section === 'header') {
          handleUpdateHeader(key, imageUrl);
        } else if (section === 'footer') {
          handleUpdateFooter(key, imageUrl);
        }
      } else {
        alert('Image upload failed: ' + (response.data.error || 'Unknown server error'));
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("An error occurred during image upload. Check the console for details.");
    }
  };


  const handleAddMenu = () => {
    if (!newMenu.text || !newMenu.url) return;
    setLayout((prev) => ({
      ...prev,
      content: { ...prev.content, menu: [...prev.content.menu, newMenu] },
    }));
    setNewMenu({ text: "", url: "" });
  };

  const handleUpdateMenu = (index, key, value) => {
    const updatedMenu = [...layout.content.menu];
    updatedMenu[index][key] = value;
    setLayout((prev) => ({
      ...prev,
      content: { ...prev.content, menu: updatedMenu },
    }));
  };

  const handleDeleteMenu = (index) => {
    const updatedMenu = layout.content.menu.filter((_, i) => i !== index);
    setLayout((prev) => ({
      ...prev,
      content: { ...prev.content, menu: updatedMenu },
    }));
  };

  const handleMoveMenuUp = (index) => {
    if (index === 0) return;
    const updatedMenu = [...layout.content.menu];
    [updatedMenu[index - 1], updatedMenu[index]] = [updatedMenu[index], updatedMenu[index - 1]];
    setLayout((prev) => ({
      ...prev,
      content: { ...prev.content, menu: updatedMenu },
    }));
  };

  const handleMoveMenuDown = (index) => {
    if (index === layout.content.menu.length - 1) return;
    const updatedMenu = [...layout.content.menu];
    [updatedMenu[index], updatedMenu[index + 1]] = [updatedMenu[index + 1], updatedMenu[index]];
    setLayout((prev) => ({
      ...prev,
      content: { ...prev.content, menu: updatedMenu },
    }));
  };


  const handleUpdateHeader = (key, value) => {
    setLayout((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        header: { ...prev.content.header, [key]: value },
      },
    }));
  };

  const handleMenuDataChange = (updatedMenuData) => {
    setLayout((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        menu: updatedMenuData,
      },
    }));
  };

  const handleUpdateFooter = (key, value) => {
    setLayout((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        footer: { ...prev.content.footer, [key]: value },
      },
    }));
  };

  const handleContentChange = (newContent) => {
    setLayout((prevLayout) => ({
      ...prevLayout,
      content: newContent,
    }));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px", alignItems: "flex-end", flexWrap: "wrap", }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Layout ID:</label>
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", minWidth: "120px" }} disabled={layoutIds.length === 0}>
            {layoutIds.length === 0 ? (<option>No IDs found</option>) : (layoutIds.map(id => (<option key={id} value={id}>{id}</option>)))}
          </select>
        </div>
        <button onClick={fetchLayout} style={{ background: "gray", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }} disabled={!selectedId}>
          Refresh
        </button>
      </div>

      {loading ? (<div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>) :
        !layout ? (<div style={{ textAlign: "center", padding: "20px" }}>No layout found for the selected criteria.</div>) :
          (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap", gap: '20px' }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h2 style={{ fontSize: "24px", fontWeight: "bold", marginRight: "10px" }}>Layout Editor:</h2>
                  <input type="text" value={layout.name} onChange={(e) => setLayout((prev) => ({ ...prev, name: e.target.value }))} style={{ fontSize: "20px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", flex: "0 1 300px" }} />
                </div>
                <button onClick={() => setIsJsonMode(prev => !prev)} style={{ background: "darkorange", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Switch to {isJsonMode ? 'UI Editor' : 'JSON Editor'}
                </button>
              </div>

              {isJsonMode ? (
                <div style={{ marginBottom: "30px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
                    Layout Content (JSON)
                  </h3>
                  <JsonEditor
                    data={layout.content}
                    onChange={handleContentChange}
                  />
                </div>
              ) : (
                <>
                  {/* Header section */}
                  <div style={{ marginBottom: "30px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>Header Logo</h3>
                    <ImageUploadable src={layout?.content?.header?.logo || ""} alt="Header Logo" isEdit={true} onChangeImage={(fileData) => handleImageUpload('header', 'logo', fileData)} wrapperStyle={{ height: '50px', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '5px' }} imgStyle={{ maxHeight: '100%', maxWidth: '200px', objectFit: 'contain' }} />
                    <p style={{ color: '#666', fontStyle: 'italic', fontSize: '12px', marginTop: '5px' }}>Click on the image area to upload a new logo.</p>
                  </div>

                  {/* Header & Menu Preview */}
                  <HeaderCherxy onMenuDataChange={handleMenuDataChange} isEdit={true} MenuData={layout.content.menu} socialLinks={layout?.content?.socialLinks} Link={(link) => <a>{link.children}</a>} />

                  {/* Menu Editor */}
                  <div style={{ marginBottom: "30px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>Menu</h3>
                    {/* ... (Menu map and add form, unchanged) ... */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {layout.content.menu.map((item, i) => (
                        <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                          <input type="text" value={item.text} onChange={(e) => handleUpdateMenu(i, "text", e.target.value)} placeholder="Menu Text" style={{ flex: "1 1 150px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
                          <input type="text" value={item.url} onChange={(e) => handleUpdateMenu(i, "url", e.target.value)} placeholder="Menu URL" style={{ flex: "2 1 200px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
                          <button onClick={() => handleMoveMenuUp(i)} disabled={i === 0} style={{ background: "darkcyan", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: i === 0 ? "not-allowed" : "pointer", opacity: i === 0 ? 0.5 : 1 }}> &#8593; Up </button>
                          <button onClick={() => handleMoveMenuDown(i)} disabled={i === layout.content.menu.length - 1} style={{ background: "darkcyan", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: i === layout.content.menu.length - 1 ? "not-allowed" : "pointer", opacity: i === layout.content.menu.length - 1 ? 0.5 : 1 }}> &#8595; Down </button>
                          <button onClick={() => handleDeleteMenu(i)} style={{ background: "red", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}> Delete </button>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: "15px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      <input type="text" placeholder="New Menu Text" value={newMenu.text} onChange={(e) => setNewMenu((prev) => ({ ...prev, text: e.target.value }))} style={{ flex: "1 1 150px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
                      <input type="text" placeholder="New Menu URL" value={newMenu.url} onChange={(e) => setNewMenu((prev) => ({ ...prev, url: e.target.value }))} style={{ flex: "2 1 200px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
                      <button onClick={handleAddMenu} style={{ background: "green", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}> Add Menu </button>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div style={{ marginBottom: "30px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>Footer</h3>
                    {/* ... (Footer content, unchanged) ... */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                      <div>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Footer Image:</label>
                        <ImageUploadable src={layout.content.footer?.image || ""} alt="Footer Image" isEdit={true} onChangeImage={(fileData) => handleImageUpload('footer', 'image', fileData)} wrapperStyle={{ height: '80px', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '5px' }} imgStyle={{ maxHeight: '100%', maxWidth: '300px', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Social Title:</label>
                        <input type="text" value={layout.content.footer?.socialTitle || ""} onChange={(e) => handleUpdateFooter("socialTitle", e.target.value)} style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Save Button (works for both modes) */}
              <div style={{ textAlign: "center" }}>
                <button onClick={saveLayout} style={{ background: "blue", color: "white", padding: "12px 20px", fontSize: "16px", border: "none", borderRadius: "6px", cursor: "pointer", }}>
                  Save Layout
                </button>
              </div>
            </>
          )}
    </div>
  );
}