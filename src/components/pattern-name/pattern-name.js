import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import styles from './PatternName.module.scss';
const PatternName = ({ onBlur = () => { }, nameColor, nameFontFamily = "", isEdit, text, onChangeColor = () => {}, isBottom }) => {
  const [colorInstance, setColorInstance] = useState({
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  });
  const [showPicker, setShowPicker] = useState(false);
  return <div className={`${styles.wrapper} ${isBottom ? styles.isBottom : ''}`} style={{ color: nameColor, fontFamily: nameFontFamily }}><div suppressContentEditableWarning={true} contentEditable={isEdit ? 'true' : 'false'} onBlur={onBlur}>{text}</div>
    {isEdit && <div onClick={(e) => {setShowPicker(true); e.stopPropagation();}} suppressContentEditableWarning={true} contentEditable='false' className={styles.menu}>
      {showPicker && <div className={styles.pickerMenu} onMouseLeave={() => setShowPicker(false)}>
        <SketchPicker color={colorInstance} onChangeComplete={color => { onChangeColor(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`); setColorInstance(color.rgb)}} />
      </div>
      }
    </div>}
  </div>
}
export default PatternName;