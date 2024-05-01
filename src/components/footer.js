import React from 'react';
import styles from './styles/Home.module.scss';
import MySocialLink from './my-social-link/my-social-link';

const Footer = ({isMobile, className}) => {
    return <footer className={`${styles.footer} ${className}`}>
    <MySocialLink isMobile={isMobile}/>
    <div className={styles.imageFooter}>
      <img width='100%' height='100%' alt={process?.env?.NEXT_PUBLIC_SEO_mainTitle} src={`/images/footer.webp`}/>
      <div className={styles.dcma}><a href="//www.dmca.com/Protection/Status.aspx?ID=dbcbbc0c-5007-4d0c-aeff-b4ed3e017556" title="DMCA.com Protection Status" className="dmca-badge"> <img src ="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=dbcbbc0c-5007-4d0c-aeff-b4ed3e017556"  alt="DMCA.com Protection Status" /></a>  <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"> </script></div>
    </div>
  </footer>
}
export default Footer;