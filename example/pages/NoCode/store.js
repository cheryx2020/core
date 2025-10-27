import { create } from 'zustand';
import { temporal } from 'zundo';
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
// ------------------------
// 🧠 Unified Builder + Site Store
// ------------------------
const useBuilderStore = create(
    temporal(
        (set, get) => ({
            // --------------------------------
            // 📄 Page Builder State
            // --------------------------------
            selectedBlock: null,
            mode: 'edit',
            codeView: 'json',
            showTemplates: false,
            expandedBlockIds: new Set(['page-root']),
            updateBlock: (blockId, updatedBlock) => set((state) => {
                if (!state.activePageId) return state;

                const newPages = state.siteData.pages.map(p => {
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

                return {
                    siteData: { ...state.siteData, pages: newPages },
                    selectedBlock: updatedBlock
                };
            }),

            addBlock: (newBlock, parentId = null) => set((state) => {
                if (!state.activePageId) return state;
                const position = parentId && parentId !== 'page-root' ? 'child' : 'root';

                const newPages = state.siteData.pages.map(p => {
                    if (p.id !== state.activePageId) return p;
                    const newConfig = {
                        ...p.config,
                        blocks: findAndAddBlock(p.config.blocks, parentId, newBlock, position)
                    };
                    return { ...p, config: newConfig };
                });

                return { siteData: { ...state.siteData, pages: newPages } };
            }),

            deleteBlock: (blockId) => set((state) => {
                if (!state.activePageId) return state;

                const newPages = state.siteData.pages.map(p => {
                    if (p.id !== state.activePageId) return p;
                    const newConfig = {
                        ...p.config,
                        blocks: findAndDeleteBlock(p.config.blocks, blockId)
                    };
                    return { ...p, config: newConfig };
                });

                return {
                    siteData: { ...state.siteData, pages: newPages },
                    selectedBlock: state.selectedBlock?.id === blockId ? null : state.selectedBlock
                };
            }),

            duplicateBlock: (blockId) => set((state) => {
                const activePage = state.siteData.pages.find(p => p.id === state.activePageId);
                if (!activePage) return state;

                const blockToDuplicate = findBlockById(activePage.config.blocks, blockId);
                if (!blockToDuplicate) return state;
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

                const newPages = state.siteData.pages.map(p => {
                    if (p.id !== state.activePageId) return p;
                    const newConfig = {
                        ...p.config,
                        blocks: insertAfter(p.config.blocks)
                    };
                    return { ...p, config: newConfig };
                });

                return { siteData: { ...state.siteData, pages: newPages } };
            }),

            moveBlock: (blockId, direction) => set((state) => {
                const newPages = state.siteData.pages.map(p => {
                    if (p.id !== state.activePageId) return p;
                    const newConfig = {
                        ...p.config,
                        blocks: traverseAndMove(p.config.blocks, blockId, direction)
                    };
                    return { ...p, config: newConfig };
                });
                return { siteData: { ...state.siteData, pages: newPages } };
            }),

            setSelectedBlock: (block) => set({ selectedBlock: block }, false, { skipTemporalState: true }),
            setMode: (mode) => set({ mode }, false, { skipTemporalState: true }),
            setCodeView: (view) => set({ codeView: view }, false, { skipTemporalState: true }),
            setShowTemplates: (show) => set({ showTemplates: show }, false, { skipTemporalState: true }),
            setExpandedBlockIds: (ids) => set({ expandedBlockIds: ids }, false, { skipTemporalState: true }),

            toggleExpandBlock: (blockId) => set((state) => {
                const newSet = new Set(state.expandedBlockIds);
                newSet.has(blockId) ? newSet.delete(blockId) : newSet.add(blockId);
                return { expandedBlockIds: newSet };
            }, false, { skipTemporalState: true }),

            expandAncestors: (blockId) => set((state) => {
                const activePage = state.siteData.pages.find(p => p.id === state.activePageId);
                if (!activePage) return state;

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
                    const newSet = new Set(state.expandedBlockIds);
                    ancestors.forEach(id => newSet.add(id));
                    newSet.add(blockId);
                    return { expandedBlockIds: newSet };
                }
                return state;
            }, false, { skipTemporalState: true }),
            siteData: { pages: [] },
            activePageId: null,
            isLoading: false,

            setSiteData: (data) => set((state) => ({
                siteData: { ...state.siteData, ...data }
            })),

            setActivePageId: (pageId) => set({ activePageId: pageId }),
            setIsLoading: (loading) => set({ isLoading: loading }),

            addPage: (newPage) => set((state) => ({
                siteData: { ...state.siteData, pages: [...state.siteData.pages, newPage] },
                activePageId: newPage.id
            })),

            deletePage: (pageId) => set((state) => {
                const pages = state.siteData.pages;
                const pageIndex = pages.findIndex(p => p.id === pageId);
                if (pageIndex === -1 || pages.length <= 1) return state;

                const newPages = pages.filter(p => p.id !== pageId);
                const newActivePageId =
                    state.activePageId === pageId
                        ? newPages[Math.max(0, pageIndex - 1)]?.id || null
                        : state.activePageId;

                return {
                    siteData: { ...state.siteData, pages: newPages },
                    activePageId: newActivePageId
                };
            }),

            updatePageMetadata: (pageId, metadata) => set((state) => ({
                siteData: {
                    ...state.siteData,
                    pages: state.siteData.pages.map(p =>
                        p.id === pageId ? { ...p, ...metadata } : p
                    )
                }
            })),

            duplicatePage: (pageId) => set((state) => {
                const pageToDuplicate = state.siteData.pages.find(p => p.id === pageId);
                if (!pageToDuplicate) return state;

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

                const newPages = [...state.siteData.pages];
                const pageIndex = state.siteData.pages.findIndex(p => p.id === pageId);
                newPages.splice(pageIndex + 1, 0, duplicatedPage);

                return {
                    siteData: { ...state.siteData, pages: newPages },
                    activePageId: duplicatedPage.id
                };
            }),

            reorderPages: (fromIndex, toIndex) => set((state) => {
                const newPages = [...state.siteData.pages];
                const [moved] = newPages.splice(fromIndex, 1);
                newPages.splice(toIndex, 0, moved);
                return { siteData: { ...state.siteData, pages: newPages } };
            }),

            setHomepage: (pageId) => set((state) => ({
                siteData: {
                    ...state.siteData,
                    pages: state.siteData.pages.map(p => ({ ...p, isHomepage: p.id === pageId }))
                }
            })),

            getActivePage: () => {
                const state = get();
                return state.siteData.pages.find(p => p.id === state.activePageId) || null;
            },

            // --------------------------------
            // 🔁 Reset Everything
            // --------------------------------
            reset: () => set({
                selectedBlock: null,
                mode: 'edit',
                codeView: 'json',
                showTemplates: false,
                expandedBlockIds: new Set(['page-root']),
                siteData: { pages: [] },
                activePageId: null,
                isLoading: false,
            }),
        }),
        {
            limit: 50,
            equality: (past, current) => JSON.stringify(past.siteData) === JSON.stringify(current.siteData),
            partialize: (state) => ({ siteData: state.siteData, activePageId: state.activePageId })
        }
    )
);
// --------------------------------
// 🔙 Temporal Hooks
// --------------------------------
export const useTemporalStore = () => {
    const temporalState = useBuilderStore.temporal.getState();
    return {
        undo: temporalState.undo,
        redo: temporalState.redo,
        canUndo: () => temporalState.pastStates.length > 0,
        canRedo: () => temporalState.futureStates.length > 0,
        clear: temporalState.clear
    };
};

export default useBuilderStore;