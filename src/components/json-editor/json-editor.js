import React, { useState } from "react";

function JsonEditor({ data, onChange }) {
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
            setError(`Invalid JSON: ${err.message}`);
        }
    };

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(text);
            const formatted = JSON.stringify(parsed, null, 2);
            setText(formatted);
            setError(null);
            onChange(parsed);
        } catch (err) {
            setError(`Cannot format: Invalid JSON - ${err.message}`);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}>
            <textarea
                value={text}
                onChange={handleChange}
                onBlur={handleFormat}
                style={{
                    width: '100%',
                    minHeight: '200px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    padding: '10px',
                    borderRadius: '0 0 6px 6px',
                    border: error ? '2px solid #ef4444' : '2px solid #d1d5db',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    resize: 'vertical'
                }}
            />
            {error && (
                <div style={{
                    color: '#ef4444',
                    fontSize: '14px',
                    marginTop: '4px'
                }}>
                    {error}
                </div>
            )}
        </div>
    );
}

export default JsonEditor;