import React, { useState } from 'react';
import styles from '../image-upload/ImageUpload.module.scss';
const PostVideo = ({text, url = 'vTJdVE_gjI0', onChange = () => {}, onChangeText = () => {}, onDragStart = () => {}}) => {
  const [showMenuVideo, setShowMenuVideo] = useState(false);
  return <div onDragStart={onDragStart} draggable="true" className={styles.imgWrapper}>
    {showMenuVideo && <div className={styles.videoMenu}>
      <div className={styles.deleteButton} onClick={() => setShowMenuVideo(false)}>x</div>
      <label>Video Id:</label>
      <input value={url} onChange={e => onChange(e)}></input>
    </div>}
    <iframe title={text} width="560" height="315" src={`https://www.youtube.com/embed/${url}`} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    <figcaption suppressContentEditableWarning={true} contentEditable={true} onBlur={onChangeText} className={styles.imageDescription} style={{minWidth: 100}}>{text}</figcaption>
    {!showMenuVideo && <div className={styles.editImageBtn} onClick={() => setShowMenuVideo(true)}>Edit</div>}
  </div>
}
export default PostVideo;