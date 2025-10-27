import React from "react";
import Editor from '@monaco-editor/react';

const PropertyEditor = ({ block, onChange }) => {
    if (!block) return <div style={{ padding: '20px', color: '#999' }}>Select an item to edit</div>;

    const isPageRoot = block.id === 'page-root';

    const updateProperty = (path, value) => {
        const newBlock = JSON.parse(JSON.stringify(block));
        const keys = path.split('.');
        let current = newBlock;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;

        if (onChange) {
            onChange(newBlock);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: 600 }}>{isPageRoot ? 'Page Properties' : 'Block Properties'}</h3>
            {!isPageRoot && (
                <>
                    <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>Type</label><input type="text" value={block.type || 'div'} onChange={(e) => updateProperty('type', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }} /></div>
                    <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>Content</label><textarea value={block.content || ''} onChange={(e) => updateProperty('content', e.target.value)} rows={3} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', fontFamily: 'inherit' }} /></div>
                </>
            )}
            <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>{isPageRoot ? 'Body Class Name' : 'Class Name'}</label><input type="text" value={block.className || ''} onChange={(e) => updateProperty('className', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }} /></div>
            {!isPageRoot && (
                <>
                    <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>ID</label><input type="text" value={block.id || ''} onChange={(e) => updateProperty('id', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }} /></div>
                    <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>On Click Action</label><input type="text" value={block.onClickAction || ''} onChange={(e) => updateProperty('onClickAction', e.target.value)} placeholder="e.g., alert:Hello or scroll-to:section" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }} /></div>
                </>
            )}
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>{isPageRoot ? 'Body Inline Styles (JSON)' : 'Inline Styles (JSON)'}</label>
                <Editor height="150px" language="json" theme="vs-dark" value={JSON.stringify(block.style || {}, null, 2) || ''} onChange={(value) => { try { if (!value || value.trim() === '') { updateProperty('style', {}); return; } const parsedStyle = JSON.parse(value); updateProperty('style', parsedStyle); } catch (error) { /* Invalid JSON */ } }} options={{ minimap: { enabled: false }, fontSize: 12, scrollBeyondLastLine: false, wordWrap: 'on' }} />
            </div>
            {isPageRoot && (
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>Global CSS (Style Tag)</label>
                    <Editor height="150px" language="css" theme="vs-dark" value={block.styleTagContent || ''} onChange={(value) => updateProperty('styleTagContent', value)} options={{ minimap: { enabled: false }, fontSize: 12, scrollBeyondLastLine: false, wordWrap: 'on' }} />
                </div>
            )}
            {!isPageRoot && (
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>CSS (Style Tag)</label>
                    <Editor height="150px" language="css" theme="vs-dark" value={block.styleTagContent || ''} onChange={(value) => updateProperty('styleTagContent', value)} options={{ minimap: { enabled: false }, fontSize: 12, scrollBeyondLastLine: false, wordWrap: 'on' }} />
                </div>
            )}
        </div>
    );
};

export default PropertyEditor;