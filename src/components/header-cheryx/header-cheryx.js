import React from 'react';
import styles from './HeaderCherxy.module.scss';
import LeftSideMenu from '../left-side-menu/left-side-menu';

const links = [{
  url: 'https://www.facebook.com/Cheryx.KnitADream',
  iconStyle: {
    width: 17,
    height: 41,
    backgroundPosition: '0 0px'
  }
}, {
  url: 'https://www.ravelry.com/stores/cheryx',
  iconStyle: {
    width: 40,
    height: 40,
    backgroundPosition: '-36px 0px'
  }
}, {
  url: 'https://www.instagram.com/cheryx.knitadream',
  iconStyle: {
    width: 40,
    height: 41,
    backgroundPosition: '-94px 0'
  }
}, {
  url: 'https://www.youtube.com/channel/UCf0jCxiSGh_pBExFN3k1CIA',
  iconStyle: {
    width: 57,
    height: 40,
    backgroundPosition: '-151px -1px'
  }
}, {
  url: 'https://www.pinterest.com/Cheryx_knit_a_dream',
  iconStyle: {
    width: 39,
    height: 40,
    backgroundPosition: '-226px -1px'
  }
}
];

const HeaderCherxy = ({ isAdmin, isEdit, url, showNavigator = true, Link, mainImageUrl = "", MenuData = [{
  text: 'Trang chủ',
  url: '/'
}, {
  text: 'Lớp đan thú',
  url: '/lop-dan-len'
}, {
  text: 'Mẫu đan miễn phí',
  url: '/mau-dan-len-mien-phi'
}, {
  text: 'Tự học đan len cơ bản',
  url: `/tu-hoc-dan-co-ban`
}, {
  text: 'Mẹo đan móc lượm lặt',
  url: `/${process?.env?.NEXT_PUBLIC_PRE_TIP}`
}], onMenuDataChange = () => { }, styles: wrapperStyle = {} }) => {
  const _styles = {
    ...wrapperStyle
  }
  const cheryxStyle = {};
  if (mainImageUrl) {
    cheryxStyle.backgroundImage = `url("${mainImageUrl}")`;
  }
  const handleMenuTextChange = (e, index) => {
    const newText = e.target.innerText;
    const updatedMenuData = MenuData.map((item, i) => {
      if (i === index) {
        return { ...item, text: newText };
      }
      return item;
    });
    onMenuDataChange(updatedMenuData);
  };
  return <header style={{ width: '100%' }}>
    <div className={styles.header}>
      <div className={styles.leftSide}>
        <a rel="noreferrer" target="_blank" href="https://www.facebook.com/Cheryx.KnitADream"><img alt="Facebook" style={{ width: 11, height: 18 }} src="/images/fb.svg"></img></a>
        <a rel="noreferrer" target="_blank" href="https://www.ravelry.com/stores/cheryx"><img alt="Ravelry" style={{ width: 20, height: 20 }} src="/images/rv.svg"></img></a>
        <a rel="noreferrer" target="_blank" href="https://www.instagram.com/cheryx.knitadream"><img alt="Instagram" style={{ width: 20, height: 20 }} src="/images/in.svg"></img></a>
        <a rel="noreferrer" target="_blank" href="https://www.youtube.com/channel/UCf0jCxiSGh_pBExFN3k1CIA"><img alt="Youtube" style={{ width: 26, height: 20 }} src="/images/yo.svg"></img></a>
        <a rel="noreferrer" target="_blank" href="https://www.pinterest.com/Cheryx_knit_a_dream"><img alt="Pinterest" style={{ width: 20, height: 20 }} src="/images/pi.svg"></img></a>
      </div>
      <LeftSideMenu Link={Link} links={links} menuData={MenuData} />
      <div className={styles.rightSide}>
        {/* <a rel="noreferrer" className={styles.search}><img style={{width: 20, height: 20}} src="/images/search.svg"></img></a> 
        <a rel="noreferrer"><img style={{width: 12, height: 16}} src="/images/cart.png"></img></a> */}
        <Link href={isAdmin ? '/dashboard' : '/login'}><a rel="noreferrer"><img style={{ width: 12, height: 16 }} alt="user" src="/images/user.png"></img></a></Link>
      </div>
    </div>
    <div className={styles.logo}>
      <Link href={'/'}><a><div className={styles.cheryx} style={cheryxStyle}></div></a></Link>
    </div>
    {showNavigator && <nav className={styles.nav} style={{ ..._styles }}>
      {MenuData.map((item, index) => isEdit ? <a
        key={index}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={(e) => handleMenuTextChange(e, index)}
        className={`${styles.editableLink} ${url === item.url ? styles.selectedLink : ''}`}
      >
        {item.text}
      </a> : <Link key={index} href={item.url}><a rel="noreferrer" className={url === item.url ? styles.selectedLink : ''}>{item.text}</a></Link>)}
    </nav>}
  </header>
}
export default HeaderCherxy;