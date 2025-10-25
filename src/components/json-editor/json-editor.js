import React, { useState, useEffect, useRef } from "react";

function JsonEditor({ data, onChange }) {
    const [text, setText] = useState(JSON.stringify(data, null, 2));
    const [error, setError] = useState(null);
    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let editor;
        let monaco;

        const initMonaco = async () => {
            const loader = document.createElement('script');
            loader.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js';
            
            loader.onload = () => {
                window.require.config({ 
                    paths: { 
                        vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' 
                    } 
                });

                window.require(['vs/editor/editor.main'], () => {
                    if (!containerRef.current) return;

                    monaco = window.monaco;
                    monacoRef.current = monaco;

                    editor = monaco.editor.create(containerRef.current, {
                        value: text,
                        language: 'json',
                        theme: 'vs-dark',
                        automaticLayout: true,
                        minimap: { enabled: true },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        readOnly: false,
                        cursorStyle: 'line',
                        formatOnPaste: true,
                        formatOnType: false,
                        suggest: {
                            showKeywords: true,
                            showSnippets: true
                        },
                        quickSuggestions: {
                            other: true,
                            comments: false,
                            strings: true
                        }
                    });

                    editorRef.current = editor;

                    // Handle content changes
                    editor.onDidChangeModelContent(() => {
                        const value = editor.getValue();
                        setText(value);

                        try {
                            const parsed = JSON.parse(value);
                            setError(null);
                            onChange(parsed);
                        } catch (err) {
                            setError(`Invalid JSON: ${err.message}`);
                        }
                    });

                    // Add keyboard shortcuts
                    editor.addCommand(
                        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                        () => {
                            handleFormat();
                        }
                    );
                });
            };

            document.head.appendChild(loader);
        };

        initMonaco();

        return () => {
            if (editor) {
                editor.dispose();
            }
        };
    }, []);

    // Update editor when data prop changes externally
    useEffect(() => {
        const newText = JSON.stringify(data, null, 2);
        if (editorRef.current && text !== newText) {
            const editor = editorRef.current;
            const currentPosition = editor.getPosition();
            editor.setValue(newText);
            if (currentPosition) {
                editor.setPosition(currentPosition);
            }
            setText(newText);
        }
    }, [data]);

    const handleFormat = () => {
        if (!editorRef.current) return;

        try {
            const value = editorRef.current.getValue();
            const parsed = JSON.parse(value);
            const formatted = JSON.stringify(parsed, null, 2);
            
            const editor = editorRef.current;
            const currentPosition = editor.getPosition();
            editor.setValue(formatted);
            if (currentPosition) {
                editor.setPosition(currentPosition);
            }
            
            setText(formatted);
            setError(null);
            onChange(parsed);
        } catch (err) {
            setError(`Cannot format: Invalid JSON - ${err.message}`);
        }
    };


    const toggleTheme = () => {
        if (!monacoRef.current || !editorRef.current) return;
        const currentTheme = editorRef.current._themeService._theme.themeName;
        const newTheme = currentTheme === 'vs-dark' ? 'vs' : 'vs-dark';
        monacoRef.current.editor.setTheme(newTheme);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '600px',
            border: '1px solid #444',
            borderRadius: '4px',
            overflow: 'hidden',
            backgroundColor: '#1e1e1e'
        }}>
            {/* Toolbar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: '#2d2d2d',
                borderBottom: '1px solid #444',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={handleFormat}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: '#0e639c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500'
                    }}
                    title="Format Document (Ctrl/Cmd + S)"
                >
                    Format
                </button>
                <button
                    onClick={toggleTheme}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: '#505050',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '13px'
                    }}
                >
                    Toggle Theme
                </button>
                {error && (
                    <div style={{
                        color: '#f48771',
                        fontSize: '13px',
                        marginLeft: '8px',
                        flex: 1
                    }}>
                        ⚠ {error}
                    </div>
                )}
            </div>

            {/* Editor Container */}
            <div 
                ref={containerRef}
                style={{
                    flex: 1,
                    overflow: 'hidden'
                }}
            />
        </div>
    );
}

// Demo wrapper
export default JsonEditor;