import React, { useState, useRef, useMemo } from 'react';

// ============================================================================
// STITCH TYPE DEFINITIONS
// ============================================================================
// Each stitch type has a relative height and width multiplier (stockinette = 1.0 baseline)
const STITCH_TYPES = {
  k: { name: 'Knit', height: 1.0, width: 1.0, label: 'k' },
  p: { name: 'Purl', height: 1.0, width: 1.0, label: 'p' },
  inc: { name: 'Increase (kfb)', height: 1.0, width: 2.0, label: 'inc' }, // knit front & back
  m1: { name: 'Make One', height: 1.0, width: 1.0, label: 'm1' }, // lifted increase
  k2tog: { name: 'Knit 2 Together', height: 1.0, width: 0.5, label: 'k2tog' },
  ssk: { name: 'Slip Slip Knit', height: 1.0, width: 0.5, label: 'ssk' },
  yo: { name: 'Yarn Over', height: 1.2, width: 1.0, label: 'yo' },
};

// ============================================================================
// PATTERN NOTATION PARSER
// ============================================================================
// Parses common knitting notation into structured row data
// Examples: "k10, inc, k10", "(k4, inc) x 6", "Rows 4-8: knit"

function parsePatternNotation(notation, previousCount = 0, isWS = false) {
  const line = notation.trim();
  
  // Handle range notation: Rows 4-8: knit [42]
  const rangeMatch = line.match(/^Rows?\s*(\d+)-(\d+):\s*(.+)$/i);
  if (rangeMatch) {
    const [, start, end, pattern] = rangeMatch;
    const rows = [];
    for (let i = parseInt(start); i <= parseInt(end); i++) {
      const currentIsWS = (i % 2 === 0); // Even rows typically WS in flat knitting
      rows.push(parsePatternNotation(pattern, previousCount, currentIsWS));
    }
    return rows.length === 1 ? rows[0] : rows;
  }

  // Extract final count from brackets [42]
  let finalCount = null;
  const countMatch = line.match(/\[(\d+)\]$/);
  if (countMatch) {
    finalCount = parseInt(countMatch[1]);
  }

  // Simple knit all: "knit" or "k"
  if (line.match(/^(knit|k)$/i)) {
    return createRow('k', previousCount, previousCount, isWS);
  }

  // Purl all: "purl" or "p"
  if (line.match(/^(purl|p)$/i)) {
    return createRow('p', previousCount, previousCount, isWS);
  }

  // Cast on: "CO 40" or "Cast on 40"
  const castOnMatch = line.match(/^(CO|Cast\s+on)\s+(\d+)/i);
  if (castOnMatch) {
    const count = parseInt(castOnMatch[2]);
    return createRow('k', count, count, false);
  }

  // Pattern repeats: "(k4, inc) x 6" or "(k2tog, k3) x 8"
  const patternRepeat = line.match(/\(([^)]+)\)\s*x\s*(\d+)/i);
  if (patternRepeat) {
    const [, pattern, repeatCount] = patternRepeat;
    return createRowFromPattern(pattern, parseInt(repeatCount), finalCount, isWS);
  }

  // Simple stitch sequence: "k10, inc, k10, inc, k10"
  if (line.match(/[kp]\d+|inc|k2tog|ssk|m1|yo/i)) {
    return createRowFromSequence(line, finalCount, isWS);
  }

  return null;
}

function createRow(stitchType, count, finalCount = null, isWS = false) {
  const stitches = Array(count).fill(stitchType);
  return {
    stitches,
    count: finalCount || count,
    type: stitchType,
    isWS, // Wrong Side (for flat knitting tracking)
  };
}

function createRowFromPattern(pattern, repeatCount, finalCount = null, isWS = false) {
  // Parse pattern like "k4, inc" or "k2tog, k3"
  const parts = pattern.split(',').map(p => p.trim());
  const stitches = [];
  
  for (let i = 0; i < repeatCount; i++) {
    parts.forEach(part => {
      const match = part.match(/^([kp]|inc|k2tog|ssk|m1|yo)(\d+)?$/i);
      if (match) {
        const [, stitch, count] = match;
        const stitchCount = count ? parseInt(count) : 1;
        for (let j = 0; j < stitchCount; j++) {
          stitches.push(stitch.toLowerCase());
        }
      }
    });
  }

  return {
    stitches,
    count: finalCount || stitches.length,
    type: 'pattern',
    isWS,
  };
}

function createRowFromSequence(sequence, finalCount = null, isWS = false) {
  // Parse sequence like "k10, inc, k10, inc, k10"
  const parts = sequence.split(',').map(p => p.trim());
  const stitches = [];
  
  parts.forEach(part => {
    const match = part.match(/^([kp]|inc|k2tog|ssk|m1|yo)(\d+)?$/i);
    if (match) {
      const [, stitch, count] = match;
      const stitchCount = count ? parseInt(count) : 1;
      for (let j = 0; j < stitchCount; j++) {
        stitches.push(stitch.toLowerCase());
      }
    }
  });

  return {
    stitches,
    count: finalCount || stitches.length,
    type: 'mixed',
    isWS,
  };
}

// ============================================================================
// SHAPING ANALYSIS ENGINE
// ============================================================================
// Analyzes stitch distribution and predicts 3D form characteristics for knitting

function analyzeShaping(rows) {
  if (!rows || rows.length === 0) return null;

  const analysis = {
    totalRows: rows.length,
    shapeType: 'unknown',
    smoothness: 0,
    warnings: [],
    widthChanges: [],
    heightProfile: [],
    fabricType: 'stockinette', // vs garter, ribbing, etc.
  };

  // Calculate width changes between rows
  for (let i = 1; i < rows.length; i++) {
    const prev = rows[i - 1];
    const curr = rows[i];
    const change = curr.count - prev.count;
    const changeRate = prev.count > 0 ? (change / prev.count) * 100 : 0;
    
    analysis.widthChanges.push({
      row: i + 1,
      change,
      changeRate,
      newCount: curr.count,
    });
  }

  // Calculate height accumulation (considering stitch types)
  let cumulativeHeight = 0;
  rows.forEach((row, idx) => {
    const avgStitchHeight = row.stitches.reduce((sum, s) => {
      const stitchType = STITCH_TYPES[s] || STITCH_TYPES.k;
      return sum + stitchType.height;
    }, 0) / row.stitches.length;
    
    cumulativeHeight += avgStitchHeight;
    analysis.heightProfile.push({
      row: idx + 1,
      height: cumulativeHeight,
      width: row.count, // Width in stitch count
    });
  });

  // Detect shape type based on width pattern
  const increases = analysis.widthChanges.filter(c => c.change > 0).length;
  const decreases = analysis.widthChanges.filter(c => c.change < 0).length;
  const stable = analysis.widthChanges.filter(c => c.change === 0).length;

  if (increases > 0 && decreases > 0) {
    // Check if symmetric (increases then decreases = shaped garment)
    const midpoint = Math.floor(rows.length / 2);
    const firstHalfInc = analysis.widthChanges.slice(0, midpoint).filter(c => c.change > 0).length;
    const secondHalfDec = analysis.widthChanges.slice(midpoint).filter(c => c.change < 0).length;
    
    if (firstHalfInc > 0 && secondHalfDec > 0) {
      analysis.shapeType = 'shaped piece (sleeve/hat)';
    } else {
      analysis.shapeType = 'complex shaping';
    }
  } else if (increases > 0 && decreases === 0) {
    analysis.shapeType = 'expanding (A-line/cone)';
  } else if (decreases > increases) {
    analysis.shapeType = 'contracting (hat crown/toe)';
  } else if (increases === 0 && decreases === 0) {
    analysis.shapeType = 'rectangular (scarf/panel)';
  }

  // Calculate smoothness score (0-100)
  // Smooth shaping = gradual, even changes; lumpy = large jumps or clustering
  if (analysis.widthChanges.length > 0) {
    const avgChangeRate = analysis.widthChanges.reduce((sum, c) => sum + Math.abs(c.changeRate), 0) / analysis.widthChanges.length;
    analysis.smoothness = Math.max(0, 100 - (avgChangeRate * 3));
  } else {
    analysis.smoothness = 100; // No changes = smooth
  }

  // Detect shaping issues
  rows.forEach((row, idx) => {
    // Check for clustered increases/decreases (risk of puckering or diagonal lines)
    const incCount = row.stitches.filter(s => s === 'inc' || s === 'm1').length;
    const decCount = row.stitches.filter(s => s === 'k2tog' || s === 'ssk').length;
    
    if (incCount > 0 || decCount > 0) {
      const positions = [];
      row.stitches.forEach((stitch, pos) => {
        if (stitch === 'inc' || stitch === 'm1' || stitch === 'k2tog' || stitch === 'ssk') {
          positions.push(pos);
        }
      });

      // Check if changes are clustered (within 3 stitches)
      for (let i = 1; i < positions.length; i++) {
        if (positions[i] - positions[i - 1] <= 3) {
          analysis.warnings.push({
            row: idx + 1,
            type: 'clustering',
            message: `Row ${idx + 1}: ${incCount > 0 ? 'Increases' : 'Decreases'} are clustered (may create visible lines or puckering)`,
          });
          break;
        }
      }
    }

    // Check for excessive change rate (sharp angles or flaring)
    if (idx > 0) {
      const change = Math.abs(row.count - rows[idx - 1].count);
      const changePercent = (change / rows[idx - 1].count) * 100;
      if (changePercent > 20) {
        analysis.warnings.push({
          row: idx + 1,
          type: 'sharp-change',
          message: `Row ${idx + 1}: Large width change (${changePercent.toFixed(0)}%) may create flaring or bunching`,
        });
      }
    }

    // Check for unbalanced decreases (k2tog on one side, should balance with ssk on other)
    const k2togCount = row.stitches.filter(s => s === 'k2tog').length;
    const sskCount = row.stitches.filter(s => s === 'ssk').length;
    if (k2togCount > 0 && sskCount === 0) {
      analysis.warnings.push({
        row: idx + 1,
        type: 'unbalanced-decreases',
        message: `Row ${idx + 1}: Only k2tog used. Consider balancing with ssk for symmetrical shaping`,
      });
    }
  });

  return analysis;
}

// ============================================================================
// VISUALIZATION COMPONENTS
// ============================================================================

function Stitch({ stitchType, position, total }) {
  const isIncrease = stitchType === 'inc' || stitchType === 'm1';
  const isDecrease = stitchType === 'k2tog' || stitchType === 'ssk';
  const isPurl = stitchType === 'p';
  
  const style = {
    width: isDecrease ? '8px' : isIncrease ? '16px' : '12px',
    height: '16px',
    backgroundColor: isIncrease ? '#4CAF50' : isDecrease ? '#f44336' : isPurl ? '#9C27B0' : '#2196F3',
    border: (isIncrease || isDecrease) ? '2px solid #fff' : '1px solid rgba(255,255,255,0.3)',
    borderRadius: isPurl ? '20%' : '4px',
    boxShadow: (isIncrease || isDecrease) ? '0 0 8px rgba(0,0,0,0.3)' : 'none',
    transition: 'all 0.2s ease',
  };

  return <div style={style} title={`${stitchType} at position ${position + 1}`} />;
}

function RowVisualization({ row, rowNumber }) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0',
    padding: '10px',
    backgroundColor: row.isWS ? '#f5f5f5' : '#ffffff',
    borderRadius: '4px',
    border: '1px solid #e0e0e0',
  };

  const stitchesStyle = {
    display: 'flex',
    gap: '3px',
    flex: 1,
    flexWrap: 'wrap',
  };

  return (
    <div style={containerStyle}>
      <div style={{ minWidth: '60px', fontWeight: 'bold', fontSize: '13px', color: '#666' }}>
        Row {rowNumber}:
      </div>
      <div style={stitchesStyle}>
        {row.stitches.map((stitch, idx) => (
          <Stitch key={idx} stitchType={stitch} position={idx} total={row.count} />
        ))}
      </div>
      <div style={{ minWidth: '40px', textAlign: 'right', fontSize: '12px', color: '#999' }}>
        [{row.count}]
      </div>
    </div>
  );
}

function ShapingAnalysisPanel({ analysis }) {
  if (!analysis) return null;

  const smoothnessColor = analysis.smoothness > 75 ? '#4CAF50' : analysis.smoothness > 50 ? '#FF9800' : '#f44336';

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>Shaping Analysis</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span><strong>Predicted Shape:</strong></span>
          <span style={{ textTransform: 'capitalize' }}>{analysis.shapeType}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span><strong>Smoothness Score:</strong></span>
          <span style={{ color: smoothnessColor, fontWeight: 'bold' }}>{analysis.smoothness.toFixed(0)}/100</span>
        </div>
        
        <div style={{ height: '8px', backgroundColor: '#ddd', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${analysis.smoothness}%`, backgroundColor: smoothnessColor, transition: 'width 0.3s' }} />
        </div>
      </div>

      {analysis.warnings.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#f44336' }}>⚠️ Warnings:</h4>
          {analysis.warnings.map((warning, idx) => (
            <div key={idx} style={{ fontSize: '13px', padding: '8px', backgroundColor: '#fff3e0', borderLeft: '3px solid #ff9800', marginBottom: '5px' }}>
              {warning.message}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Width Changes:</h4>
        <div style={{ fontSize: '12px', maxHeight: '150px', overflowY: 'auto' }}>
          {analysis.widthChanges.map((change, idx) => (
            <div key={idx} style={{ padding: '4px 0', borderBottom: '1px solid #eee' }}>
              Row {change.row}: {change.change > 0 ? '+' : ''}{change.change} stitches 
              ({change.changeRate > 0 ? '+' : ''}{change.changeRate.toFixed(1)}%) → {change.newCount} sts
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function KnitPatternVisualizer() {
  const [patternInput, setPatternInput] = useState('CO 40\nk\nk10, inc, k18, inc, k10\nk\nk11, inc, k18, inc, k11\nRows 6-10: k');
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  // Parse pattern and generate rows
  const handlePatternParse = () => {
    const lines = patternInput.split('\n').filter(line => line.trim());
    const parsedRows = [];
    let previousCount = 0;

    lines.forEach((line, idx) => {
      const isWS = (idx % 2 === 1); // Alternate RS/WS in flat knitting
      const result = parsePatternNotation(line, previousCount, isWS);
      if (result) {
        if (Array.isArray(result)) {
          parsedRows.push(...result);
        } else {
          parsedRows.push(result);
        }
        previousCount = Array.isArray(result) ? result[result.length - 1].count : result.count;
      }
    });

    setRows(parsedRows);
    setSelectedRow(null);
  };

  // Memoized analysis to avoid recalculation
  const analysis = useMemo(() => analyzeShaping(rows), [rows]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Professional Knitting Pattern Visualizer</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Parse patterns, analyze shaping, and predict fabric form before you cast on.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Left Panel: Input */}
        <div>
          <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Pattern Notation</h2>
            <textarea
              value={patternInput}
              onChange={(e) => setPatternInput(e.target.value)}
              style={{
                width: '100%',
                minHeight: '200px',
                fontFamily: 'monospace',
                fontSize: '14px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical',
              }}
              placeholder="Enter pattern notation, e.g.:&#10;CO 40&#10;k&#10;k10, inc, k18, inc, k10&#10;(k4, inc) x 8&#10;Rows 6-10: k"
            />
            <button
              onClick={handlePatternParse}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Parse & Analyze Pattern
            </button>
            
            {rows.length > 0 && (
              <div style={{ marginTop: '20px', fontSize: '13px', color: '#666' }}>
                ✓ Parsed {rows.length} rows successfully
              </div>
            )}
          </div>

          {analysis && <ShapingAnalysisPanel analysis={analysis} />}
        </div>

        {/* Right Panel: Visualization */}
        <div>
          <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', minHeight: '400px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Row Visualization</h2>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
              🔵 Knit &nbsp; 🟣 Purl &nbsp; 🟢 Increase &nbsp; 🔴 Decrease
            </div>
            
            {rows.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
                Enter a pattern and click "Parse & Analyze" to visualize rows
              </div>
            ) : (
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {rows.map((row, idx) => (
                  <RowVisualization key={idx} row={row} rowNumber={idx + 1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend and Tips */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>💡 Pattern Notation Guide</h3>
        <ul style={{ fontSize: '13px', lineHeight: '1.8', margin: 0 }}>
          <li><code>CO 40</code> - Cast on 40 stitches</li>
          <li><code>k</code> or <code>knit</code> - Knit all stitches in row</li>
          <li><code>p</code> or <code>purl</code> - Purl all stitches in row</li>
          <li><code>k10, inc, k10</code> - Knit 10, increase, knit 10</li>
          <li><code>(k4, inc) x 8</code> - Repeat pattern (k4, inc) 8 times</li>
          <li><code>(k2tog, k3) x 6</code> - Repeat pattern (k2tog, k3) 6 times</li>
          <li><code>Rows 6-10: k</code> - Rows 6 through 10 all knit</li>
        </ul>
      </div>
    </div>
  );
}

export default KnitPatternVisualizer;