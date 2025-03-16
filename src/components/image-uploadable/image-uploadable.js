import React, { useEffect, useRef, useState } from 'react';
import styles from './ImageUploadable.module.scss';
import { readFile, isBigFile } from "@cheryx2020/utils";

const ImageUploadable = ({ src, alt, onChangeImage = () => { }, isEdit, wrapperStyle = {}, skipCheckFileSize, imgStyle={}, className = '', onChangeStyle = () => { }, resizeable = false }) => {
  const [imgSrc, setImgSrc] = useState('');
  const imageWap = useRef(null);
  const image = useRef(null);
  useEffect(() => {
    if (typeof src === 'object' && src.name) {
      readFile(src).then(res => { setImgSrc(res) });
    } else {
      setImgSrc(src);
    }
  }, [src]);
  const isSkipCheckFileSize = skipCheckFileSize ? true : wrapperStyle.width;
  const onChange = async (e) => {
    // Check file size
    if (!isSkipCheckFileSize && isBigFile(e?.target?.files[0])) {
      alert('Kích thước file không được vượt quá 500KB');
      return;
    }
    const { imgSrc, imgFile } = await new Promise(resolve => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve({ imgSrc: reader.result, imgFile: e.target.files[0] })
      }, false);
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    })
    setImgSrc(imgSrc);
    onChangeImage({ imgSrc, imgFile, width: imageWap?.current?.clientWidth ?? 0 })
    return;
  }
  let startX, startY, startWidth, startHeight;
  const initDrag = e => {
    e.stopPropagation();
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(imageWap.current).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(imageWap.current).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  }
  function doDrag(e) {
    const imageWidth = (startWidth + e.clientX - startX) + 'px';
    const imageHeight = (startHeight + e.clientY - startY) + 'px';
    imageWap.current.style.width = imageWidth;
    imageWap.current.style.height = imageHeight;
    image.current.style.width = imageWidth;
    image.current.style.height = imageHeight;
  }

  function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false); document.documentElement.removeEventListener('mouseup', stopDrag, false);
    onChangeStyle({ width: imageWap.current.style.width, height: imageWap.current.style.height })
  }
  return <div ref={imageWap} className={`${styles.image} ${className}`} style={wrapperStyle}>
    {isEdit && <div className={styles.imageMenu} onClick={e => e.stopPropagation()}>
      <label><div>Choose Image</div><input accept="image/png, image/jpeg, image/svg+xml" hidden={true} type="file" onChange={onChange}></input></label>
    </div>}
    {isEdit ? <img style={imgStyle} ref={image} src={imgSrc != '' ? imgSrc : src} /> : <img style={imgStyle} alt={alt} src={src} />}
    {isEdit && resizeable && <div onDrag={(e) => { e.preventDefault(); e.stopPropagation() }} onMouseDown={initDrag} className={styles.resizer}>
      <div className={styles.vertical}></div>
      <div className={styles.horizontal}></div>
    </div>}
  </div>
}
export default ImageUploadable;