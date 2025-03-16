import React, { useEffect, useState } from 'react';
import styles from './styles/Home.module.scss';
import MySocialLink from './my-social-link/my-social-link';
import ImageUploadable from './image-uploadable/image-uploadable';
import { APIService } from '@cheryx2020/api-service';

const isAllowShowBanner = () => {
  // return false;
  let result = true;
  try {
    const pathname = window?.location?.pathname;
    const listIgnorepage = ['/linktree'];
    if (listIgnorepage.includes(pathname)) {
      result = false;
    }
  } catch (error) {
    console.log(error);
  }
  return result;
}
const isValidTimeShowBanner = () => {
  const closedTime = localStorage.getItem('closedBannerAt'), currentTime = new Date().getTime();
  const timeoutMin = 1 * 60 * 24;
  return !closedTime || (closedTime && currentTime - parseInt(closedTime) > timeoutMin * 60 * 1000)
}

const Footer = ({ isMobile, theme, title, socialTitle = "Tài khoản cá nhân", image = "https://gocnhacolen.com/images/footer.webp", hasBanner, className, isAdmin }) => {
  const [isShowBanner, setIsShowBanner] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [linkBanner, setLinkBanner] = useState('');
  const [imageBanner, setImageBanner] = useState('');
  useEffect(() => {
    if (hasBanner) {
      APIService.get('banner').then(res => {
        if (res && res.data && res.data && res.data.data) {
          const { fromDate, toDate, image, link } = res.data.data;
          if (isAllowShowBanner()) {
            if (isValidTimeShowBanner() && link && image && new Date(fromDate).getTime() < new Date().getTime() && new Date(toDate).getTime() > new Date().getTime()) {
              setIsShowBanner('true');
              var img = new Image();
              img.onload = function () {
                setIsImageLoaded(true)
              }
              img.src = image;
              setLinkBanner(link);
              setImageBanner(image);
            }
          } else {
            setIsShowBanner(false);
            localStorage.setItem('closedBannerAt', new Date().getTime());
          }
        }
      }).catch(e => {
        console.log(e);
      });
    }
  }, []);
  const onClickClose = () => {
    setIsShowBanner(false);
    localStorage.setItem('closedBannerAt', new Date().getTime());
  }
  return <footer className={`${styles.footer} ${className}`}>
    {hasBanner ?
      <div className={`${styles.banner} ${isShowBanner ? styles.show : styles.hide}`}>
        <div className={styles.bannerImgWrapper}>
          {isImageLoaded && <div className={styles.closeBtn} onClick={onClickClose}>x</div>}
          {linkBanner && <a onClick={() => {
            setIsShowBanner(false);
            localStorage.setItem('closedBannerAt', new Date().getTime());
          }} target='_blank' href={linkBanner}><img alt={title} src={imageBanner} /></a>}
        </div>
      </div> : null}
    <MySocialLink theme={theme} title={socialTitle} isMobile={isMobile} />
    <div className={styles.imageFooter}>
      <ImageUploadable isAdmin={isAdmin} isEdit={isAdmin} wrapperStyle={{ width: "100%", height: "100%", aspectRatio: "unset" }} alt={title} src={image} />
      <div className={styles.dcma}><a href="//www.dmca.com/Protection/Status.aspx?ID=dbcbbc0c-5007-4d0c-aeff-b4ed3e017556" title="DMCA.com Protection Status" className="dmca-badge"> <img src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=dbcbbc0c-5007-4d0c-aeff-b4ed3e017556" alt="DMCA.com Protection Status" /></a>  <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"> </script></div>
    </div>
  </footer>
}
export default Footer;