import React, { useState, useRef } from 'react';
import styles from './knit-pattern-visualizer.module.scss';

// --- COMPONENT CON ---
// Stitch giờ sẽ nhận loại mũi đan và render có điều kiện
function Stitch({ stitchType }) {
    const stitchClassName = stitchType === 'K' ? styles.stitch : styles.purlStitch;
    return <div className={stitchClassName}></div>;
}

// KnittingRow nhận và truyền loại mũi đan xuống cho Stitch
function KnittingRow({ stitchCount, stitchType }) {
    const rowClassName = `${styles.knittingRow} ${stitchType === 'P' ? styles.staggered : ''}`;
    return (
        <div className={rowClassName}>
            {Array.from({ length: stitchCount }).map((_, index) => (
                <Stitch key={index} stitchType={stitchType} />
            ))}
        </div>
    );
}


// --- COMPONENT CHÍNH ---
function KnitPatternVisualizer() {
    // --- STATE ---
    const [inputStitches, setInputStitches] = useState(24);
    const [inputRows, setInputRows] = useState(12);
    const [stitchType, setStitchType] = useState('K'); // <-- STATE MỚI: 'K' hoặc 'P'

    const [renderedStitches, setRenderedStitches] = useState(24);
    const [renderedRows, setRenderedRows] = useState(12);
    
    const [rotation, setRotation] = useState({ x: 25, y: -15 });
    const [zoom, setZoom] = useState(1);
    const isDragging = useRef(false);
    const prevMousePos = useRef({ x: 0, y: 0 });

    // --- CÁC HÀM XỬ LÝ SỰ KIỆN ---
    const handleMouseDown = (e) => {
        isDragging.current = true;
        prevMousePos.current = { x: e.clientX, y: e.clientY };
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - prevMousePos.current.x;
        const deltaY = e.clientY - prevMousePos.current.y;
        setRotation(prev => ({
            x: prev.x - deltaY * 0.5,
            y: prev.y + deltaX * 0.5,
        }));
        prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleWheel = (e) => {
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        setZoom(prevZoom => Math.max(0.3, Math.min(3, prevZoom * zoomFactor)));
        e.preventDefault();
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setRenderedStitches(parseInt(inputStitches, 10) || 0);
        setRenderedRows(parseInt(inputRows, 10) || 0);
    };

    const canvasStyle = {
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
    };

    // --- CẤU TRÚC JSX ---
    return (
        <div className={styles.visualizerContainer}>
            <div className={styles.row}>
                <div className={`${styles.column} ${styles.colMd4}`}>
                    <div className={styles.controlsPanel}>
                        <div className={styles.panelHeader}>
                            <h1 className={styles.title}>Knit Visualizer</h1>
                            <p className={styles.subtitle}>Drag to rotate, scroll to zoom.</p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.panelBody}>
                            {/* === BỘ CHỌN LOẠI MŨI ĐAN === */}
                            <div className={styles.formGroup}>
                                <label className={styles.controlLabel}>
                                    <i className="fa-solid fa-layer-group"></i>
                                    <span>Stitch Type</span>
                                </label>
                                <div className={styles.stitchTypeSelector}>
                                    <label className={styles.stitchTypeOption}>
                                        <input type="radio" name="stitch-type" value="K" checked={stitchType === 'K'} onChange={(e) => setStitchType(e.target.value)} />
                                        <span>Knit (K)</span>
                                    </label>
                                    <label className={styles.stitchTypeOption}>
                                        <input type="radio" name="stitch-type" value="P" checked={stitchType === 'P'} onChange={(e) => setStitchType(e.target.value)} />
                                        <span>Purl (P)</span>
                                    </label>
                                </div>
                            </div>
                            
                            {/* Control Group for Stitches */}
                            <div className={styles.formGroup}>
                                <label htmlFor="stitches" className={styles.controlLabel}>
                                    <i className="fa-solid fa-arrows-left-right"></i>
                                    <span>Stitches per row</span>
                                </label>
                                <div className={styles.inputGroup}>
                                    <input type="range" className={styles.slider} id="stitches" value={inputStitches} onChange={(e) => setInputStitches(e.target.value)} min="1" max="50" />
                                    <input type="number" className={styles.numberInput} value={inputStitches} onChange={(e) => setInputStitches(e.target.value)} min="1" max="50" />
                                </div>
                            </div>

                            {/* Control Group for Rows */}
                            <div className={styles.formGroup}>
                                <label htmlFor="rows" className={styles.controlLabel}>
                                    <i className="fa-solid fa-arrows-up-down"></i>
                                    <span>Number of rows</span>
                                </label>
                                <div className={styles.inputGroup}>
                                    <input type="range" className={styles.slider} id="rows" value={inputRows} onChange={(e) => setInputRows(e.target.value)} min="1" max="50" />
                                    <input type="number" className={styles.numberInput} value={inputRows} onChange={(e) => setInputRows(e.target.value)} min="1" max="50" />
                                </div>
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                <i className="fa-solid fa-play"></i>
                                Update Pattern
                            </button>
                        </form>
                    </div>
                </div>

                {/* Cột khung vẽ 3D */}
                <div className={`${styles.column} ${styles.colMd8}`}>
                    <div className={styles.canvasWrapper} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel}>
                        {renderedStitches > 0 && renderedRows > 0 ? (
                            <div className={styles.canvas} style={canvasStyle}>
                                {Array.from({ length: renderedRows }).map((_, index) => (
                                    // Truyền stitchType xuống
                                    <KnittingRow key={index} stitchCount={renderedStitches} stitchType={stitchType} />
                                ))}
                            </div>
                        ) : ( <p className={styles.textDanger}>Please enter positive numbers!</p> )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KnitPatternVisualizer;