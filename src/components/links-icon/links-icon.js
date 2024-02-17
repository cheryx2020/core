import React from 'react';
const LinksIcon = ({url, iconStyle = {}, imgSrc = '/images/icons-menu-mb.png'}, wrapperStyle = {}) => {
  const baseIconStyle = {
    backgroundImage : `url('${imgSrc}')`,
    backgroundRepeat: 'no-repeat'
  };
  return <a style={wrapperStyle} target="_blank" href={url}><div style={{...baseIconStyle,...iconStyle}}></div></a>
}
export default LinksIcon;
