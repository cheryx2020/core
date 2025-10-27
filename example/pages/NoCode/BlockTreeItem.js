import React from "react";
import { Trash2, Copy, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';


const BlockTreeItem = ({ block, level = 0, onSelect, selectedId, onDelete, onDuplicate, onMoveUp, onMoveDown, index, totalItems, expandedIds, onToggleExpand }) => {
  const expanded = expandedIds.has(block.id);
  const hasChildren = block.blocks && block.blocks.length > 0;
  const isRoot = block.id === 'page-root';

  return (
    <div style={{ marginLeft: level * 16 }}>
      <div
        onClick={() => onSelect(block)}
        style={{ padding: '8px 12px', cursor: 'pointer', background: selectedId === block.id ? '#e8eeff' : 'transparent', borderRadius: '6px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', transition: 'background 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.background = selectedId === block.id ? '#e8eeff' : '#f5f5f5'}
        onMouseLeave={(e) => e.currentTarget.style.background = selectedId === block.id ? '#e8eeff' : 'transparent'}
      >
        {hasChildren ? <span onClick={(e) => { e.stopPropagation(); onToggleExpand(block.id); }} style={{ cursor: 'pointer' }}>{expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span> : <span style={{ width: 16 }} />}
        <span style={{ flex: 1, fontWeight: selectedId === block.id ? 600 : 400 }}>{block.type} {block.className && !isRoot ? `(.${block.className})` : ''}</span>
        {!isRoot && (
          <>
            <button onClick={(e) => { e.stopPropagation(); onDuplicate(block); }} style={{ padding: '4px', border: 'none', background: 'none', cursor: 'pointer' }} title="Duplicate"><Copy size={14} /></button>
            <button onClick={(e) => { e.stopPropagation(); onMoveUp(block.id); }} style={{ padding: '4px', border: 'none', background: 'none', cursor: index === 0 ? 'not-allowed' : 'pointer', color: index === 0 ? '#ccc' : 'inherit' }} title="Move Up" disabled={index === 0}><ChevronUp size={14} /></button>
            <button onClick={(e) => { e.stopPropagation(); onMoveDown(block.id); }} style={{ padding: '4px', border: 'none', background: 'none', cursor: index === totalItems - 1 ? 'not-allowed' : 'pointer', color: index === totalItems - 1 ? '#ccc' : 'inherit' }} title="Move Down" disabled={index === totalItems - 1}><ChevronDown size={14} /></button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(block.id); }} style={{ padding: '4px', border: 'none', background: 'none', cursor: 'pointer', color: '#e74c3c' }} title="Delete"><Trash2 size={14} /></button>
          </>
        )}
      </div>
      {expanded && hasChildren && block.blocks.map((child, idx) => (
        <BlockTreeItem key={child.id} block={child} level={level + 1} onSelect={onSelect} selectedId={selectedId} onDelete={onDelete} onDuplicate={onDuplicate} onMoveUp={onMoveUp} onMoveDown={onMoveDown} index={idx} totalItems={block.blocks.length} expandedIds={expandedIds} onToggleExpand={onToggleExpand} />
      ))}
    </div>
  );
};

export default BlockTreeItem;