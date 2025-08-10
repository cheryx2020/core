import React, { useEffect, useRef, useState } from 'react';
import ImageUploadable from '../image-uploadable/image-uploadable';
import gtag from '../../../gtag';
import styles from './PatternDetail.module.scss';

// The contact email is now a constant
const contactEmail = 'vungoc101230@gmail.com';

// --- Helper Components for the Popup ---

// Reusable component for the inline email link and copy button
const EmailWithCopy = ({ onCopy, isCopied }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#f0f0f0', padding: '2px 8px', borderRadius: '6px' }}>
    <a href={`mailto:${contactEmail}`} style={{ fontWeight: 'bold', textDecoration: 'underline', color: '#0056b3' }}>
      {contactEmail}
    </a>
    <button
      onClick={onCopy}
      title="Copy email address"
      style={{
        background: 'none',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '2px 6px',
        fontSize: '12px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px'
      }}
    >
      {isCopied ? (
        'Copied!'
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
        </svg>
      )}
    </button>
  </span>
);

// The translations object now contains functions that accept the EmailComponent
const translations = {
  en: ({ EmailComponent }) => (
    <>
      <p>Can’t buy on Ravelry or Lovecrafts?</p>
      <p>No worries! Just email me at {EmailComponent} and let me know which patterns you’d like to buy.</p>
      <p>I’ll send you my PayPal info so you can make the payment directly and send me the payment receipt.</p>
      <p>Once I receive it, I’ll email you the PDF right away.</p>
    </>
  ),
  es: ({ EmailComponent }) => (
    <>
      <p>¿No puedes comprar en Ravelry o Lovecrafts?</p>
      <p>¡No te preocupes! Simplemente envíame un correo a {EmailComponent} y dime qué patrones te gustaría comprar.</p>
      <p>Te enviaré mi información de PayPal para que puedas realizar el pago directamente y enviarme el recibo de pago.</p>
      <p>Una vez que lo reciba, te enviaré el PDF de inmediato.</p>
    </>
  ),
  fr: ({ EmailComponent }) => (
    <>
      <p>Vous ne pouvez pas acheter sur Ravelry ou Lovecrafts ?</p>
      <p>Pas de souci ! Envoyez-moi simplement un e-mail à {EmailComponent} en m'indiquant les patrons que vous souhaitez acheter.</p>
      <p>Je vous enverrai mes informations PayPal pour que vous puissiez effectuer le paiement directement et m'envoyer le reçu.</p>
      <p>Une fois reçu, je vous enverrai le PDF immédiatement par e-mail.</p>
    </>
  ),
  de: ({ EmailComponent }) => (
    <>
      <p>Sie können nicht auf Ravelry oder Lovecrafts kaufen?</p>
      <p>Keine Sorge! Senden Sie mir einfach eine E-Mail an {EmailComponent} und teilen Sie mir mit, welche Anleitungen Sie kaufen möchten.</p>
      <p>Ich sende Ihnen meine PayPal-Informationen, damit Sie die Zahlung direkt vornehmen und mir den Zahlungsbeleg senden können.</p>
      <p>Sobald ich ihn erhalten habe, sende ich Ihnen das PDF umgehend per E-Mail zu.</p>
    </>
  ),
  vi: ({ EmailComponent }) => (
    <>
      <p>Bạn không thể mua trên Ravelry hoặc Lovecrafts?</p>
      <p>Đừng lo! Chỉ cần gửi email cho tôi tại {EmailComponent} và cho tôi biết bạn muốn mua mẫu nào.</p>
      <p>Tôi sẽ gửi cho bạn thông tin PayPal của tôi để bạn có thể thanh toán trực tiếp và gửi cho tôi biên lai thanh toán.</p>
      <p>Khi nhận được, tôi sẽ gửi cho bạn tệp PDF ngay lập tức.</p>
    </>
  ),
  ko: ({ EmailComponent }) => (
    <>
      <p>Ravelry나 Lovecrafts에서 구매할 수 없나요?</p>
      <p>걱정 마세요! {EmailComponent}(으)로 구매하고 싶은 패턴을 알려주는 이메일을 보내주세요.</p>
      <p>직접 결제하실 수 있도록 제 PayPal 정보를 보내드리고 결제 영수증을 보내주시면 됩니다.</p>
      <p>영수증을 받으면 바로 PDF를 이메일로 보내드리겠습니다.</p>
    </>
  ),
  ja: ({ EmailComponent }) => (
    <>
      <p>RavelryやLovecraftsで購入できませんか？</p>
      <p>ご心配なく！ {EmailComponent} にメールで、どのパターンを購入したいかお知らせください。</p>
      <p>直接お支払いいただけるように、私のPayPal情報をお送りしますので、支払い領収書を私に送ってください。</p>
      <p>受け取り次第、すぐにPDFをメールでお送りします。</p>
    </>
  ),
  zh: ({ EmailComponent }) => (
    <>
      <p>无法在 Ravelry 或 Lovecrafts 上购买？</p>
      <p>别担心！只需发送电子邮件至 {EmailComponent}，告诉我您想购买哪些图样。</p>
      <p>我会将我的 PayPal 信息发送给您，以便您直接付款，并将付款收据发送给我。</p>
      <p>收到后，我会立即通过电子邮件将 PDF 发送给您。</p>
    </>
  ),
  ru: ({ EmailComponent }) => (
    <>
      <p>Не можете купить на Ravelry или Lovecrafts?</p>
      <p>Без проблем! Просто напишите мне на {EmailComponent} и сообщите, какие выкройки вы хотите купить.</p>
      <p>Я пришлю вам свою информацию PayPal, чтобы вы могли произвести оплату напрямую и прислать мне квитанцию об оплате.</p>
      <p>Как только я ее получу, я сразу же вышлю вам PDF по электронной почте.</p>
    </>
  )
};

const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
];

const PatternDetail = ({ name: _name, price: _price, discount, ravelryUrl: _ravelryUrl = 'https://www.messenger.com/t/100004957155465', lovecraftsUrl: _lovecraftsUrl, bigImageUrl: _bigImageUrl, imageList: _imageList, isAdmin, onChange = () => { }, index, noImageUrl = '/images/no-image.png' }) => {
  const [imageList, setImageList] = useState(_imageList ? _imageList : [noImageUrl]);
  const [name, setName] = useState("Pattern name");
  const [bigImageUrl, setBigImageUrl] = useState('');
  const [price, setPrice] = useState(_price);
  const [ravelryUrl, setRavelryUrl] = useState(_ravelryUrl || 'https://www.messenger.com/t/100004957155465');
  const [lovecraftsUrl, setLovecraftsUrl] = useState(_lovecraftsUrl);
  const [isShowPayPal, setIsShowPayPal] = useState(false);
  const [isOtherPopupVisible, setIsOtherPopupVisible] = useState(false);
  // State now holds the translation function, not the rendered text
  const [popupTextFn, setPopupTextFn] = useState(() => translations.en);
  const [currentLangCode, setCurrentLangCode] = useState('en');
  const [isEmailCopied, setIsEmailCopied] = useState(false);
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
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01'
              }
            }]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            const { id } = details;
            window.open(`https://api.cheryx.com/verify-order?order=${id}`);
          });
        }
      }).render('#paypal-button-container');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      const userLang = navigator.language || navigator.userLanguage;
      const baseLang = userLang.split('-')[0];

      const initialLang = supportedLanguages.find(l => l.code === userLang)
        || supportedLanguages.find(l => l.code === baseLang)
        || supportedLanguages.find(l => l.code === 'en');

      if (initialLang) {
        setCurrentLangCode(initialLang.code);
        setPopupTextFn(() => translations[initialLang.code]);
      }
    }
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLangCode(langCode);
    setPopupTextFn(() => translations[langCode] || translations.en);
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(contactEmail).then(() => {
      setIsEmailCopied(true);
      setTimeout(() => setIsEmailCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  };

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

  const StoreInfo = ({ children, style }) => {
    return <div className={styles.storeInfo} style={style ?? {}}>{children}</div>
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
      <StoreInfo style={{ paddingTop: 0 }}>
        {!isShowPayPal && <img alt='buy pattern here' src="/images/pattern-store.png"></img>}
        <div className={`${styles.payPalWrapper}${isShowPayPal ? ` ${styles.show}` : ''}`}>
          <div className={styles.closeLink} onClick={() => { lockScroll(false); setIsShowPayPal(false); }}>Close</div>
          <div className={styles.payPal} id="paypal-button-container"></div>
        </div>
        <a rel="noreferrer" style={{ position: "relative" }} href={ravelryUrl} onClick={e => onClickLink(e, 'ravelryUrl')} target="_blank" className={`${styles.linkStore} ${styles.mb11}`}>Ravelry
          {discount ? <div className={styles.discount}>{`-${discount}%`}</div> : null}
        </a>
        <a rel="noreferrer" href={lovecraftsUrl} onClick={e => onClickLink(e, 'lovecraftsUrl')} target="_blank" className={`${styles.linkStore} ${styles.mb11}`}>Lovecrafts</a>
        <div
          onClick={() => {
            setIsOtherPopupVisible(true);
            lockScroll(true);
          }}
          className={styles.linkStore}
          style={{ cursor: 'pointer' }}
        >
          Other
        </div>
      </StoreInfo>
      <ListSmallImages />
      {/* Conditionally rendered popup */}
      {isOtherPopupVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <div
              className={styles.popupClose}
              onClick={() => {
                setIsOtherPopupVisible(false);
                lockScroll(false);
              }}
            >
              ×
            </div>
            <div className={styles.languageSelector}>
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  className={`${styles.flagButton} ${currentLangCode === lang.code ? styles.active : ''}`}
                  title={lang.name}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.flag}
                </button>
              ))}
            </div>
            <div className={styles.emailMe}>
              {/* Render the text by calling the translation function */}
              {popupTextFn({ EmailComponent: <EmailWithCopy onCopy={handleCopyEmail} isCopied={isEmailCopied} /> })}
            </div>

            <a
              href={`mailto:${contactEmail}`}
              className={styles.sendEmailButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V6.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 6.383v4.722Z" />
              </svg>
              Send Email
            </a>
          </div>
        </div>
      )}
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