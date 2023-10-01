import React, { useEffect, useState } from 'react';
import styles from './PatternPreview.module.scss';
import { ImageUploadable } from '@cheryx2020/core';
const PatternPreview = ({isAdmin, onChange = () => {}, index, imageUrl: _imageUrl, previewUrl: _previewUrl, buttonText="Look inside the pattern", message='You can preview 3 pages of the knitting pattern!'}) => {
  const [imageUrl, setImageUrl] = useState(_imageUrl);
  const [previewUrl, setPreviewUrl] = useState(_previewUrl);
  const onChangeBigImage = ({imgFile}) => {
    onChange(imgFile,index,'imageUrl');
  }
  const onClickLink = (e, key) => {
    if (isAdmin) {
      e.preventDefault();
      let value = '';
      while(value == '') {
        value = prompt(`Nhập đường dẫn file pdf`, previewUrl);
      }
      if (value === null) {
        // User cancel
        return;
      }
      onChange(value,index,key)
    } else {
      // Track
      // gtag.event({ action: "pattern_store_click", category: "engagement", label: "pattern_store_click", value: `${key} - ${name}` })
    }
  }
  useEffect(() => {
    setImageUrl(_imageUrl);
    setPreviewUrl(_previewUrl);
  },[_imageUrl, _previewUrl]);
  return <div className={styles.wrapper}>
    <div className={styles.image}>
      <ImageUploadable width={'100%'} height={'100%'} wrapperStyle={{width: '100%', height: '100%', minWidth: '100%'}} onChangeImage={onChangeBigImage} isAdmin={isAdmin} isEdit={isAdmin} src={imageUrl}/>
    </div>
    <div className={styles.info}>
      <a rel="noreferrer" href={previewUrl} onClick={e => onClickLink(e, 'previewUrl')} target="_blank" className={styles.previewUrl}>{buttonText}</a>
      <div contentEditable={isAdmin ? "true" : "false"} onBlur={() => {}}>{message}</div>
    </div>
  </div>
}
export default PatternPreview;