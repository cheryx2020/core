import React, { useState, useRef, useEffect, Component } from 'react';
import { readFile, isBigFile } from '@cheryx2020/utils';
import PropTypes from 'prop-types';
import { ImageUploadable as ImageUploadable$1, gtag as gtag$1 } from '@cheryx2020/core';

var styles$6 = {"wrapper":"Sublink-module_wrapper__v-n3q","spliter":"Sublink-module_spliter__j4x-a","wrapperLink":"Sublink-module_wrapperLink__Lozil"};

const SubLink = ({
  data,
  wrapperStyle = {},
  className = '',
  renderItem = () => {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles$6.wrapper,
    style: wrapperStyle
  }, Array.isArray(data) && data.length > 0 && data.map((item, i) => {
    return /*#__PURE__*/React.createElement("div", {
      className: `${styles$6.wrapperLink} ${className}`,
      key: i
    }, renderItem(item), i < data.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: styles$6.spliter
    }, '>'));
  }));
};

var styles$5 = {"image":"ImageUploadable-module_image__B0Aq1","imageMenu":"ImageUploadable-module_imageMenu__KVFuF","resizer":"ImageUploadable-module_resizer__ccKdB","vertical":"ImageUploadable-module_vertical__cn5LW","horizontal":"ImageUploadable-module_horizontal__e9JwU"};

const ImageUploadable = ({
  width = 500,
  height = 333,
  src,
  onChangeImage = () => {},
  isAdmin,
  isAddNew,
  isEdit,
  wrapperStyle = {},
  className = '',
  onChangeStyle = () => {},
  resizeable = false
}) => {
  let defaultWrapperStyle = {
    width: isAddNew ? '100%' : {
      width
    },
    height: isAddNew ? '73%' : 'initial'
  };
  if (wrapperStyle.width) {
    width = wrapperStyle.width;
  }
  if (wrapperStyle.height) {
    height = wrapperStyle.height;
  }
  const [imgSrc, setImgSrc] = useState('');
  const imageWap = useRef(null);
  const image = useRef(null);
  useEffect(() => {
    if (typeof src === 'object' && src.name) {
      readFile(src).then(res => {
        setImgSrc(res);
      });
    } else {
      setImgSrc(src);
    }
  }, [src]);
  const onChange = async e => {
    // Check file size
    if (isBigFile(e?.target?.files[0])) {
      alert('Kích thước file không được vượt quá 500KB');
      return;
    }
    const {
      imgSrc,
      imgFile
    } = await new Promise(resolve => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve({
          imgSrc: reader.result,
          imgFile: e.target.files[0]
        });
      }, false);
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    });
    setImgSrc(imgSrc);
    onChangeImage({
      imgSrc,
      imgFile
    });
    return;
  };
  let startX, startY, startWidth, startHeight;
  const initDrag = e => {
    e.stopPropagation();
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(imageWap.current).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(imageWap.current).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  };
  function doDrag(e) {
    imageWap.current.style.width = startWidth + e.clientX - startX + 'px';
    imageWap.current.style.height = startHeight + e.clientY - startY + 'px';
    image.current.style.width = startWidth + e.clientX - startX + 'px';
    image.current.style.height = startHeight + e.clientY - startY + 'px';
  }
  function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
    onChangeStyle({
      width: imageWap.current.style.width,
      height: imageWap.current.style.height
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: imageWap,
    className: `${styles$5.image} ${className}`,
    style: {
      ...defaultWrapperStyle,
      ...wrapperStyle
    }
  }, isAdmin && isEdit && /*#__PURE__*/React.createElement("div", {
    className: styles$5.imageMenu,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("div", null, "Choose Image"), /*#__PURE__*/React.createElement("input", {
    accept: "image/png, image/jpeg, image/svg+xml",
    hidden: true,
    type: "file",
    onChange: onChange
  }))), isEdit ? /*#__PURE__*/React.createElement("img", {
    ref: image,
    width: width,
    height: height,
    src: imgSrc != '' ? imgSrc : src,
    style: {
      width,
      height
    }
  }) : /*#__PURE__*/React.createElement("img", {
    alt: process.env.NEXT_PUBLIC_SEO_mainTitle,
    width: width,
    height: height,
    src: src
  }), isEdit && resizeable && /*#__PURE__*/React.createElement("div", {
    onDrag: e => {
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseDown: initDrag,
    className: styles$5.resizer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$5.vertical
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$5.horizontal
  })));
};

var styles$4 = {"editImageBtn":"ImageUpload-module_editImageBtn__WJjSq","menuImage":"ImageUpload-module_menuImage__Qkkfq","uploadButton":"ImageUpload-module_uploadButton__QCNEB","textarea":"ImageUpload-module_textarea__pbgpO","imgWrapper":"ImageUpload-module_imgWrapper__y6fHe","videoMenu":"ImageUpload-module_videoMenu__pMOzt","deleteButton":"ImageUpload-module_deleteButton__K4dVX"};

const ImageUpload = ({
  url,
  onChange = () => {},
  caption,
  onDragStart = () => {},
  onResize = () => {},
  width,
  height
}) => {
  const [showMenuImage, setShowMenuImage] = useState(false);
  const onMouseOut = e => {
    onResize({
      width: parseInt(e.target.style.width) || 0,
      height: parseInt(e.target.style.height) || 0
    });
  };
  const styleImage = {
    backgroundImage: `url('${url}')`
  };
  if (width) {
    styleImage.width = width;
  }
  if (height) {
    styleImage.height = height;
  }
  return /*#__PURE__*/React.createElement("div", {
    onDragStart: onDragStart,
    draggable: "true",
    className: styles$4.imgWrapper,
    style: {
      position: 'relative'
    }
  }, showMenuImage && /*#__PURE__*/React.createElement("div", {
    className: styles$4.menuImage
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$4.deleteButton,
    onClick: () => setShowMenuImage(false)
  }, "x"), /*#__PURE__*/React.createElement("label", {
    className: styles$4.uploadButton
  }, /*#__PURE__*/React.createElement("span", null, "Upload Image"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    onChange: e => {
      setShowMenuImage(false);
      onChange(e);
    }
  }))), !showMenuImage && /*#__PURE__*/React.createElement("div", {
    className: styles$4.editImageBtn,
    onClick: () => setShowMenuImage(true)
  }, "Edit"), /*#__PURE__*/React.createElement("textarea", {
    className: styles$4.textarea,
    onMouseOut: onMouseOut,
    disabled: true,
    style: {
      ...styleImage
    }
  }), caption);
};

const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);
  return /*#__PURE__*/React.createElement("ins", {
    className: "adsbygoogle adbanner-customize",
    style: {
      display: "block"
    },
    "data-ad-layout": "in-article",
    "data-ad-format": "fluid",
    "data-ad-client": "ca-pub-4179656549806780",
    "data-ad-slot": "9675079770"
  });
};

const PostVideo = ({
  text,
  url = 'vTJdVE_gjI0',
  onChange = () => {},
  onChangeText = () => {},
  onDragStart = () => {}
}) => {
  const [showMenuVideo, setShowMenuVideo] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onDragStart: onDragStart,
    draggable: "true",
    className: styles$4.imgWrapper
  }, showMenuVideo && /*#__PURE__*/React.createElement("div", {
    className: styles$4.videoMenu
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$4.deleteButton,
    onClick: () => setShowMenuVideo(false)
  }, "x"), /*#__PURE__*/React.createElement("label", null, "Video Id:"), /*#__PURE__*/React.createElement("input", {
    value: url,
    onChange: e => onChange(e)
  })), /*#__PURE__*/React.createElement("iframe", {
    title: text,
    width: "560",
    height: "315",
    src: `https://www.youtube.com/embed/${url}`,
    frameBorder: 0,
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true
  }), /*#__PURE__*/React.createElement("figcaption", {
    suppressContentEditableWarning: true,
    contentEditable: true,
    onBlur: onChangeText,
    className: styles$4.imageDescription,
    style: {
      minWidth: 100
    }
  }, text), !showMenuVideo && /*#__PURE__*/React.createElement("div", {
    className: styles$4.editImageBtn,
    onClick: () => setShowMenuVideo(true)
  }, "Edit"));
};

class YouTubeSubscribe extends Component {
  static propTypes = {
    channelName: PropTypes.string,
    channelid: PropTypes.string.isRequired,
    theme: PropTypes.string,
    layout: PropTypes.string,
    count: PropTypes.string
  };
  static defaultProps = {
    channelName: "",
    channelid: "UCaYhcUwRBNscFNUKTjgPFiA",
    theme: "full",
    layout: "default",
    count: "default"
  };

  /**
   *  React.createRef to attach script after mount
   *  Ref) https://reactjs.org/docs/refs-and-the-dom.html
   */

  constructor(props) {
    super(props);
    this.youtubeSubscribeNode = /*#__PURE__*/React.createRef();

    // To render components economically w/o repetition
    this.state = {
      initialized: false
    };
  }
  initialized() {
    this.setState({
      initialized: true
    });
  }

  /**
   * 1. Script for API doesn't work in index.html.
   * 2. So You have to make it after components render.
   * 3. Make a script with JavaScript method to work.
   * 4. It is a little slow to show component at first.
   * 5. YouTube API gives you channelId instead channelName
   *    So You don't have to think about channelName when you
   *    need its API.
   */

  componentDidMount() {
    if (this.state.initialized) {
      return;
    }

    // Make <script src="https://apis.google.com/js/platform.js" ></script>
    const youtubescript = document.createElement("script");
    youtubescript.src = "https://apis.google.com/js/platform.js";
    this.youtubeSubscribeNode.current.parentNode.appendChild(youtubescript);
    this.initialized();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.channelName === nextProps.channelName) {
  //     return false;
  //   }

  //   if (this.props.channelid === nextProps.channelid) {
  //     return false;
  //   }

  //   return true;
  // }

  render() {
    const {
      theme,
      layout,
      count,
      channelName,
      channelid
    } = this.props;
    return /*#__PURE__*/React.createElement("section", {
      className: "youtubeSubscribe"
    }, /*#__PURE__*/React.createElement("div", {
      ref: this.youtubeSubscribeNode,
      className: "g-ytsubscribe",
      "data-theme": theme,
      "data-layout": layout,
      "data-count": count,
      "data-channel": channelName,
      "data-channelid": channelid
    }));
  }
}

var styles$3 = {"wrapper":"PatternPreview-module_wrapper__rtoPF","image":"PatternPreview-module_image__jMSHM","info":"PatternPreview-module_info__pn5aE","previewUrl":"PatternPreview-module_previewUrl__ulKmu"};

const PatternPreview = ({
  isAdmin,
  onChange = () => {},
  index,
  imageUrl: _imageUrl,
  previewUrl: _previewUrl,
  buttonText = "Look inside the pattern",
  message = 'You can preview 3 pages of the knitting pattern!'
}) => {
  const [imageUrl, setImageUrl] = useState(_imageUrl);
  const [previewUrl, setPreviewUrl] = useState(_previewUrl);
  const onChangeBigImage = ({
    imgFile
  }) => {
    onChange(imgFile, index, 'imageUrl');
  };
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
      onChange(value, index, key);
    }
  };
  useEffect(() => {
    setImageUrl(_imageUrl);
    setPreviewUrl(_previewUrl);
  }, [_imageUrl, _previewUrl]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$3.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.image
  }, /*#__PURE__*/React.createElement(ImageUploadable$1, {
    width: '100%',
    height: '100%',
    wrapperStyle: {
      width: '100%',
      height: '100%',
      minWidth: '100%'
    },
    onChangeImage: onChangeBigImage,
    isAdmin: isAdmin,
    isEdit: isAdmin,
    src: imageUrl
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$3.info
  }, /*#__PURE__*/React.createElement("a", {
    rel: "noreferrer",
    href: previewUrl,
    onClick: e => onClickLink(e, 'previewUrl'),
    target: "_blank",
    className: styles$3.previewUrl
  }, buttonText), /*#__PURE__*/React.createElement("div", {
    contentEditable: isAdmin ? "true" : "false",
    onBlur: () => {}
  }, message)));
};

var styles$2 = {"adminMenuBtn":"MenuAddComponentPost-module_adminMenuBtn__GaIEv","adminMenu":"MenuAddComponentPost-module_adminMenu__Yw2pt","hidden":"MenuAddComponentPost-module_hidden__HLj-8","menuItem":"MenuAddComponentPost-module_menuItem__gHxYw","subMenu":"MenuAddComponentPost-module_subMenu__oZH07"};

const POST_ITEM_TYPE = {
  TITLE: 'title',
  BIG_HEADER: 'big-header',
  MEDIUM_HEADER: 'medium-header',
  SMALL_HEADER: 'small-header',
  PARAGRAPH: 'paragraph',
  RELATED_TOPIC: 'related-topic',
  SUBCRIBE_ME: 'subcribe-me',
  IMAGE: 'image',
  BUY_ME_A_COFFEE: 'buy-me-a-coffee',
  VIDEO: 'video',
  ADS: 'ads',
  PATTERN: 'pattern',
  PATTERN_PREVIEW: 'pattern_preview',
  GROUP: 'group'
};
const IMAGE_SUBMENU = {
  ONE_IMAGE: 'image',
  TWO_IMAGE: 'two_image',
  THREE_IMAGE: 'three_image'
};
const POST_ITEM_TYPE_SUBMENU = {
  IMAGE: [IMAGE_SUBMENU.ONE_IMAGE, IMAGE_SUBMENU.TWO_IMAGE, IMAGE_SUBMENU.THREE_IMAGE]
};
const MenuAddComponentPost = ({
  onClickMenuItem = () => {},
  btnClass = '',
  menuItems = []
}) => {
  const [hoverItem, setHoverItem] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const onMenuMouseOver = item => {
    setHoverItem(item);
  };
  const hasSubMenu = item => {
    return Array.isArray(POST_ITEM_TYPE_SUBMENU[item]);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `${styles$2.adminMenuBtn}${btnClass ? ' ' + btnClass : ''}`,
    onClick: () => {
      setShowMenu(!showMenu);
    }
  }, showMenu ? 'X' : 'Add', /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$2.adminMenu + ` ${!showMenu ? styles$2.hidden : ''}`
  }, Array.isArray(Object.keys(menuItems)) && menuItems.map((item, index) => /*#__PURE__*/React.createElement("div", {
    onMouseOver: () => onMenuMouseOver(item),
    className: styles$2.menuItem,
    key: index,
    onClick: e => {
      e.stopPropagation();
      !hasSubMenu(item) && onClickMenuItem(POST_ITEM_TYPE[item]);
      setShowMenu(false);
    }
  }, item, hasSubMenu(item) && hoverItem === item && /*#__PURE__*/React.createElement("div", {
    className: `${styles$2.adminMenu} ${styles$2.subMenu}`
  }, POST_ITEM_TYPE_SUBMENU[item].map((i, idx) => /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      onClickMenuItem(i);
      setShowMenu(false);
    },
    className: styles$2.menuItem,
    key: idx
  }, i))))))));
};

const GA_TRACKING_ID = 'G-E1RDMRRT6L';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = ({
  action,
  category,
  label,
  value
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};
var gtag = {
  GA_TRACKING_ID,
  pageview,
  event
};

var styles$1 = {"wrapper":"PatternDetail-module_wrapper__CFlmD","mainImage":"PatternDetail-module_mainImage__ac-c1","rightInfo":"PatternDetail-module_rightInfo__6J0eO","title":"PatternDetail-module_title__0IjOq","author":"PatternDetail-module_author__Xgx6J","storeInfo":"PatternDetail-module_storeInfo__IwaSl","blackCatWrapper":"PatternDetail-module_blackCatWrapper__cqlld","blackCat":"PatternDetail-module_blackCat__xwKnn","message":"PatternDetail-module_message__Wf-re","text":"PatternDetail-module_text__Whs4v","supperWrapperButton":"PatternDetail-module_supperWrapperButton__KF8fO","buttonWrapper":"PatternDetail-module_buttonWrapper__Z-n6q","priceWrapper":"PatternDetail-module_priceWrapper__7pvJH","price":"PatternDetail-module_price__JsXa9","payPalWrapper":"PatternDetail-module_payPalWrapper__C7Mpl","show":"PatternDetail-module_show__L4BBl","payPal":"PatternDetail-module_payPal__0QLxu","closeLink":"PatternDetail-module_closeLink__Xfvkv","linkStore":"PatternDetail-module_linkStore__gf5UQ","mb11":"PatternDetail-module_mb11__sNoEg","paypalButton":"PatternDetail-module_paypalButton__bUOF3","listSmallImage":"PatternDetail-module_listSmallImage__h5eyY","deleteButton":"PatternDetail-module_deleteButton__5oh8i","triangleLeft":"PatternDetail-module_triangleLeft__C0z45","triangleRight":"PatternDetail-module_triangleRight__krzev"};

const PatternDetail = ({
  name: _name,
  price: _price,
  ravelryUrl: _ravelryUrl = 'https://www.messenger.com/t/100004957155465',
  lovecraftsUrl: _lovecraftsUrl,
  bigImageUrl: _bigImageUrl,
  imageList: _imageList,
  isAdmin,
  onChange = () => {},
  index,
  noImageUrl = '/images/no-image.png'
}) => {
  const [imageList, setImageList] = useState([noImageUrl]);
  const [name, setName] = useState("Pattern name");
  const [bigImageFile, setBigImageFile] = useState(null);
  const [bigImageUrl, setBigImageUrl] = useState('');
  const [price, setPrice] = useState(_price);
  const [ravelryUrl, setRavelryUrl] = useState(_ravelryUrl || 'https://www.messenger.com/t/100004957155465');
  const [lovecraftsUrl, setLovecraftsUrl] = useState(_lovecraftsUrl);
  useState(false);
  const onClickLink = (e, key) => {
    if (isAdmin) {
      e.preventDefault();
      let value = '';
      while (value == '') {
        value = prompt(`Nhập đường dẫn tới tin nhắn riêng`);
      }
      if (value === null) {
        // User cancel
        return;
      }
      onChange(value, index, key);
    } else {
      // Track
      gtag$1.event({
        action: "pattern_store_click",
        category: "engagement",
        label: "pattern_store_click",
        value: `${key} - ${name}`
      });
    }
  };
  useEffect(() => {
    setName(_name || "Pattern name");
    setPrice(_price || "Học phí: 100.000");
    setRavelryUrl(_ravelryUrl);
    setLovecraftsUrl(_lovecraftsUrl);
    if (Array.isArray(_imageList) && isAdmin && !_imageList.includes(noImageUrl)) {
      _imageList.push(noImageUrl);
    } else if (Array.isArray(_imageList) && !isAdmin && _imageList.includes(noImageUrl)) {
      const idx = _imageList.indexOf(noImageUrl);
      _imageList.splice(idx, 1);
      setImageList(_imageList);
    } else {
      setImageList(_imageList);
    }
    setBigImageUrl(_bigImageUrl);
  }, [_price, _name, _lovecraftsUrl, _ravelryUrl, _imageList, _bigImageUrl]);
  useEffect(() => {
    if (window.paypal && window.paypal.Buttons) {
      console.count('Render');
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
            const {
              id
            } = details;
            // This function shows a transaction success message to your buyer.

            window.open(`https://api.cheryx.com/verify-order?order=${id}`);
          });
        }
      }).render('#paypal-button-container');
    }
  }, []);
  const onChangeBigImage = ({
    imgFile
  }) => {
    setBigImageFile(imgFile);
    onChange(imgFile, index, 'bigImageUrl');
  };
  const onChangeListImage = (imgFile, i) => {
    const _imageList = [...imageList];
    if (Array.isArray(_imageList) && _imageList.length > i) {
      _imageList[i] = imgFile;
      if (!_imageList.find(item => typeof item === 'string')) {
        _imageList.push(noImageUrl);
      }
      setImageList([..._imageList]);
      onChange(_imageList, index, 'imageList');
    }
  };
  const removeImage = i => {
    const _imageList = [...imageList];
    if (Array.isArray(_imageList) && _imageList.length > i) {
      _imageList.splice(i, 1);
      if (_imageList.length == 0) {
        _imageList.push(noImageUrl);
      }
      setImageList([..._imageList]);
      onChange(_imageList, index, 'imageList');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles$1.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$1.mainImage
  }, isAdmin ? /*#__PURE__*/React.createElement(ImageUploadable$1, {
    wrapperStyle: {
      width: '100%',
      height: '100%'
    },
    onChangeImage: onChangeBigImage,
    isAdmin: isAdmin,
    isEdit: isAdmin,
    src: bigImageUrl
  }) : /*#__PURE__*/React.createElement("img", {
    src: bigImageUrl
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$1.rightInfo
  }, /*#__PURE__*/React.createElement("h1", {
    suppressContentEditableWarning: isAdmin,
    onBlur: e => onChange(e, index, 'name'),
    contenteditable: `${isAdmin ? "true" : "false"}`,
    className: styles$1.title
  }, name)), /*#__PURE__*/React.createElement("div", {
    className: styles$1.storeInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$1.blackCatWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$1.blackCat
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$1.message
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$1.text
  }, "Nh\u1EAFn tin cho m\xECnh \u0111\u1EC3 tham gia l\u1EDBp nh\xE9!")))), /*#__PURE__*/React.createElement("div", {
    className: styles$1.supperWrapperButton
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$1.buttonWrapper
  }, /*#__PURE__*/React.createElement("a", {
    rel: "noreferrer",
    href: ravelryUrl,
    onClick: e => onClickLink(e, 'ravelryUrl'),
    target: "_blank",
    className: `${styles$1.linkStore}`
  }, "\u0110\u0103ng k\xED l\u1EDBp \u0111an th\xFA b\xF4ng online"))), /*#__PURE__*/React.createElement("div", {
    className: styles$1.priceWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$1.triangleRight
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$1.triangleRight
  }), /*#__PURE__*/React.createElement("div", {
    suppressContentEditableWarning: isAdmin,
    onBlur: e => onChange(e, index, 'price'),
    contenteditable: `${isAdmin ? "true" : "false"}`,
    className: styles$1.price
  }, price), /*#__PURE__*/React.createElement("div", {
    className: styles$1.triangleLeft
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$1.triangleLeft
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles$1.listSmallImage
  }, Array.isArray(imageList) && imageList.map((img, i) => isAdmin ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, i < imageList.length - 1 && /*#__PURE__*/React.createElement("div", {
    className: styles$1.deleteButton,
    onClick: () => {
      removeImage(i);
    }
  }, "x"), /*#__PURE__*/React.createElement(ImageUploadable$1, {
    key: i,
    wrapperStyle: {
      width: '243px',
      height: '243px',
      marginRight: 15
    },
    onChangeImage: ({
      imgFile
    }) => {
      onChangeListImage(imgFile, i);
    },
    isAdmin: isAdmin,
    isEdit: isAdmin,
    src: img
  })) : /*#__PURE__*/React.createElement("img", {
    key: i,
    src: img
  }))));
};

var styles = {"relatedTo":"RelatedToMenu-module_relatedTo__eRHql","menuLink":"RelatedToMenu-module_menuLink__8MBUA","deleteButton":"RelatedToMenu-module_deleteButton__Hqq16","arrow":"RelatedToMenu-module_arrow__njWAs","textRelatedTo":"RelatedToMenu-module_textRelatedTo__n7-3q"};

const RelatedToMenu = ({
  url,
  text,
  textLink,
  onChange = () => {},
  onDragStart = () => {},
  index
}) => {
  const [showMenuUrl, setShowMenuUrl] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onDragStart: onDragStart,
    draggable: "true",
    className: styles.relatedTo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.arrow
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.textRelatedTo,
    onClick: () => {
      setShowMenuUrl(true);
    }
  }, text), /*#__PURE__*/React.createElement("a", {
    onClick: () => {
      setShowMenuUrl(true);
    }
  }, textLink), showMenuUrl && /*#__PURE__*/React.createElement("div", {
    className: styles.menuLink
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.deleteButton,
    onClick: () => {
      setShowMenuUrl(false);
    }
  }, "x"), /*#__PURE__*/React.createElement("label", null, "Text:"), /*#__PURE__*/React.createElement("input", {
    className: styles.text,
    onChange: e => onChange('textLink', e, index),
    value: textLink
  }), /*#__PURE__*/React.createElement("label", null, "Url:"), /*#__PURE__*/React.createElement("input", {
    className: styles.url,
    onChange: e => onChange('url', e, index),
    value: url
  })));
};

export { AdBanner, IMAGE_SUBMENU, ImageUpload, ImageUploadable, MenuAddComponentPost, POST_ITEM_TYPE, POST_ITEM_TYPE_SUBMENU, PatternDetail, PatternPreview, PostVideo, RelatedToMenu, SubLink, YouTubeSubscribe, gtag };
