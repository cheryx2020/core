import React, { useEffect, useState, useCallback } from "react";
import { APIService } from "@cheryx2020/api-service";

/**
 * A component for editing a website's theme.
 * The theme is a single string (often CSS or a JSON object of styles)
 * associated with a domain.
 *
 * @param {{ domain: string }} props
 * @param {string} props.domain The domain for which to edit the theme (e.g., 'cheryx.com').
 */
export default function ThemeEditor({ domain }) {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches the theme data for the given domain.
   * If a theme is not found (404), it initializes an empty theme object
   * so the user can create one.
   */
  const fetchTheme = useCallback(async () => {
    if (!domain) {
      setTheme(null);
      return;
    }
    setLoading(true);
    try {
      const res = await APIService.get(`theme?domain=${domain}`);
      if (res.data.success) {
        setTheme(res.data.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("No theme found, initializing a new one.");
        setTheme({ domain, data: "" });
      } else {
        console.error("Error fetching theme:", err);
        setTheme(null);
      }
    } finally {
      setLoading(false);
    }
  }, [domain]);

  useEffect(() => {
    fetchTheme();
  }, [fetchTheme]);

  /**
   * Saves the current theme data to the server using a PUT request.
   * The backend controller will create a new theme if one doesn't exist (upsert).
   */
  const saveTheme = async () => {
    if (!theme) {
      alert("No theme data to save.");
      return;
    }
    try {
      const payload = {
        domain: theme.domain,
        data: theme.data,
      };
      const response = await APIService.put(`theme`, payload);
      if (response.data.success) {
        alert("Theme saved successfully!");
        // Optionally update state with the response from the server
        setTheme(response.data.data);
      } else {
        alert("Failed to save theme: " + response.data.error);
      }
    } catch (err) {
      console.error("Error saving theme:", err);
      alert("An error occurred while saving the theme.");
    }
  };

  /**
   * Updates the theme data string in the local state.
   */
  const handleThemeDataChange = (e) => {
    setTheme((prev) => ({ ...prev, data: e.target.value }));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
          Theme Editor: <span style={{fontWeight: 400}}>{domain}</span>
        </h2>
        <button
          onClick={fetchTheme}
          style={{
            background: "gray",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          disabled={!domain}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Loading Theme...</div>
      ) : !theme ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Please provide a valid domain to edit the theme.
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <label 
              htmlFor="theme-data" 
              style={{ display: "block", marginBottom: "10px", fontWeight: "600", fontSize: '18px' }}
            >
              Theme Content (CSS or JSON)
            </label>
            <textarea
              id="theme-data"
              value={theme.data || ""}
              onChange={handleThemeDataChange}
              placeholder="Enter your theme CSS or configuration JSON here..."
              style={{
                width: "100%",
                minHeight: "400px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                fontFamily: "monospace",
                lineHeight: "1.5",
                boxSizing: "border-box" // Ensures padding doesn't affect width
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={saveTheme}
              style={{
                background: "blue",
                color: "white",
                padding: "12px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save Theme
            </button>
          </div>
        </>
      )}
    </div>
  );
}