import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Eye, Code, Save, Download, Upload, Copy, Settings, Layers } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { regenerateIds, generateFullHTML } from './utils';
import { PAGE_TEMPLATES } from './data';
import Block from './Block';
import PropertyEditor from './PropertyEditor';
import BlockTreeItem from './BlockTreeItem';

const NoCodeBuilder = ({ initialPageConfig, onConfigChange, onSave, activePageId, templateKey }) => {
  const [pageConfig, setPageConfig] = useState(initialPageConfig);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [mode, setMode] = useState('edit');
  const [codeView, setCodeView] = useState('json');
  const [showTemplates, setShowTemplates] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedBlockIds, setExpandedBlockIds] = useState(new Set(['page-root']));

  useEffect(() => {
    setPageConfig(initialPageConfig);
    setSelectedBlock(null);
    setExpandedBlockIds(new Set(['page-root']));
  }, [activePageId]);

  const handleConfigChange = useCallback((newConfig) => {
    setPageConfig(newConfig);
    if (onConfigChange) {
      onConfigChange(newConfig);
    }
  }, [onConfigChange]);

  const findAncestors = (blockId, config) => {
    const path = [];
    const search = (blocks, currentPath) => {
      for (const block of blocks) {
        if (block.id === blockId) { path.push(...currentPath); return true; }
        if (block.blocks && search(block.blocks, [...currentPath, block.id])) { return true; }
      }
      return false;
    };
    search(config.blocks, []);
    return path;
  };

  const handleSelectBlockFromPreview = useCallback((block) => {
    setSelectedBlock(block);
    if (block && block.id !== 'page-root') {
      const ancestors = findAncestors(block.id, pageConfig);
      setExpandedBlockIds(prev => new Set([...prev, 'page-root', ...ancestors, block.id]));
    }
  }, [pageConfig]);

  const handleSelectBlockFromTree = (block) => {
    if (block.id === 'page-root') {
      setSelectedBlock({ ...pageConfig, id: 'page-root', type: 'Page' });
    } else {
      setSelectedBlock(block);
    }
  };

  const handleToggleExpand = (blockId) => {
    setExpandedBlockIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(blockId)) { newSet.delete(blockId); } else { newSet.add(blockId); }
      return newSet;
    });
  };

  const findAndUpdateBlock = (blocks, blockId, updatedBlock) => {
    return blocks.map(block => {
      if (block.id === blockId) return updatedBlock;
      if (block.blocks) { return { ...block, blocks: findAndUpdateBlock(block.blocks, blockId, updatedBlock) }; }
      return block;
    });
  };

  const findAndDeleteBlock = (blocks, blockId) => {
    return blocks.filter(block => {
      if (block.id === blockId) return false;
      if (block.blocks) { block.blocks = findAndDeleteBlock(block.blocks, blockId); }
      return true;
    });
  };

  const moveBlock = (blockId, direction) => {
    const newPageConfig = JSON.parse(JSON.stringify(pageConfig));
    const traverseAndMove = (blocks) => {
      const index = blocks.findIndex(b => b.id === blockId);
      if (index !== -1) {
        if (direction === 'up' && index > 0) { [blocks[index - 1], blocks[index]] = [blocks[index], blocks[index - 1]]; return true; }
        if (direction === 'down' && index < blocks.length - 1) { [blocks[index + 1], blocks[index]] = [blocks[index], blocks[index + 1]]; return true; }
        return false;
      }
      for (const block of blocks) { if (block.blocks && traverseAndMove(block.blocks)) { return true; } }
      return false;
    };
    if (traverseAndMove(newPageConfig.blocks)) { handleConfigChange(newPageConfig); }
  };

  const addBlock = (template) => {
    const newBlock = regenerateIds(JSON.parse(JSON.stringify(template)));
    let newPageConfig;
    if (selectedBlock && selectedBlock.id !== 'page-root' && selectedBlock.blocks !== undefined) {
      const updated = findAndUpdateBlock(pageConfig.blocks, selectedBlock.id, { ...selectedBlock, blocks: [...(selectedBlock.blocks || []), newBlock] });
      newPageConfig = { ...pageConfig, blocks: updated };
    } else {
      newPageConfig = { ...pageConfig, blocks: [...pageConfig.blocks, newBlock] };
    }
    handleConfigChange(newPageConfig);
  };

  const updateBlock = (updatedBlock) => {
    const updated = findAndUpdateBlock(pageConfig.blocks, updatedBlock.id, updatedBlock);
    handleConfigChange({ ...pageConfig, blocks: updated });
    setSelectedBlock(updatedBlock);
  };

  const updatePageConfigProperties = (newConfig) => {
    const { id, type, ...configData } = newConfig;
    handleConfigChange(configData);
    setSelectedBlock(newConfig);
  };

  const deleteBlock = useCallback((blockId) => {
    const updated = findAndDeleteBlock(pageConfig.blocks, blockId);
    handleConfigChange({ ...pageConfig, blocks: updated });
    if (selectedBlock?.id === blockId) setSelectedBlock(null);
  }, [pageConfig, selectedBlock, handleConfigChange]);

  const duplicateBlock = (blockToDuplicate) => {
    const newPageConfig = JSON.parse(JSON.stringify(pageConfig));
    const traverseAndDuplicate = (blocks) => {
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        if (block.id === blockToDuplicate.id) {
          blocks.splice(i + 1, 0, regenerateIds(JSON.parse(JSON.stringify(block))));
          return true;
        }
        if (block.blocks && traverseAndDuplicate(block.blocks)) { return true; }
      }
      return false;
    };
    if (traverseAndDuplicate(newPageConfig.blocks)) { handleConfigChange(newPageConfig); }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        if (selectedBlock && selectedBlock.id !== 'page-root') {
          const activeElement = document.activeElement;
          const isTyping =
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.closest('.monaco-editor');

          if (!isTyping) {
            event.preventDefault();
            deleteBlock(selectedBlock.id);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBlock, deleteBlock]);

  const exportJSON = () => {
    const json = JSON.stringify(pageConfig, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-config.json';
    a.click();
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => { try { handleConfigChange(JSON.parse(e.target.result)); } catch (err) { alert('Invalid JSON file'); } };
      reader.readAsText(file);
    }
  };

  const handleCopyCode = () => {
    const codeToCopy = codeView === 'json' ? JSON.stringify(pageConfig, null, 2) : generateFullHTML(pageConfig);
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const availableBlocks = React.useMemo(() => {
    const templateInfo = PAGE_TEMPLATES[templateKey];
    return templateInfo?.blockTemplates || {};
  }, [templateKey]);

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ width: '280px', background: '#f8f9fa', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', background: 'white' }}>
          <button onClick={() => setShowTemplates(false)} style={{ flex: 1, padding: '12px', border: 'none', background: !showTemplates ? '#667eea' : 'transparent', color: !showTemplates ? 'white' : '#666', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}><Layers size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Layers</button>
          <button onClick={() => setShowTemplates(true)} style={{ flex: 1, padding: '12px', border: 'none', background: showTemplates ? '#667eea' : 'transparent', color: showTemplates ? 'white' : '#666', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}><Plus size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Add</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
          {showTemplates ? (
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#666', textTransform: 'uppercase' }}>Available Blocks</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {Object.entries(availableBlocks).map(([key, { name, icon, template }]) => (
                  <button key={key} onClick={() => addBlock(template)} style={{ padding: '16px 8px', border: '1px solid #e0e0e0', borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: 500, transition: 'all 0.2s', textAlign: 'center' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.borderColor = '#667eea'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e0e0e0'; }}><div style={{ fontSize: '24px', marginBottom: '6px' }}>{icon}</div> {name}</button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#666', textTransform: 'uppercase' }}>Page Structure</h3>
              <BlockTreeItem key="page-root" block={{ id: 'page-root', type: 'Page', blocks: pageConfig.blocks }} onSelect={handleSelectBlockFromTree} selectedId={selectedBlock?.id} onDelete={deleteBlock} onDuplicate={duplicateBlock} onMoveUp={(id) => moveBlock(id, 'up')} onMoveDown={(id) => moveBlock(id, 'down')} expandedIds={expandedBlockIds} onToggleExpand={handleToggleExpand} />
            </div>
          )}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <div style={{ height: '60px', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '12px', background: 'white' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 600, marginRight: 'auto' }}>🎨 Page Builder</h1>
          <button onClick={() => setMode('edit')} style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', background: mode === 'edit' ? '#667eea' : 'white', color: mode === 'edit' ? 'white' : '#666', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}><Settings size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Edit</button>
          <button onClick={() => setMode('preview')} style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', background: mode === 'preview' ? '#667eea' : 'white', color: mode === 'preview' ? 'white' : '#666', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}><Eye size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Preview</button>
          <button onClick={() => setMode('code')} style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', background: mode === 'code' ? '#667eea' : 'white', color: mode === 'code' ? 'white' : '#666', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}><Code size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Code</button>
          <div style={{ width: '1px', height: '30px', background: '#e0e0e0' }} />
          <button onClick={exportJSON} title="Export JSON" style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', background: 'white', color: '#666', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}><Download size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Export</button>
          <label style={{ cursor: 'pointer' }}><input type="file" accept=".json" onChange={importJSON} style={{ display: 'none' }} /><div style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: '6px', background: 'white', color: '#666', fontSize: '13px', fontWeight: 500 }}><Upload size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Import</div></label>
          <button onClick={onSave} title="Save Site" style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', background: '#2ecc71', color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}><Save size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Save Site</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', background: '#f0f0f0', padding: '20px' }}>
          {mode === 'code' ? (
            <div style={{ background: '#1e1e1e', color: '#d4d4d4', borderRadius: '8px', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Monaco, monospace', fontSize: '13px', position: 'relative' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid #444', flexShrink: 0 }}>
                <button onClick={() => setCodeView('json')} style={{ background: codeView === 'json' ? '#252526' : 'transparent', border: 'none', color: codeView === 'json' ? '#fff' : '#aaa', padding: '10px 16px', cursor: 'pointer', borderRight: '1px solid #444', fontSize: '13px' }}>JSON</button>
                <button onClick={() => setCodeView('html')} style={{ background: codeView === 'html' ? '#252526' : 'transparent', border: 'none', color: codeView === 'html' ? '#fff' : '#aaa', padding: '10px 16px', cursor: 'pointer', fontSize: '13px' }}>HTML</button>
              </div>
              <button onClick={handleCopyCode} style={{ position: 'absolute', top: '52px', right: '20px', background: '#333', border: '1px solid #555', color: '#d4d4d4', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 }}><Copy size={14} /> {copied ? 'Copied!' : 'Copy'}</button>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                {codeView === 'json' ? <Editor height="100%" language="json" theme="vs-dark" value={JSON.stringify(pageConfig, null, 2)} options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false, wordWrap: 'on', padding: { top: 16 } }} /> : <Editor height="100%" language="html" theme="vs-dark" value={generateFullHTML(pageConfig)} options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false, wordWrap: 'on', padding: { top: 16 } }} />}
              </div>
            </div>
          ) : (
            <div style={{ background: 'white', minHeight: '100%', boxShadow: '0 0 20px rgba(0,0,0,0.1)', margin: '0 auto', maxWidth: mode === 'preview' ? '100%' : '1400px' }}>
              <Block config={pageConfig} context={{ state: {}, setState: () => { }, toggleState: () => { } }} isPreview={mode === 'edit'} onSelect={handleSelectBlockFromPreview} selectedBlockId={selectedBlock?.id}/>
            </div>
          )}
        </div>
      </div>
      {mode === 'edit' && (
        <div style={{ width: '320px', background: 'white', borderLeft: '1px solid #e0e0e0', overflow: 'auto' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0', background: '#f8f9fa' }}><h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{selectedBlock ? (selectedBlock.id === 'page-root' ? 'Edit Page' : 'Edit Block') : 'Properties'}</h2></div>
          <PropertyEditor block={selectedBlock} onChange={selectedBlock?.id === 'page-root' ? updatePageConfigProperties : updateBlock} />
        </div>
      )}
    </div>
  );
};

export default NoCodeBuilder;