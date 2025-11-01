import { configureStore, createSlice } from '@reduxjs/toolkit';
// ------------------------
// 🔧 Helper Functions
// ------------------------
const findAndUpdateBlock = (blocks, blockId, updatedBlock) => {
    return blocks.map(block => {
        if (block.id === blockId) return updatedBlock;
        if (block.blocks) {
            return { ...block, blocks: findAndUpdateBlock(block.blocks, blockId, updatedBlock) };
        }
        return block;
    });
};
const findAndDeleteBlock = (blocks, blockId) => {
    return blocks.filter(block => {
        if (block.id === blockId) return false;
        if (block.blocks) block.blocks = findAndDeleteBlock(block.blocks, blockId);
        return true;
    });
};
const findAndAddBlock = (blocks, parentId, newBlock, position = 'child') => {
    if (position === 'root' || !blocks) return [...(blocks || []), newBlock];
    return blocks.map(block => {
        if (block.id === parentId) {
            if (position === 'child') {
                return { ...block, blocks: [...(block.blocks || []), newBlock] };
            }
        }
        if (block.blocks) {
            return { ...block, blocks: findAndAddBlock(block.blocks, parentId, newBlock, position) };
        }
        return block;
    });
};
const findBlockById = (blocks, blockId) => {
    for (const block of blocks) {
        if (block.id === blockId) return block;
        if (block.blocks) {
            const found = findBlockById(block.blocks, blockId);
            if (found) return found;
        }
    }
    return null;
};
const moveBlockInArray = (blocks, blockId, direction) => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index === -1) return { blocks, moved: false };
    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
        [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
        return { blocks: newBlocks, moved: true };
    }
    if (direction === 'down' && index < blocks.length - 1) {
        [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
        return { blocks: newBlocks, moved: true };
    }
    return { blocks, moved: false };
};
const traverseAndMove = (blocks, blockId, direction) => {
    const result = moveBlockInArray(blocks, blockId, direction);
    if (result.moved) return result.blocks;
    return blocks.map(block =>
        block.blocks ? { ...block, blocks: traverseAndMove(block.blocks, blockId, direction) } : block
    );
};

const initialState = {
    // Builder State
    selectedBlock: null,
    mode: 'edit',
    codeView: 'json',
    showTemplates: false,
    expandedBlockIds: ['page-root'],

    // Site State
    siteData: { pages: [] },
    activePageId: null,
    isLoading: false,

    // History State
    past: [],
    future: [],
};

// Builder Slice
const builderSlice = createSlice({
    name: 'builder',
    initialState,
    reducers: {
        // UI Actions (no history)
        setSelectedBlock: (state, action) => {
            state.selectedBlock = action.payload;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setCodeView: (state, action) => {
            state.codeView = action.payload;
        },
        setShowTemplates: (state, action) => {
            state.showTemplates = action.payload;
        },
        toggleExpandBlock: (state, action) => {
            const blockId = action.payload;
            const index = state.expandedBlockIds.indexOf(blockId);
            if (index > -1) {
                state.expandedBlockIds.splice(index, 1);
            } else {
                state.expandedBlockIds.push(blockId);
            }
        },
        setExpandedBlockIds: (state, action) => {
            state.expandedBlockIds = action.payload;
        },
        expandAncestors: (state, action) => {
            const blockId = action.payload;
            const activePage = state.siteData.pages.find(p => p.id === state.activePageId);
            if (!activePage) return;
            const findAncestors = (blocks, targetId, path = []) => {
                for (const block of blocks) {
                    if (block.id === targetId) return path;
                    if (block.blocks) {
                        const result = findAncestors(block.blocks, targetId, [...path, block.id]);
                        if (result) return result;
                    }
                }
                return null;
            };

            const ancestors = findAncestors(activePage.config.blocks, blockId);
            if (ancestors) {
                const newSet = new Set([...state.expandedBlockIds, ...ancestors, blockId]);
                state.expandedBlockIds = Array.from(newSet);
            }
        },

        // Site Actions (no history)
        setSiteData: (state, action) => {
            state.siteData = { ...state.siteData, ...action.payload };
        },
        setActivePageId: (state, action) => {
            state.activePageId = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        // Block Actions (with history)
        updateBlock: (state, action) => {
            const { blockId, updatedBlock } = action.payload;
            if (!state.activePageId) return;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            state.siteData.pages = state.siteData.pages.map(p => {
                if (p.id !== state.activePageId) return p;

                if (blockId === 'page-root') {
                    const { id, type, ...configData } = updatedBlock;
                    return { ...p, config: configData };
                }

                const newConfig = {
                    ...p.config,
                    blocks: findAndUpdateBlock(p.config.blocks, blockId, updatedBlock)
                };
                return { ...p, config: newConfig };
            });
            state.selectedBlock = updatedBlock;
        },

        addBlock: (state, action) => {
            const { newBlock, parentId = null } = action.payload;
            if (!state.activePageId) return;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            const position = parentId && parentId !== 'page-root' ? 'child' : 'root';
            state.siteData.pages = state.siteData.pages.map(p => {
                if (p.id !== state.activePageId) return p;
                const newConfig = {
                    ...p.config,
                    blocks: findAndAddBlock(p.config.blocks, parentId, newBlock, position)
                };
                return { ...p, config: newConfig };
            });
        },

        deleteBlock: (state, action) => {
            const blockId = action.payload;
            if (!state.activePageId) return;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            state.siteData.pages = state.siteData.pages.map(p => {
                if (p.id !== state.activePageId) return p;
                const newConfig = {
                    ...p.config,
                    blocks: findAndDeleteBlock(p.config.blocks, blockId)
                };
                return { ...p, config: newConfig };
            });

            if (state.selectedBlock?.id === blockId) {
                state.selectedBlock = null;
            }
        },

        duplicateBlock: (state, action) => {
            const blockId = action.payload;
            const activePage = state.siteData.pages.find(p => p.id === state.activePageId);
            if (!activePage) return;

            const blockToDuplicate = findBlockById(activePage.config.blocks, blockId);
            if (!blockToDuplicate) return;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            const { regenerateIds } = require('./utils');
            const duplicatedBlock = regenerateIds(JSON.parse(JSON.stringify(blockToDuplicate)));

            const insertAfter = (blocks) => {
                for (let i = 0; i < blocks.length; i++) {
                    if (blocks[i].id === blockId) {
                        const newBlocks = [...blocks];
                        newBlocks.splice(i + 1, 0, duplicatedBlock);
                        return newBlocks;
                    }
                    if (blocks[i].blocks) {
                        const result = insertAfter(blocks[i].blocks);
                        if (result !== blocks[i].blocks) {
                            return blocks.map((b, idx) => idx === i ? { ...b, blocks: result } : b);
                        }
                    }
                }
                return blocks;
            };

            state.siteData.pages = state.siteData.pages.map(p => {
                if (p.id !== state.activePageId) return p;
                const newConfig = {
                    ...p.config,
                    blocks: insertAfter(p.config.blocks)
                };
                return { ...p, config: newConfig };
            });
        },

        moveBlock: (state, action) => {
            const { blockId, direction } = action.payload;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            state.siteData.pages = state.siteData.pages.map(p => {
                if (p.id !== state.activePageId) return p;
                const newConfig = {
                    ...p.config,
                    blocks: traverseAndMove(p.config.blocks, blockId, direction)
                };
                return { ...p, config: newConfig };
            });
        },

        // Page Management (with history)
        addPage: (state, action) => {
            const newPage = action.payload;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            state.siteData.pages.push(newPage);
            state.activePageId = newPage.id;
        },

        deletePage: (state, action) => {
            const pageId = action.payload;
            const pages = state.siteData.pages;
            const pageIndex = pages.findIndex(p => p.id === pageId);
            if (pageIndex === -1 || pages.length <= 1) return;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            state.siteData.pages = pages.filter(p => p.id !== pageId);

            if (state.activePageId === pageId) {
                const newPages = state.siteData.pages;
                state.activePageId = newPages[Math.max(0, pageIndex - 1)]?.id || null;
            }
        },

        updatePageMetadata: (state, action) => {
            const { pageId, metadata } = action.payload;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            state.siteData.pages = state.siteData.pages.map(p =>
                p.id === pageId ? { ...p, ...metadata } : p
            );
        },

        duplicatePage: (state, action) => {
            const pageId = action.payload;
            const pageToDuplicate = state.siteData.pages.find(p => p.id === pageId);
            if (!pageToDuplicate) return;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            const { regenerateIds, generateId } = require('./utils');
            const duplicatedConfig = regenerateIds(JSON.parse(JSON.stringify(pageToDuplicate.config)));

            const duplicatedPage = {
                ...pageToDuplicate,
                id: generateId('page'),
                name: `${pageToDuplicate.name} (Copy)`,
                slug: `${pageToDuplicate.slug}-copy`,
                isHomepage: false,
                config: duplicatedConfig
            };

            const pageIndex = state.siteData.pages.findIndex(p => p.id === pageId);
            state.siteData.pages.splice(pageIndex + 1, 0, duplicatedPage);
            state.activePageId = duplicatedPage.id;
        },

        reorderPages: (state, action) => {
            const { fromIndex, toIndex } = action.payload;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            const [moved] = state.siteData.pages.splice(fromIndex, 1);
            state.siteData.pages.splice(toIndex, 0, moved);
        },

        setHomepage: (state, action) => {
            const pageId = action.payload;

            // Save to history
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });
            state.future = [];
            if (state.past.length > 50) state.past.shift();

            state.siteData.pages = state.siteData.pages.map(p =>
                ({ ...p, isHomepage: p.id === pageId })
            );
        },

        // History Actions
        undo: (state) => {
            if (state.past.length === 0) return;

            const previous = state.past.pop();
            state.future.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });

            state.siteData = previous.siteData;
            state.activePageId = previous.activePageId;
        },

        redo: (state) => {
            if (state.future.length === 0) return;

            const next = state.future.pop();
            state.past.push({
                siteData: JSON.parse(JSON.stringify(state.siteData)),
                activePageId: state.activePageId
            });

            state.siteData = next.siteData;
            state.activePageId = next.activePageId;
        },

        clearHistory: (state) => {
            state.past = [];
            state.future = [];
        },

        reset: (state) => {
            return initialState;
        },
    },
});

export const {
    setSelectedBlock,
    setMode,
    setCodeView,
    setShowTemplates,
    toggleExpandBlock,
    setExpandedBlockIds,
    expandAncestors,
    setSiteData,
    setActivePageId,
    setIsLoading,
    updateBlock,
    addBlock,
    deleteBlock,
    duplicateBlock,
    moveBlock,
    addPage,
    deletePage,
    updatePageMetadata,
    duplicatePage,
    reorderPages,
    setHomepage,
    undo,
    redo,
    clearHistory,
    reset,
} = builderSlice.actions;
// Selectors
export const selectSiteData = (state) => state.builder.siteData;
export const selectActivePageId = (state) => state.builder.activePageId;
export const selectSelectedBlock = (state) => state.builder.selectedBlock;
export const selectMode = (state) => state.builder.mode;
export const selectCodeView = (state) => state.builder.codeView;
export const selectShowTemplates = (state) => state.builder.showTemplates;
export const selectExpandedBlockIds = (state) => state.builder.expandedBlockIds;
export const selectIsLoading = (state) => state.builder.isLoading;
export const selectCanUndo = (state) => state.builder.past.length > 0;
export const selectCanRedo = (state) => state.builder.future.length > 0;
export const selectActivePage = (state) => {
    const { siteData, activePageId } = state.builder;
    return siteData.pages.find(p => p.id === activePageId) || null;
};
// Store
const store = configureStore({
    reducer: {
        builder: builderSlice.reducer,
    },
});
export default store;