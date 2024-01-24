import React, { useEffect, useState } from 'react';
import ImageUploadable from '../image-uploadable/image-uploadable';
import gtag from '../../../gtag';
import styles from './PatternDetail.module.scss';
const PatternDetail = ({name: _name, price: _price, ravelryUrl: _ravelryUrl = 'https://www.messenger.com/t/100004957155465', lovecraftsUrl: _lovecraftsUrl, bigImageUrl: _bigImageUrl, imageList: _imageList,  isAdmin, onChange = () => {}, index, noImageUrl = '/images/no-image.png'}) => {
  const [imageList,setImageList] = useState([noImageUrl]);
  const [name,setName] = useState("Pattern name");
  const [bigImageFile, setBigImageFile] = useState(null);
  const [bigImageUrl, setBigImageUrl] = useState('');
  const [price,setPrice] = useState(_price);
  const [ravelryUrl,setRavelryUrl] = useState(_ravelryUrl || 'https://www.messenger.com/t/100004957155465');
  const [lovecraftsUrl,setLovecraftsUrl] = useState(_lovecraftsUrl);
  const [isShowPayPal, setIsShowPayPal] = useState(false);
  const onClickLink = (e, key) => {
    if (isAdmin) {
      e.preventDefault();
      let value = '';
      while(value == '') {
        value = prompt(`Nhập đường dẫn tới tin nhắn riêng`);
      }
      if (value === null) {
        // User cancel
        return;
      }
      onChange(value,index,key)
    } else {
      // Track
      gtag.event({ action: "pattern_store_click", category: "engagement", label: "pattern_store_click", value: `${key} - ${name}` })
    }
  }
  useEffect(() => {
    setName(_name || "Pattern name");
    setPrice(_price || "Học phí: 100.000");
    setRavelryUrl(_ravelryUrl);
    setLovecraftsUrl(_lovecraftsUrl);
    if (Array.isArray(_imageList) && isAdmin && !_imageList.includes(noImageUrl)) {
      _imageList.push(noImageUrl);
    }
    else if (Array.isArray(_imageList) && !isAdmin && _imageList.includes(noImageUrl)) {
      const idx = _imageList.indexOf(noImageUrl);
      _imageList.splice(idx, 1);
      setImageList(_imageList);
    } else {
      setImageList(_imageList);
    }
    setBigImageUrl(_bigImageUrl);
  },[_price, _name, _lovecraftsUrl, _ravelryUrl, _imageList, _bigImageUrl]);

  useEffect(() => {
    if (window.paypal && window.paypal.Buttons) {
      console.count('Render')
      window.paypal.Buttons({
        createOrder: function(data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01'
              }
            }]
          });
        },
        onApprove: function(data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function(details) {
            const { id } = details;
            // This function shows a transaction success message to your buyer.

            window.open(`https://api.cheryx.com/verify-order?order=${id}`);
          });
        }
      }).render('#paypal-button-container');
    }
  },[]);

  const onChangeBigImage = ({imgFile}) => {
    setBigImageFile(imgFile);
    onChange(imgFile,index,'bigImageUrl');
  }

  const onChangeListImage = (imgFile,i) => {
    const _imageList = [...imageList];
    if (Array.isArray(_imageList) && _imageList.length > i) {
      _imageList[i] = imgFile;
      if (!_imageList.find(item => typeof item === 'string')) {
        _imageList.push(noImageUrl);
      }
      setImageList([..._imageList]);
      onChange(_imageList,index,'imageList')
    }
  }
  const removeImage = i => {
    const _imageList = [...imageList];
    if (Array.isArray(_imageList) && _imageList.length > i) {
      _imageList.splice(i,1);
      if (_imageList.length == 0) {
        _imageList.push(noImageUrl);
      }
      setImageList([..._imageList]);
      onChange(_imageList,index,'imageList')
    }
  }
  const lockScroll = isLock => {
    document.querySelector('html').setAttribute("style",`overflow-y: ${isLock ? 'hidden' : 'block'};`)
  }
  return <div className={styles.wrapper}>
    <div className={styles.mainImage}>
      {isAdmin ? <ImageUploadable wrapperStyle={{width: '100%', height: '100%'}} onChangeImage={onChangeBigImage} isAdmin={isAdmin} isEdit={isAdmin} src={bigImageUrl}/> : <img src={bigImageUrl}></img>}
    </div>
    <div className={styles.rightInfo}>
      <h1 suppressContentEditableWarning={isAdmin} onBlur={e => onChange(e, index, 'name')} contenteditable={`${isAdmin ? "true" : "false"}`} className={styles.title}>{name}</h1>
    </div>
    <div className={styles.storeInfo}>
      <div className={styles.blackCatWrapper}>
        <div className={styles.blackCat}>
          <div className={styles.message}>
            <div className={styles.text}>Nhắn tin cho mình để tham gia lớp nhé!</div>
          </div>
        </div>
      </div>
      <div className={styles.supperWrapperButton}>
        <div className={styles.buttonWrapper}>
          <a rel="noreferrer" href={ravelryUrl} onClick={e => onClickLink(e, 'ravelryUrl')} target="_blank" className={`${styles.linkStore}`}>Đăng kí lớp đan thú bông online</a>
        </div>
      </div>
      <div className={styles.priceWrapper}>
        <div className={styles.triangleRight}></div>
        <div className={styles.triangleRight}></div>
        <div suppressContentEditableWarning={isAdmin} onBlur={e => onChange(e, index, 'price')} contenteditable={`${isAdmin ? "true" : "false"}`} className={styles.price}>{price}</div>
        <div className={styles.triangleLeft}></div>
        <div className={styles.triangleLeft}></div>
      </div>
    </div>
    <div className={styles.listSmallImage}>
      {Array.isArray(imageList) && imageList.map((img,i) => isAdmin ? <div style={{position: 'relative'}}>
        {i < imageList.length - 1 && <div className={styles.deleteButton} onClick={() => { removeImage(i)}}>x</div>}
        <ImageUploadable key={i} wrapperStyle={{width: '243px', height: '243px', marginRight: 15}} onChangeImage={({imgFile}) => {onChangeListImage(imgFile,i)}} isAdmin={isAdmin} isEdit={isAdmin} src={img}/>
      </div> : <img key={i} src={img}></img>)}
    </div>
  </div>
}
export default PatternDetail;