import React, { useEffect, useRef, useState } from 'react';
import ImageUploadable from '../image-uploadable/image-uploadable';
import gtag from '../../../gtag';
import styles from './PatternDetail.module.scss';
const PatternDetail = ({ name: _name, price: _price, discount, ravelryUrl: _ravelryUrl = 'https://www.messenger.com/t/100004957155465', lovecraftsUrl: _lovecraftsUrl, bigImageUrl: _bigImageUrl, imageList: _imageList, isAdmin, onChange = () => { }, index, noImageUrl = '/images/no-image.png' }) => {
  const [imageList, setImageList] = useState(_imageList ? _imageList : [noImageUrl]);
  const [name, setName] = useState("Pattern name");
  const [bigImageUrl, setBigImageUrl] = useState('');
  const [price, setPrice] = useState(_price);
  const [ravelryUrl, setRavelryUrl] = useState(_ravelryUrl || 'https://www.messenger.com/t/100004957155465');
  const [lovecraftsUrl, setLovecraftsUrl] = useState(_lovecraftsUrl);
  const [isShowPayPal, setIsShowPayPal] = useState(false);
  const mainImageRef = useRef();
  let priceNumber = price;
  let discountedPrice = price;
  const priceMatch = price.match(/\d+/);
  if (priceMatch) {
    priceNumber = parseInt(priceMatch[0], 10);
    discountedPrice = (priceNumber * (1 - discount / 100)).toFixed(2);
  } else {
    console.log("No number found.");
  }
  const isVi = process?.env?.NEXT_PUBLIC_language === 'vi';
  const onClickLink = (e, key) => {
    if (isAdmin) {
      e.preventDefault();
      let value = '';
      while (value == '') {
        if (isVi) {
          value = prompt(`Nhập đường dẫn tới tin nhắn riêng`);
        } else {
          let defaultValue = "", pageName = "";
          if (key === 'ravelryUrl') {
            defaultValue = ravelryUrl;
            pageName = "Ravelry";
          }
          if (key === 'lovecraftsUrl') {
            defaultValue = lovecraftsUrl;
            pageName = "Lovecrafts";
          }
          value = prompt(`Nhập đường dẫn tới trang ${pageName}`, defaultValue);
        }
      }
      if (value === null) {
        // User cancel
        return;
      }
      onChange(value, index, key)
    } else {
      // Track
      gtag.event({ action: "pattern_store_click", category: "engagement", label: "pattern_store_click", value: `${key} - ${name}` })
    }
  }
  useEffect(() => {
    setName(_name || "Pattern name");
    setPrice(_price || (isVi ? "Học phí: 100.000" : "$ 6.3 USD"));
    setRavelryUrl(_ravelryUrl);
    setLovecraftsUrl(_lovecraftsUrl);
    setBigImageUrl(_bigImageUrl);
  }, [_price, _name, _lovecraftsUrl, _ravelryUrl, _bigImageUrl]);

  useEffect(() => {
    if (Array.isArray(_imageList) && isAdmin && !_imageList.includes(noImageUrl)) {
      _imageList.push(noImageUrl);
    }
    else if (Array.isArray(_imageList) && !isAdmin && _imageList.includes(noImageUrl)) {
      const idx = _imageList.indexOf(noImageUrl);
      _imageList.splice(idx, 1);
      setImageList(_imageList);
    } else {
      setImageList([..._imageList]);
    }
  }, [_imageList])

  useEffect(() => {
    if (window.paypal && window.paypal.Buttons) {
      console.count('Render')
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01'
              }
            }]
          });
        },
        onApprove: function (data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function (details) {
            const { id } = details;
            // This function shows a transaction success message to your buyer.

            window.open(`https://api.cheryx.com/verify-order?order=${id}`);
          });
        }
      }).render('#paypal-button-container');
    }
  }, []);

  const onChangeBigImage = ({ imgFile }) => {
    onChange(imgFile, index, 'bigImageUrl');
  }

  const onChangeListImage = (imgFile, i) => {
    const _imageList = [...imageList];
    if (Array.isArray(_imageList) && _imageList.length > i) {
      _imageList[i] = imgFile;
      if (!_imageList.find(item => typeof item === 'string')) {
        _imageList.push(noImageUrl);
      }
      setImageList([..._imageList]);
      onChange(_imageList, index, 'imageList')
    }
  }
  const removeImage = i => {
    const _imageList = [...imageList];
    if (Array.isArray(_imageList) && _imageList.length > i) {
      _imageList.splice(i, 1);
      if (_imageList.length == 0) {
        _imageList.push(noImageUrl);
      }
      setImageList([..._imageList]);
      onChange(_imageList, index, 'imageList')
    }
  }
  const lockScroll = isLock => {
    document.querySelector('html').setAttribute("style", `overflow-y: ${isLock ? 'hidden' : 'block'};`)
  }
  const ListSmallImages = () => {
    return <div className={styles.listSmallImage}>
      {Array.isArray(imageList) && imageList.map((img, i) => isAdmin ? <div style={{ position: 'relative' }}>
        {i < imageList.length - 1 && <div className={styles.deleteButton} onClick={() => { removeImage(i) }}>x</div>}
        <ImageUploadable key={i} wrapperStyle={{ width: '243px', height: '243px', marginRight: 15 }} onChangeImage={({ imgFile }) => { onChangeListImage(imgFile, i) }} isAdmin={isAdmin} isEdit={isAdmin} src={img} />
      </div> : <img alt={name} key={i} src={img} style={{ cursor: "pointer" }} onClick={(e) => {
        mainImageRef.current.src = img;
      }}></img>)}
    </div>
  }
  const MainImage = () => {
    return <div className={styles.mainImage}>
      {isAdmin ? <ImageUploadable wrapperStyle={{ width: '100%', height: '100%' }} onChangeImage={onChangeBigImage} isAdmin={isAdmin} isEdit={isAdmin} src={bigImageUrl} /> : <img ref={mainImageRef} alt={name} src={bigImageUrl}></img>}
    </div>
  }
  const RightInfo = ({ children }) => {
    return <div className={styles.rightInfo}>
      <h1 suppressContentEditableWarning={isAdmin} onBlur={e => onChange(e, index, 'name')} contenteditable={`${isAdmin ? "true" : "false"}`} className={styles.title}>{name}</h1>
      {children}
    </div>
  }

  const StoreInfo = ({ children }) => {
    return <div className={styles.storeInfo}>{children}</div>
  }

  const PatternDetailWrapper = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>
  }

  const Price = ({ children }) => {
    return <div suppressContentEditableWarning={isAdmin} onBlur={e => onChange(e, index, 'price')} contenteditable={`${isAdmin ? "true" : "false"}`} className={styles.price}>{children}</div>
  }

  if (!isVi) {
    return <PatternDetailWrapper>
      <MainImage />
      <RightInfo>
        <div className={styles.author}>By Cheryx</div>
        <Price>
          <div className={discount ? styles.lineThrough : ""}>{priceNumber} USD</div>
          {discount ? <div className={styles.discounted}>{discountedPrice} USD <div className={styles.priceNote}>Coupon code <strong>CHERYX</strong> on Ravelry</div></div> : null}
        </Price>
      </RightInfo>
      <StoreInfo>
        {!isShowPayPal && <img alt='buy pattern here' src="/images/pattern-store.png"></img>}
        <div className={`${styles.payPalWrapper}${isShowPayPal ? ` ${styles.show}` : ''}`}>
          <div className={styles.closeLink} onClick={() => { lockScroll(false); setIsShowPayPal(false); }}>Close</div>
          <div className={styles.payPal} id="paypal-button-container"></div>
        </div>
        {/* {!isShowPayPal && <div onClick={() => {setIsShowPayPal(true); lockScroll(true)}} className={`${styles.paypalButton} ${styles.linkStore} ${styles.mb11}`}>Download Direct with PayPal</div>} */}
        <a rel="noreferrer" style={{ position: "relative" }} href={ravelryUrl} onClick={e => onClickLink(e, 'ravelryUrl')} target="_blank" className={`${styles.linkStore} ${styles.mb11}`}>Ravelry
          {discount ? <div className={styles.discount}>{`-${discount}%`}</div> : null}
        </a>
        <a rel="noreferrer" href={lovecraftsUrl} onClick={e => onClickLink(e, 'lovecraftsUrl')} target="_blank" className={styles.linkStore}>Lovecrafts</a>
        {/* <PayPalCheckout itemId={id} clientId="AdzCHyvdcsuBpt-S0UqRExMe417mqlbjLm2oKv3od36JBtc-4aPZ1VxyENkuY19YzxCO3fahG4XwhtTj" /> */}
        <a className={styles.emailMe} href="mailto:vungoc101230@gmail.com">If you prefer to buy directly from me instead of using Ravelry or Lovecrafts, you can click here to send me an email with your order details. I will reply to you as soon as possible and provide you with the payment and delivery options.</a>
      </StoreInfo>
      <ListSmallImages />
    </PatternDetailWrapper>
  }
  return <PatternDetailWrapper>
    <MainImage />
    <RightInfo />
    <StoreInfo>
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
        <Price>{price}</Price>
        <div className={styles.triangleLeft}></div>
        <div className={styles.triangleLeft}></div>
      </div>
    </StoreInfo>
    <ListSmallImages />
  </PatternDetailWrapper>
}
export default PatternDetail;