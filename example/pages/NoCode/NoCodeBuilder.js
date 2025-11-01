import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Eye, Code, Save, Download, Upload, Copy, Settings, Layers, Undo, Redo } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { regenerateIds, generateFullHTML } from './utils';
import { PAGE_TEMPLATES } from './data';
import Block from './Block';
import PropertyEditor from './PropertyEditor';
import BlockTreeItem from './BlockTreeItem';
import {
    selectSiteData,
    selectSelectedBlock,
    selectMode,
    selectCodeView,
    selectShowTemplates,
    selectExpandedBlockIds,
    selectCanUndo,
    selectCanRedo,
    setSelectedBlock,
    updateBlock,
    addBlock,
    deleteBlock,
    duplicateBlock,
    moveBlock,
    setMode,
    setCodeView,
    setShowTemplates,
    toggleExpandBlock,
    expandAncestors,
    undo,
    redo,
    clearHistory,
} from './store';

const NoCodeBuilder = ({ onSave, activePageId, templateKey }) => {
    const dispatch = useDispatch();

    // Selectors
    const siteData = useSelector(selectSiteData);
    const selectedBlock = useSelector(selectSelectedBlock);
    const mode = useSelector(selectMode);
    const codeView = useSelector(selectCodeView);
    const showTemplates = useSelector(selectShowTemplates);
    const expandedBlockIds = useSelector(selectExpandedBlockIds);
    const canUndo = useSelector(selectCanUndo);
    const canRedo = useSelector(selectCanRedo);

    const pageConfig = useMemo(() => {
        return siteData.pages.find(p => p.id === activePageId)?.config;
    }, [siteData, activePageId]);

    const [copied, setCopied] = React.useState(false);

    useEffect(() => {
        dispatch(setSelectedBlock(null));
        dispatch(clearHistory());
    }, [activePageId, dispatch]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const activeElement = document.activeElement;
            const isTyping =
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.closest('.monaco-editor');

            if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey) {
                if (canUndo) {
                    event.preventDefault();
                    dispatch(undo());
                }
            }

            if (
                ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'z') ||
                ((event.metaKey || event.ctrlKey) && event.key === 'y')
            ) {
                if (canRedo) {
                    event.preventDefault();
                    dispatch(redo());
                }
            }

            if ((event.key === 'Delete' || event.key === 'Backspace') && !isTyping) {
                if (selectedBlock && selectedBlock.id !== 'page-root') {
                    event.preventDefault();
                    handleDeleteBlock(selectedBlock.id);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedBlock, canUndo, canRedo, dispatch]);

    const handleSelectBlockFromPreview = useCallback((block) => {
        dispatch(setSelectedBlock(block));
        if (block && block.id !== 'page-root') {
            dispatch(expandAncestors(block.id));
        }
    }, [dispatch]);

    const handleSelectBlockFromTree = (block) => {
        if (block.id === 'page-root') {
            dispatch(setSelectedBlock({ ...pageConfig, id: 'page-root', type: 'Page' }));
        } else {
            dispatch(setSelectedBlock(block));
        }
    };

    const handleToggleExpand = (blockId) => {
        dispatch(toggleExpandBlock(blockId));
    };

    const handleAddBlock = (template) => {
        const newBlock = regenerateIds(JSON.parse(JSON.stringify(template)));
        const parentId = selectedBlock && selectedBlock.id !== 'page-root' && selectedBlock.blocks !== undefined
            ? selectedBlock.id
            : null;

        dispatch(addBlock({ newBlock, parentId }));
    };

    const handleUpdateBlock = (updatedBlock) => {
        dispatch(updateBlock({ blockId: updatedBlock.id, updatedBlock }));
    };

    const handleUpdatePageConfigProperties = (newConfig) => {
        dispatch(updateBlock({ blockId: 'page-root', updatedBlock: newConfig }));
        dispatch(setSelectedBlock(newConfig));
    };

    const handleDeleteBlock = useCallback((blockId) => {
        dispatch(deleteBlock(blockId));
    }, [dispatch]);

    const handleDuplicateBlock = (blockToDuplicate) => {
        dispatch(duplicateBlock(blockToDuplicate.id));
    };

    const handleMoveBlock = (blockId, direction) => {
        dispatch(moveBlock({ blockId, direction }));
    };

    const exportJSON = () => {
        const json = JSON.stringify(pageConfig, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'page-config.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const importJSON = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedConfig = JSON.parse(e.target.result);
                    updateBlock('page-root', { ...importedConfig, id: 'page-root', type: 'Page' });
                } catch (err) {
                    alert('Invalid JSON file');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleCopyCode = () => {
        const codeToCopy = codeView === 'json'
            ? JSON.stringify(pageConfig, null, 2)
            : generateFullHTML(pageConfig);
        navigator.clipboard.writeText(codeToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const availableBlocks = React.useMemo(() => {
        const templateInfo = PAGE_TEMPLATES[templateKey];
        return templateInfo?.blockTemplates || {};
    }, [templateKey]);

    if (!pageConfig) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '18px', color: '#999' }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {/* Left Sidebar - Layers & Templates */}
            <div style={{ width: '280px', background: '#f8f9fa', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', background: 'white' }}>
                    <button
                        onClick={() => dispatch(setShowTemplates(false))}
                        style={{
                            flex: 1,
                            padding: '12px',
                            border: 'none',
                            background: !showTemplates ? '#667eea' : 'transparent',
                            color: !showTemplates ? 'white' : '#666',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '13px'
                        }}
                    >
                        <Layers size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        Layers
                    </button>
                    <button
                        onClick={() => dispatch(setShowTemplates(true))}
                        style={{
                            flex: 1,
                            padding: '12px',
                            border: 'none',
                            background: showTemplates ? '#667eea' : 'transparent',
                            color: showTemplates ? 'white' : '#666',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '13px'
                        }}
                    >
                        <Plus size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        Add
                    </button>
                </div>

                <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
                    {showTemplates ? (
                        <div>
                            <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#666', textTransform: 'uppercase' }}>
                                Available Blocks
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                {Object.entries(availableBlocks).map(([key, { name, icon, template }]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleAddBlock(template)}
                                        style={{
                                            padding: '16px 8px',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px',
                                            background: 'white',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            transition: 'all 0.2s',
                                            textAlign: 'center'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#f0f0f0';
                                            e.currentTarget.style.borderColor = '#667eea';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'white';
                                            e.currentTarget.style.borderColor = '#e0e0e0';
                                        }}
                                    >
                                        <div style={{ fontSize: '24px', marginBottom: '6px' }}>{icon}</div>
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#666', textTransform: 'uppercase' }}>
                                Page Structure
                            </h3>
                            <BlockTreeItem
                                key="page-root"
                                block={{ id: 'page-root', type: 'Page', blocks: pageConfig.blocks }}
                                onSelect={handleSelectBlockFromTree}
                                selectedId={selectedBlock?.id}
                                onDelete={handleDeleteBlock}
                                onDuplicate={handleDuplicateBlock}
                                onMoveUp={(id) => handleMoveBlock(id, 'up')}
                                onMoveDown={(id) => handleMoveBlock(id, 'down')}
                                expandedIds={expandedBlockIds}
                                onToggleExpand={handleToggleExpand}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
                {/* Top Toolbar */}
                <div style={{ height: '60px', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '12px', background: 'white' }}>
                    {/* Undo/Redo Buttons */}
                    <button
                        onClick={() => { dispatch(undo())}}
                        disabled={!canUndo}
                        title="Undo (Cmd/Ctrl+Z)"
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            background: 'white',
                            color: canUndo ? '#667eea' : '#ccc',
                            cursor: canUndo ? 'pointer' : 'not-allowed',
                            fontSize: '13px',
                            fontWeight: 500,
                            opacity: canUndo ? 1 : 0.5
                        }}
                    >
                        <Undo size={16} style={{ verticalAlign: 'middle' }} />
                    </button>
                    <button
                        onClick={() => { dispatch(redo())}}
                        disabled={!canRedo}
                        title="Redo (Cmd/Ctrl+Shift+Z)"
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            background: 'white',
                            color: canRedo ? '#667eea' : '#ccc',
                            cursor: canRedo ? 'pointer' : 'not-allowed',
                            fontSize: '13px',
                            fontWeight: 500,
                            opacity: canRedo ? 1 : 0.5
                        }}
                    >
                        <Redo size={16} style={{ verticalAlign: 'middle' }} />
                    </button>

                    <div style={{ width: '1px', height: '30px', background: '#e0e0e0' }} />

                    {/* Mode Buttons */}
                    <button
                        onClick={() => dispatch(setMode('edit'))}
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            background: mode === 'edit' ? '#667eea' : 'white',
                            color: mode === 'edit' ? 'white' : '#666',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 500
                        }}
                    >
                        <Settings size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        Edit
                    </button>
                    <button
                        onClick={() => dispatch(setMode('preview'))}
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            background: mode === 'preview' ? '#667eea' : 'white',
                            color: mode === 'preview' ? 'white' : '#666',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 500
                        }}
                    >
                        <Eye size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        Preview
                    </button>
                    <button
                        onClick={() => dispatch(setMode('code'))}
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            background: mode === 'code' ? '#667eea' : 'white',
                            color: mode === 'code' ? 'white' : '#666',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 500
                        }}
                    >
                        <Code size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        Code
                    </button>

                    <div style={{ width: '1px', height: '30px', background: '#e0e0e0' }} />

                    {/* Export/Import/Save Buttons */}
                    <button
                        onClick={exportJSON}
                        title="Export JSON"
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            background: 'white',
                            color: '#666',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 500
                        }}
                    >
                        <Download size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        Export
                    </button>
                    <label style={{ cursor: 'pointer' }}>
                        <input type="file" accept=".json" onChange={importJSON} style={{ display: 'none' }} />
                        <div style={{
                            padding: '8px 16px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            background: 'white',
                            color: '#666',
                            fontSize: '13px',
                            fontWeight: 500
                        }}>
                            <Upload size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                            Import
                        </div>
                    </label>
                    <button
                        onClick={onSave}
                        title="Save Site"
                        style={{
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '6px',
                            background: '#2ecc71',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 600
                        }}
                    >
                        <Save size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                        Save Site
                    </button>
                </div>

                {/* Canvas Area */}
                <div style={{ flex: 1, overflow: 'auto', background: '#f0f0f0', padding: '20px' }}>
                    {mode === 'code' ? (
                        <div style={{
                            background: '#1e1e1e',
                            color: '#d4d4d4',
                            borderRadius: '8px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            fontFamily: 'Monaco, monospace',
                            fontSize: '13px',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', borderBottom: '1px solid #444', flexShrink: 0 }}>
                                <button
                                    onClick={() => dispatch(setCodeView('json'))}
                                    style={{
                                        background: codeView === 'json' ? '#252526' : 'transparent',
                                        border: 'none',
                                        color: codeView === 'json' ? '#fff' : '#aaa',
                                        padding: '10px 16px',
                                        cursor: 'pointer',
                                        borderRight: '1px solid #444',
                                        fontSize: '13px'
                                    }}
                                >
                                    JSON
                                </button>
                                <button
                                    onClick={() => dispatch(setCodeView('html'))}
                                    style={{
                                        background: codeView === 'html' ? '#252526' : 'transparent',
                                        border: 'none',
                                        color: codeView === 'html' ? '#fff' : '#aaa',
                                        padding: '10px 16px',
                                        cursor: 'pointer',
                                        fontSize: '13px'
                                    }}
                                >
                                    HTML
                                </button>
                            </div>
                            <button
                                onClick={handleCopyCode}
                                style={{
                                    position: 'absolute',
                                    top: '52px',
                                    right: '20px',
                                    background: '#333',
                                    border: '1px solid #555',
                                    color: '#d4d4d4',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    zIndex: 10
                                }}
                            >
                                <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                {codeView === 'json' ? (
                                    <Editor
                                        height="100%"
                                        language="json"
                                        theme="vs-dark"
                                        value={JSON.stringify(pageConfig, null, 2)}
                                        options={{
                                            readOnly: true,
                                            minimap: { enabled: false },
                                            fontSize: 13,
                                            scrollBeyondLastLine: false,
                                            wordWrap: 'on',
                                            padding: { top: 16 }
                                        }}
                                    />
                                ) : (
                                    <Editor
                                        height="100%"
                                        language="html"
                                        theme="vs-dark"
                                        value={generateFullHTML(pageConfig)}
                                        options={{
                                            readOnly: true,
                                            minimap: { enabled: false },
                                            fontSize: 13,
                                            scrollBeyondLastLine: false,
                                            wordWrap: 'on',
                                            padding: { top: 16 }
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            background: 'white',
                            minHeight: '100%',
                            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                            margin: '0 auto',
                            maxWidth: mode === 'preview' ? '100%' : '1400px'
                        }}>
                            <Block
                                config={pageConfig}
                                context={{ state: {}, setState: () => { }, toggleState: () => { } }}
                                isPreview={mode === 'edit'}
                                onSelect={handleSelectBlockFromPreview}
                                selectedBlockId={selectedBlock?.id}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Right Sidebar - Property Editor */}
            {mode === 'edit' && (
                <div style={{ width: '320px', background: 'white', borderLeft: '1px solid #e0e0e0', overflow: 'auto' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0', background: '#f8f9fa' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
                            {selectedBlock ? (selectedBlock.id === 'page-root' ? 'Edit Page' : 'Edit Block') : 'Properties'}
                        </h2>
                    </div>
                    <PropertyEditor
                        block={selectedBlock}
                        onChange={selectedBlock?.id === 'page-root' ? handleUpdatePageConfigProperties : handleUpdateBlock}
                    />
                </div>
            )}
        </div>
    );
};

export default NoCodeBuilder;