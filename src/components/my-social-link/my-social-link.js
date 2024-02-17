import React from 'react';
import ContentWithTitle from '../content-with-title/content-with-title';
import styles from './MySocialLink.module.scss';

const MySocialLink = ({ isMobile }) => {
  return <ContentWithTitle
    title="Tài khoản cá nhân"
    content={
      <div className={styles.items}>
        <a rel="noreferrer" target="_blank" href="https://www.facebook.com/Cheryx.KnitADream"><img alt="Facebook" width={isMobile ? '10px' : '15px'} height={isMobile ? '21px' : '30px'} className={styles.fb} src="/images/fb1.png" /></a>
        <a rel="noreferrer" target="_blank" href="https://www.ravelry.com/stores/cheryx"><img alt="Ravelry" width={isMobile ? '87px' : '154px'} height={isMobile ? '27px' : '49px'} className={styles.ravelry} src="/images/rv.svg" /></a>
        <a rel="noreferrer" target="_blank" href="https://www.instagram.com/cheryx.knitadream"><img alt="Instagram" width={isMobile ? '21px' : '32px'} height={isMobile ? '21px' : '34px'} className={styles.in} src="/images/in1.png" /></a>
        <a rel="noreferrer" target="_blank" href="https://www.youtube.com/channel/UCf0jCxiSGh_pBExFN3k1CIA"><img alt="Youtube" className={styles.yo} width={isMobile ? '23px' : '44px'} height={isMobile ? '30px' : '34px'} src="/images/yo1.png" /></a>
        <a rel="noreferrer" target="_blank" href="https://www.pinterest.com/Cheryx_knit_a_dream"><img alt="Pinterest" width={isMobile ? '22px' : '34px'} height={isMobile ? '22px' : '34px'} className={styles.pi} src="/images/pi.png" /></a>
      </div>
    }
  />
}
export default MySocialLink;