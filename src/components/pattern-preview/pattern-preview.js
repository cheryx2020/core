import React, { useEffect, useState } from 'react';
import styles from './PatternPreview.module.scss';
import { APIService, setShowLoading } from '@cheryx2020/api-service';
import ImageUploadable from '../image-uploadable/image-uploadable';
const FormInput = ({ label = "Label", required = false, name = "name", type = "text", placeholder = "Text" }) => {
  return <div className={styles.formInput}>
    <div for={name} className={styles.label}>{label}</div>
    <input required={required ? "true" : ""} type={type} name={name} placeholder={placeholder} />
  </div>
}
const PatternPreview = ({ useDispatch = () => {}, isAdmin, patternId, isSubscribe, onChange = () => { }, index, imageUrl: _imageUrl, previewUrl: _previewUrl, buttonText = "Look inside the pattern", message = 'You can preview 3 pages of the knitting pattern!' }) => {
  const [imageUrl, setImageUrl] = useState(_imageUrl);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const [previewUrl, setPreviewUrl] = useState(_previewUrl);
  const smallTitle = `${styles.title} ${styles.small}`;
  const onChangeBigImage = ({ imgFile }) => {
    onChange(imgFile, index, 'imageUrl');
  }
  const onClickLink = (e, key) => {
    if (isAdmin) {
      e.preventDefault();
      let value = '';
      while (value == '') {
        value = prompt(`Nhập đường dẫn file pdf`, previewUrl);
      }
      if (value === null) {
        // User cancel
        return;
      }
      onChange(value, index, key)
    } else {
      // Track
      // gtag.event({ action: "pattern_store_click", category: "engagement", label: "pattern_store_click", value: `${key} - ${name}` })
    }
  }
  useEffect(() => {
    setImageUrl(_imageUrl);
    setPreviewUrl(_previewUrl);
  }, [_imageUrl, _previewUrl]);
  return <div className={`${styles.wrapper}${isSubscribe ? ` ${styles.subscribe}` : ''}`}>
    <div className={styles.image}>
      <ImageUploadable width={'100%'} height={'100%'} wrapperStyle={{ width: '100%', height: '100%', minWidth: '100%' }} onChangeImage={onChangeBigImage} isAdmin={isAdmin} isEdit={isAdmin} src={imageUrl} />
    </div>
    <div className={styles.info}>
      {isSubscribe ? <div className={styles.wrapperDownloadPdf}>
        {isSubmitted ? <>
          <div className={smallTitle}>Success!</div>
          <div className={smallTitle}>Check your email in a few minutes!</div>
          <div className={styles.textEmailSubscription}>
            To find my letter, simply search for a letter from Cheryx.
            <strong> Also, double-check your junk/spam folder</strong>. Be sure to mark it as 'not spam' so you won't miss any important updates from me in the future.
          </div>
          <div className={styles.textEmailSubscription}>
            If you can't seem to locate the email, please send me a message and I'll be happy to help you!
          </div>
        </> : <><div className={styles.title}>Download PDF Pattern</div>
          <div className={styles.textEmailSubscription}>
            This free pattern will be sent to the provided email. Please make sure you write your email address correctly.
          </div>
          <form method='POST' onSubmit={(e) => {
            e.preventDefault()
            const email = e?.target?.elements?.email?.value;
            const name = e?.target?.elements?.name?.value;
            setShowLoading(dispatch, true);
            APIService.post("email-subscriptions/subscribe", { email, name, type: "download", id: patternId }).then(res => {
              console.log(res);
              setIsSubmitted(true);
            }).catch(err => {
              console.log(err);
            }).finally(() => {
              setShowLoading(dispatch, false);
            });
          }} >
            <FormInput required type="email" name="email" placeholder="" label="Email address" />
            <FormInput type="text" name="name" placeholder="" label="First name" />
            <input className={styles.submitSuscribe} type="submit" value="Get the pattern" />
          </form></>}
      </div> : <>
        <a rel="noreferrer" href={previewUrl} onClick={e => onClickLink(e, 'previewUrl')} target="_blank" className={styles.previewUrl}>{buttonText}</a>
        <div contentEditable={isAdmin ? "true" : "false"} onBlur={() => { }}>{message}</div>
      </>}
    </div>
  </div>
}
export default PatternPreview;