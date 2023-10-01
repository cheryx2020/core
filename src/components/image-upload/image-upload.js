import React, { useState } from 'react';
import styles from './ImageUpload.module.scss';
const ImageUpload = ({url, onChange = () => {}, caption, onDragStart = () => {}, onResize = () => {}, width, height}) => {
  const [showMenuImage, setShowMenuImage] = useState(false);
  const onMouseOut = e => {
    onResize({width: parseInt(e.target.style.width) || 0, height: parseInt(e.target.style.height) || 0});
  }
  const styleImage = {
    backgroundImage: `url('${url}')`
  };
  if (width) {
    styleImage.width = width;
  }
  if (height) {
    styleImage.height = height;
  }
  return <div onDragStart={onDragStart} draggable="true" className={styles.imgWrapper} style={{position: 'relative'}}>
  {showMenuImage && <div className={styles.menuImage}>
      <div className={styles.deleteButton} onClick={() => setShowMenuImage(false)}>x</div>
      <label className={styles.uploadButton}><span>Upload Image</span><input type="file" onChange={e => {setShowMenuImage(false);onChange(e)}}></input></label>
    </div>}
  {!showMenuImage && <div className={styles.editImageBtn} onClick={() => setShowMenuImage(true)}>Edit</div>}
  <textarea className={styles.textarea} onMouseOut={onMouseOut} disabled={true} style={{...styleImage}}></textarea>
  {caption}
</div>
}
export default ImageUpload;