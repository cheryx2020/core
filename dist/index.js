import React, { useState, useRef, useEffect, Component } from 'react';
import { readFile, isBigFile, removeAccents, uploadFile, sendSlackMessage, SLACK_CHANNELS } from '@cheryx2020/utils';
import PropTypes from 'prop-types';
import { ImageUploadable as ImageUploadable$1, gtag as gtag$1, MenuAddComponentPost as MenuAddComponentPost$1, POST_ITEM_TYPE as POST_ITEM_TYPE$1, AdminMenu as AdminMenu$1, PatternDetail as PatternDetail$1, YouTubeSubscribe as YouTubeSubscribe$1, POST_ITEM_TYPE_SUBMENU as POST_ITEM_TYPE_SUBMENU$1, ImageUpload as ImageUpload$1, PatternPreview as PatternPreview$1, PostVideo as PostVideo$1, RelatedToMenu as RelatedToMenu$1, AdBanner as AdBanner$1 } from '@cheryx2020/core';
import Linkify from 'linkify-react';

var styles$8 = {"wrapper":"Sublink-module_wrapper__v-n3q","spliter":"Sublink-module_spliter__j4x-a","wrapperLink":"Sublink-module_wrapperLink__Lozil"};

const SubLink = ({
  data,
  wrapperStyle = {},
  className = '',
  renderItem = () => {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles$8.wrapper,
    style: wrapperStyle
  }, Array.isArray(data) && data.length > 0 && data.map((item, i) => {
    return /*#__PURE__*/React.createElement("div", {
      className: `${styles$8.wrapperLink} ${className}`,
      key: i
    }, renderItem(item), i < data.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: styles$8.spliter
    }, '>'));
  }));
};

var styles$7 = {"image":"ImageUploadable-module_image__B0Aq1","imageMenu":"ImageUploadable-module_imageMenu__KVFuF","resizer":"ImageUploadable-module_resizer__ccKdB","vertical":"ImageUploadable-module_vertical__cn5LW","horizontal":"ImageUploadable-module_horizontal__e9JwU"};

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
    className: `${styles$7.image} ${className}`,
    style: {
      ...defaultWrapperStyle,
      ...wrapperStyle
    }
  }, isAdmin && isEdit && /*#__PURE__*/React.createElement("div", {
    className: styles$7.imageMenu,
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
    className: styles$7.resizer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$7.vertical
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$7.horizontal
  })));
};

var styles$6 = {"editImageBtn":"ImageUpload-module_editImageBtn__WJjSq","menuImage":"ImageUpload-module_menuImage__Qkkfq","uploadButton":"ImageUpload-module_uploadButton__QCNEB","textarea":"ImageUpload-module_textarea__pbgpO","imgWrapper":"ImageUpload-module_imgWrapper__y6fHe","videoMenu":"ImageUpload-module_videoMenu__pMOzt","deleteButton":"ImageUpload-module_deleteButton__K4dVX"};

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
    className: styles$6.imgWrapper,
    style: {
      position: 'relative'
    }
  }, showMenuImage && /*#__PURE__*/React.createElement("div", {
    className: styles$6.menuImage
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.deleteButton,
    onClick: () => setShowMenuImage(false)
  }, "x"), /*#__PURE__*/React.createElement("label", {
    className: styles$6.uploadButton
  }, /*#__PURE__*/React.createElement("span", null, "Upload Image"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    onChange: e => {
      setShowMenuImage(false);
      onChange(e);
    }
  }))), !showMenuImage && /*#__PURE__*/React.createElement("div", {
    className: styles$6.editImageBtn,
    onClick: () => setShowMenuImage(true)
  }, "Edit"), /*#__PURE__*/React.createElement("textarea", {
    className: styles$6.textarea,
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
    className: styles$6.imgWrapper
  }, showMenuVideo && /*#__PURE__*/React.createElement("div", {
    className: styles$6.videoMenu
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.deleteButton,
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
    className: styles$6.imageDescription,
    style: {
      minWidth: 100
    }
  }, text), !showMenuVideo && /*#__PURE__*/React.createElement("div", {
    className: styles$6.editImageBtn,
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

var styles$5 = {"wrapper":"PatternPreview-module_wrapper__rtoPF","image":"PatternPreview-module_image__jMSHM","info":"PatternPreview-module_info__pn5aE","previewUrl":"PatternPreview-module_previewUrl__ulKmu"};

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
    className: styles$5.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$5.image
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
    className: styles$5.info
  }, /*#__PURE__*/React.createElement("a", {
    rel: "noreferrer",
    href: previewUrl,
    onClick: e => onClickLink(e, 'previewUrl'),
    target: "_blank",
    className: styles$5.previewUrl
  }, buttonText), /*#__PURE__*/React.createElement("div", {
    contentEditable: isAdmin ? "true" : "false",
    onBlur: () => {}
  }, message)));
};

var styles$4 = {"adminMenuBtn":"MenuAddComponentPost-module_adminMenuBtn__GaIEv","adminMenu":"MenuAddComponentPost-module_adminMenu__Yw2pt","hidden":"MenuAddComponentPost-module_hidden__HLj-8","menuItem":"MenuAddComponentPost-module_menuItem__gHxYw","subMenu":"MenuAddComponentPost-module_subMenu__oZH07"};

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
    className: `${styles$4.adminMenuBtn}${btnClass ? ' ' + btnClass : ''}`,
    onClick: () => {
      setShowMenu(!showMenu);
    }
  }, showMenu ? 'X' : 'Add', /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$4.adminMenu + ` ${!showMenu ? styles$4.hidden : ''}`
  }, Array.isArray(Object.keys(menuItems)) && menuItems.map((item, index) => /*#__PURE__*/React.createElement("div", {
    onMouseOver: () => onMenuMouseOver(item),
    className: styles$4.menuItem,
    key: index,
    onClick: e => {
      e.stopPropagation();
      !hasSubMenu(item) && onClickMenuItem(POST_ITEM_TYPE[item]);
      setShowMenu(false);
    }
  }, item, hasSubMenu(item) && hoverItem === item && /*#__PURE__*/React.createElement("div", {
    className: `${styles$4.adminMenu} ${styles$4.subMenu}`
  }, POST_ITEM_TYPE_SUBMENU[item].map((i, idx) => /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      onClickMenuItem(i);
      setShowMenu(false);
    },
    className: styles$4.menuItem,
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

var styles$3 = {"wrapper":"PatternDetail-module_wrapper__CFlmD","mainImage":"PatternDetail-module_mainImage__ac-c1","rightInfo":"PatternDetail-module_rightInfo__6J0eO","title":"PatternDetail-module_title__0IjOq","author":"PatternDetail-module_author__Xgx6J","storeInfo":"PatternDetail-module_storeInfo__IwaSl","blackCatWrapper":"PatternDetail-module_blackCatWrapper__cqlld","blackCat":"PatternDetail-module_blackCat__xwKnn","message":"PatternDetail-module_message__Wf-re","text":"PatternDetail-module_text__Whs4v","supperWrapperButton":"PatternDetail-module_supperWrapperButton__KF8fO","buttonWrapper":"PatternDetail-module_buttonWrapper__Z-n6q","priceWrapper":"PatternDetail-module_priceWrapper__7pvJH","price":"PatternDetail-module_price__JsXa9","payPalWrapper":"PatternDetail-module_payPalWrapper__C7Mpl","show":"PatternDetail-module_show__L4BBl","payPal":"PatternDetail-module_payPal__0QLxu","closeLink":"PatternDetail-module_closeLink__Xfvkv","linkStore":"PatternDetail-module_linkStore__gf5UQ","mb11":"PatternDetail-module_mb11__sNoEg","paypalButton":"PatternDetail-module_paypalButton__bUOF3","listSmallImage":"PatternDetail-module_listSmallImage__h5eyY","deleteButton":"PatternDetail-module_deleteButton__5oh8i","triangleLeft":"PatternDetail-module_triangleLeft__C0z45","triangleRight":"PatternDetail-module_triangleRight__krzev"};

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
    className: styles$3.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.mainImage
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
    className: styles$3.rightInfo
  }, /*#__PURE__*/React.createElement("h1", {
    suppressContentEditableWarning: isAdmin,
    onBlur: e => onChange(e, index, 'name'),
    contenteditable: `${isAdmin ? "true" : "false"}`,
    className: styles$3.title
  }, name)), /*#__PURE__*/React.createElement("div", {
    className: styles$3.storeInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.blackCatWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.blackCat
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.message
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.text
  }, "Nh\u1EAFn tin cho m\xECnh \u0111\u1EC3 tham gia l\u1EDBp nh\xE9!")))), /*#__PURE__*/React.createElement("div", {
    className: styles$3.supperWrapperButton
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.buttonWrapper
  }, /*#__PURE__*/React.createElement("a", {
    rel: "noreferrer",
    href: ravelryUrl,
    onClick: e => onClickLink(e, 'ravelryUrl'),
    target: "_blank",
    className: `${styles$3.linkStore}`
  }, "\u0110\u0103ng k\xED l\u1EDBp \u0111an th\xFA b\xF4ng online"))), /*#__PURE__*/React.createElement("div", {
    className: styles$3.priceWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.triangleRight
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$3.triangleRight
  }), /*#__PURE__*/React.createElement("div", {
    suppressContentEditableWarning: isAdmin,
    onBlur: e => onChange(e, index, 'price'),
    contenteditable: `${isAdmin ? "true" : "false"}`,
    className: styles$3.price
  }, price), /*#__PURE__*/React.createElement("div", {
    className: styles$3.triangleLeft
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$3.triangleLeft
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles$3.listSmallImage
  }, Array.isArray(imageList) && imageList.map((img, i) => isAdmin ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, i < imageList.length - 1 && /*#__PURE__*/React.createElement("div", {
    className: styles$3.deleteButton,
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

var styles$2 = {"relatedTo":"RelatedToMenu-module_relatedTo__eRHql","menuLink":"RelatedToMenu-module_menuLink__8MBUA","deleteButton":"RelatedToMenu-module_deleteButton__Hqq16","arrow":"RelatedToMenu-module_arrow__njWAs","textRelatedTo":"RelatedToMenu-module_textRelatedTo__n7-3q"};

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
    className: styles$2.relatedTo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$2.arrow
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$2.textRelatedTo,
    onClick: () => {
      setShowMenuUrl(true);
    }
  }, text), /*#__PURE__*/React.createElement("a", {
    onClick: () => {
      setShowMenuUrl(true);
    }
  }, textLink), showMenuUrl && /*#__PURE__*/React.createElement("div", {
    className: styles$2.menuLink
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$2.deleteButton,
    onClick: () => {
      setShowMenuUrl(false);
    }
  }, "x"), /*#__PURE__*/React.createElement("label", null, "Text:"), /*#__PURE__*/React.createElement("input", {
    className: styles$2.text,
    onChange: e => onChange('textLink', e, index),
    value: textLink
  }), /*#__PURE__*/React.createElement("label", null, "Url:"), /*#__PURE__*/React.createElement("input", {
    className: styles$2.url,
    onChange: e => onChange('url', e, index),
    value: url
  })));
};

var styles$1 = {"btnCommon":"AdminMenu-module_btnCommon__zAFca","bigMenu":"AdminMenu-module_bigMenu__9UUTu","btn":"AdminMenu-module_btn__JqVGf","menuActive":"AdminMenu-module_menuActive__8EWvI","bottom":"AdminMenu-module_bottom__6oYnv","top":"AdminMenu-module_top__U0RCz","left":"AdminMenu-module_left__A-mrQ","show":"AdminMenu-module_show__Ie-bf"};

const AdminMenu = ({
  isEdit,
  text,
  onSaveClick = () => {},
  onEditClick = () => {},
  onCancelClick = () => {},
  onPreviewClick = () => {},
  hideButtons = []
}) => {
  const [_isEdit, setIsEdit] = useState(isEdit);
  const [isShowMenu, setIsShowMenu] = useState(false);
  useEffect(() => {
    setIsEdit(isEdit);
  }, [isEdit]);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      setIsShowMenu(!isShowMenu);
    },
    className: `${styles$1.bigMenu}${isShowMenu ? ' ' + styles$1.menuActive : ''}`
  }, /*#__PURE__*/React.createElement("span", null, text), !hideButtons.includes('edit-save') && /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      setIsShowMenu(!isShowMenu);
      _isEdit ? onSaveClick() : onEditClick();
    },
    className: `${styles$1.btn}${isShowMenu ? ` ${styles$1.top} ` + styles$1.show : ''}`
  }, _isEdit ? 'Save' : 'Edit'), _isEdit && /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      setIsShowMenu(!isShowMenu);
      onCancelClick();
    },
    className: `${styles$1.btn}${isShowMenu ? ` ${styles$1.bottom} ` + styles$1.show : ''}`
  }, 'Cancel'), _isEdit && !hideButtons.includes('preview') && /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      onPreviewClick();
    },
    className: `${styles$1.btn}${isShowMenu ? ` ${styles$1.left} ` + styles$1.show : ''}`
  }, '👁'));
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var styles = {"wrapperGroupContent":"PostContent-module_wrapperGroupContent__yFH1p","header":"PostContent-module_header__PsWMK","contentZone":"PostContent-module_contentZone__HUhpk","show":"PostContent-module_show__ZMf2A","edit":"PostContent-module_edit__Qe59Q","btnMenu":"PostContent-module_btnMenu__-mGU-","imageWrapper":"PostContent-module_imageWrapper__2Fk0j","bigTitle":"PostContent-module_bigTitle__iLoUj","wrapperAction":"PostContent-module_wrapperAction__-kVIX","deleteButton":"PostContent-module_deleteButton__iDrEN","addButton":"PostContent-module_addButton__sb98L","button":"PostContent-module_button__FKbWL","imageUpload":"PostContent-module_imageUpload__qkS0y","wrapper":"PostContent-module_wrapper__ahlNi","adminTopHeader":"PostContent-module_adminTopHeader__aIDLA","actionButtons":"PostContent-module_actionButtons__KUzyc","checkBox":"PostContent-module_checkBox__edKrx","ads":"PostContent-module_ads__vHBWo","shareZone":"PostContent-module_shareZone__gri02","shareBtn":"PostContent-module_shareBtn__hl-WI","adminMenuBtn":"PostContent-module_adminMenuBtn__dISi1","adminMenu":"PostContent-module_adminMenu__-hGkg","hidden":"PostContent-module_hidden__GQw-G","menuItem":"PostContent-module_menuItem__HomeL","adminMenuBtnSave":"PostContent-module_adminMenuBtnSave__t-FUr","listPost":"PostContent-module_listPost__cjbZ5","adminMenuInputPostId":"PostContent-module_adminMenuInputPostId__my03L","relatedTo":"PostContent-module_relatedTo__NKbLQ","menuLink":"PostContent-module_menuLink__kQC0Q","arrow":"PostContent-module_arrow__ms8AO","textRelatedTo":"PostContent-module_textRelatedTo__IHBxX","dropZone":"PostContent-module_dropZone__8WDHC","subcribeMe":"PostContent-module_subcribeMe__3y1K-","imgWrapper":"PostContent-module_imgWrapper__4YZaL","videoMenu":"PostContent-module_videoMenu__lxwk3","imageDescription":"PostContent-module_imageDescription__19QTz"};

const getSelectionText = () => {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
};
const PostContent = ({
  data = [],
  onChangeData = () => {},
  onSaveClick = () => {},
  onEditClick = () => {},
  onCancelClick = () => {},
  isMobile,
  isEdit,
  isShowBigMenu = false,
  menuBtnClass = '',
  linkComponent
}) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [_isShowBigMenu, setIsShowBigMenu] = useState(isShowBigMenu);
  const [_isEdit, setIsEdit] = useState(isEdit);
  const [_isPreview, setIsPreview] = useState(false);
  useEffect(() => {
    setIsShowBigMenu(isShowBigMenu);
  }, [isShowBigMenu]);
  useEffect(() => {
    setIsEdit(isEdit);
  }, [isEdit]);
  const addNewContentItem = (type, textDefault = 'Edit this text', currentIndex = -1) => {
    onChangeData([...getContentByType(type, textDefault, currentIndex, data)]);
  };
  const onEditBtnClick = () => {
    if (_isPreview) {
      setIsEdit(true);
      setIsPreview(false);
    } else {
      onEditClick();
    }
  };
  const onDeleteContentItem = index => {
    if (confirm('Bạn có chắn chắn muốn xoá dòng này?')) {
      let currentContent = [...data];
      currentContent.splice(index, 1);
      onChangeData([...currentContent]);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, Array.isArray(data) && data.map((item, i) => renderItemByType(item ? item : {}, i, styles, onDeleteContentItem, addNewContentItem, isMobile, _isEdit, data, onChangeData, linkComponent)), _isEdit && Array.isArray(data) && data.length == 0 && /*#__PURE__*/React.createElement(MenuAddComponentPost$1, {
    menuItems: Object.keys(POST_ITEM_TYPE$1),
    btnClass: `${menuBtnClass ? ' ' + menuBtnClass : ''}`,
    onClickMenuItem: item => {
      addNewContentItem(item);
    }
  }), _isShowBigMenu && /*#__PURE__*/React.createElement(AdminMenu$1, {
    isEdit: _isEdit,
    text: isShowMenu ? 'X' : 'Menu',
    onSaveClick: onSaveClick,
    onEditClick: onEditBtnClick,
    onCancelClick: onCancelClick,
    onPreviewClick: () => {
      setIsEdit(!_isEdit);
      setIsPreview(!_isPreview);
    }
  }));
};
const GroupContent = ({
  title,
  content,
  isMobile,
  isEdit,
  onChange = () => {},
  expanded
}) => {
  const [contentData, setContentData] = useState(content);
  const [_expanded, setExpanded] = useState(expanded);
  useEffect(() => {
    setContentData(content);
  }, [content]);
  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapperGroupContent
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      !isEdit && onChange(!_expanded, 'expanded');
    },
    suppressContentEditableWarning: isEdit,
    onBlur: e => onChange(e, 'text'),
    contentEditable: `${isEdit ? "true" : "false"}`,
    className: styles.header
  }, title), /*#__PURE__*/React.createElement("div", {
    className: `${styles.contentZone}${_expanded || isEdit ? ` ${styles.edit} ` + styles.show : ''}`
  }, /*#__PURE__*/React.createElement(PostContent, {
    isShowBigMenu: false,
    menuBtnClass: styles.btnMenu,
    onChangeData: c => {
      setContentData(c);
      onChange(c, 'content');
    },
    isEdit: isEdit,
    data: contentData,
    isMobile: isMobile
  })));
};
const ImageConfig = ({
  title,
  value,
  onChange = () => {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      marginRight: 5,
      minWidth: 50
    }
  }, title, ": "), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    onChange: e => {
      onChange(parseInt(e.target.value));
    }
  }));
};
const MultiImageConfig = ({
  data = {},
  onChange = () => {}
}) => {
  const [isLinkWidthHeight, setIsLinkWidthHeight] = useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: -10,
      top: 9,
      cursor: 'pointer',
      width: 10
    },
    onClick: () => {
      setIsLinkWidthHeight(!isLinkWidthHeight);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 5,
      backgroundColor: isLinkWidthHeight ? 'black' : 'lightgray'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 28,
      width: 1,
      backgroundColor: isLinkWidthHeight ? 'black' : 'lightgray'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 5,
      backgroundColor: isLinkWidthHeight ? 'black' : 'lightgray'
    }
  })), /*#__PURE__*/React.createElement(ImageConfig, {
    title: "Width",
    value: parseInt(data.width),
    onChange: value => {
      onChange({
        ...data,
        width: value,
        height: isLinkWidthHeight ? value : data.height
      });
    }
  }), /*#__PURE__*/React.createElement(ImageConfig, {
    title: "Height",
    value: parseInt(data.height),
    onChange: value => {
      onChange({
        ...data,
        height: value,
        width: isLinkWidthHeight ? value : data.width
      });
    }
  })), /*#__PURE__*/React.createElement(ImageConfig, {
    title: "Gap",
    value: data.marginLeft * 2,
    onChange: value => {
      onChange({
        ...data,
        marginLeft: value / 2,
        marginRight: value / 2
      });
    }
  }));
};
const noImageUrl = '/images/no-image.png';
const getPostId = titleData => {
  let result = '';
  if (titleData) {
    result = removeAccents(titleData).trim().toLocaleLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-');
  }
  return result;
};
const onDragStart = e => {
  try {
    e.dataTransfer.setData("itemIndex", e.target.dataset.index);
  } catch (err) {
    console.log(err);
  }
};
const makeContentOnChangeText = (e, index, contentData) => {
  const currentContent = [...contentData];
  if (index < currentContent.length) {
    currentContent[index].text = e.target.innerText;
    return [...currentContent];
  }
};
const makeContentDataOnDrop = (e, contentData) => {
  const indexStart = parseInt(e.dataTransfer.getData('itemIndex'));
  const indexEnd = parseInt(e.target.id);
  if (indexStart > -1 && indexEnd > -1) {
    var elementMove = contentData.splice(indexStart, 1);
    contentData.splice(indexEnd, 0, elementMove[0]);
  }
  e.target.style.backgroundColor = 'white';
  e.target.style.height = '1px';
  return contentData;
};
const onDragOver = e => {
  e.target.style.backgroundColor = 'blue';
  e.target.style.height = '30px';
  e.preventDefault();
};
const onDragLeave = e => {
  e.target.style.backgroundColor = 'white';
  e.target.style.height = '1px';
};
const getContentByType = (type, textDefault = 'Edit this text', currentIndex = -1, contentData) => {
  let result = {
    type: type,
    text: textDefault
  };
  const currentContent = [...contentData];
  const imgStyles = {
    width: 250,
    height: 250,
    marginLeft: 10,
    marginRight: 10
  };
  switch (type) {
    case POST_ITEM_TYPE$1.PATTERN_PREVIEW:
      result = {
        ...result,
        imageUrl: '/images/assets/image-pattern-preview.png'
      };
      break;
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[0]:
      // result = {
      //     ...result,
      //     webWidth: 435,
      //     webHeight: 652,
      //     mobileWidth: 299,
      //     mobileHeight: 212,
      //     urlWeb: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
      //     urlMobile: ''
      // }
      result = {
        ...result,
        style: {
          ...imgStyles
        },
        data: [{
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }]
      };
      break;
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[1]:
      result = {
        ...result,
        style: {
          ...imgStyles
        },
        data: [{
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }, {
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }]
      };
      break;
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[2]:
      result = {
        ...result,
        style: {
          ...imgStyles
        },
        data: [{
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }, {
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }, {
          url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
          description: 'Image description'
        }]
      };
      break;
    case POST_ITEM_TYPE$1.RELATED_TOPIC:
      result.text = 'Xem thêm:';
      result.textLink = 'Link';
      result.url = '#';
      break;
    case POST_ITEM_TYPE$1.VIDEO:
      result.text = 'Video Description';
      break;
    case POST_ITEM_TYPE$1.PATTERN:
      result.patternDetail = {
        name: "Pattern Name",
        price: "Học phí: 100.000",
        ravelryUrl: "",
        lovecraftsUrl: "",
        imageList: [noImageUrl],
        bigImageUrl: noImageUrl
      };
      break;
    case POST_ITEM_TYPE$1.GROUP:
      result.text = 'Group 1';
      result.content = [];
      break;
  }
  if (currentIndex !== -1 && currentIndex !== currentContent.length - 1) {
    // Handle push new content to currentIndex
    const tmp = [];
    for (let i = 0; i < currentContent.length; i++) {
      tmp.push(currentContent[i]);
      if (i === currentIndex) {
        tmp.push({
          ...result
        });
      }
    }
    return [...tmp];
  } else {
    currentContent.push({
      ...result
    });
    return [...currentContent];
  }
};
const uploadContentImageFiles = _contentData => {
  return new Promise(async resolve => {
    const __contentData = [..._contentData];
    let listFileUploaded = [];
    let patternName = '';
    if (Array.isArray(__contentData)) {
      for (let i = 0; i < __contentData.length; i++) {
        if (typeof __contentData[i].patternDetail === 'object' && typeof __contentData[i].patternDetail.bigImageUrl === 'object' && typeof __contentData[i].patternDetail.bigImageUrl.name === 'string') {
          patternName = __contentData[i].patternDetail.name;
          __contentData[i].patternDetail.bigImageUrl = await uploadFile(__contentData[i].patternDetail.bigImageUrl, process.env.NEXT_PUBLIC_publicImagesPath, true, `pattern_detail_bigImage_${__contentData[i].patternDetail.name}`, true);
          if (__contentData[i].patternDetail.bigImageUrl) {
            listFileUploaded.push(__contentData[i].patternDetail.bigImageUrl);
          }
        }
        if (typeof __contentData[i].patternDetail === 'object' && Array.isArray(__contentData[i].patternDetail.imageList)) {
          for (let j = 0; j < __contentData[i].patternDetail.imageList.length; j++) {
            if (typeof __contentData[i].patternDetail.imageList[j] === 'object' && __contentData[i].patternDetail.imageList[j].name) {
              __contentData[i].patternDetail.imageList[j] = await uploadFile(__contentData[i].patternDetail.imageList[j], process.env.NEXT_PUBLIC_publicImagesPath, true, `pattern_detail_smallImage_${j}${__contentData[i].patternDetail.name}`, true);
              if (__contentData[i].patternDetail.imageList[j]) {
                listFileUploaded.push(__contentData[i].patternDetail.imageList[j]);
              }
            }
          }
        }
        /** 
         * Handle upload image preview
        */
        if (typeof __contentData[i].imageUrl === 'object' && typeof __contentData[i].imageUrl.name === 'string') {
          __contentData[i].imageUrl = await uploadFile(__contentData[i].imageUrl, process.env.NEXT_PUBLIC_publicImagesPath, true, `pattern_detail_imageUrl_${patternName || new Date().getTime()}`, true);
          if (__contentData[i].imageUrl) {
            listFileUploaded.push(__contentData[i].imageUrl);
          }
        }
        /**
         * Handle upload 2, 3 images component
         */
        if (Array.isArray(__contentData[i].data)) {
          for (let j = 0; j < __contentData[i].data.length; j++) {
            if (typeof __contentData[i].data[j] === 'object' && typeof __contentData[i].data[j].imgFile === 'object') {
              __contentData[i].data[j].url = await uploadFile(__contentData[i].data[j].imgFile, process.env.NEXT_PUBLIC_publicImagesPath, true, `post-images-${new Date().getTime()}`, true);
              delete __contentData[i].data[j].imgFile;
            }
          }
        }
        /**
         * Handle upload images for group component
         */
        if (Array.isArray(__contentData[i].content)) {
          const groupContentResponse = await uploadContentImageFiles(__contentData[i].content);
          if (groupContentResponse && Array.isArray(groupContentResponse.updatedContent)) {
            __contentData[i].content = groupContentResponse.updatedContent;
          }
          if (groupContentResponse && Array.isArray(groupContentResponse.listFileUploaded)) {
            listFileUploaded = [...listFileUploaded, ...groupContentResponse.listFileUploaded];
          }
        }
      }
    }
    resolve({
      updatedContent: __contentData,
      listFileUploaded
    });
  });
};
const wrapperActionAdmin = (item, index, styles = {}, onDeleteContentItem = () => {}, onAddNewContentItem = () => {}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapperAction
  }, item, /*#__PURE__*/React.createElement("div", {
    onClick: () => onDeleteContentItem(index),
    className: styles.deleteButton
  }, "X"), /*#__PURE__*/React.createElement("div", {
    className: styles.addButton
  }, /*#__PURE__*/React.createElement(MenuAddComponentPost$1, {
    menuItems: Object.keys(POST_ITEM_TYPE$1),
    btnClass: styles.button,
    onClickMenuItem: item => {
      onAddNewContentItem(item, undefined, index);
    }
  })));
};
const onChangeText = (e, index, contentData) => {
  return [...makeContentOnChangeText(e, index, contentData)];
};
const onDrop = (e, contentData) => {
  return [...makeContentDataOnDrop(e, contentData)];
};
const onChangeImageMultiple = ({
  imgIndex,
  data,
  style
}, index, key, contentData) => {
  const currentContent = [...contentData];
  if (index < currentContent.length) {
    let _data = currentContent[index][key];
    if (key === 'data' && Array.isArray(_data) && _data.length > 0 && _data.length > imgIndex && data && typeof data === 'object') {
      if (data.imgFile && data.imgSrc) {
        _data[imgIndex].url = data.imgSrc;
        _data[imgIndex].imgFile = data.imgFile;
      } else if (data.description != undefined) {
        _data[imgIndex].description = data.description;
      }
    } else if (key === 'style' && _data && typeof _data === 'object') {
      _data = {
        ...style
      };
    }
    currentContent[index][key] = _data;
  }
  return [...currentContent];
};
const onChangeUrl = (key, e, index, contentData) => {
  const currentContent = [...contentData];
  if (index < currentContent.length) {
    currentContent[index][key] = e.target.value;
  }
  return [...currentContent];
};
const onImageResize = (size, index, contentData) => {
  if (index < contentData.length && size.width && size.height) {
    contentData[index].webWidth = size.width;
    contentData[index].webHeight = size.height;
  }
  return [...contentData];
};
const onChangeImage = async (e, index, contentData) => {
  if (e && e.target && e.target.files && e.target.files[0] && index < contentData.length) {
    if (isBigFile(e?.target?.files[0])) {
      alert('Kích thước file không được vượt quá 500KB');
      return;
    }
    let url = '';
    try {
      url = await uploadFile(e.target.files[0], process.env.NEXT_PUBLIC_publicImagesPath, false, `post_${new Date().getTime()}_image`, true);
    } catch (e) {
      url = '';
      alert('Có lỗi xảy ra khi tải ảnh lên.');
    }
    contentData[index].urlWeb = url;
  }
  return [...contentData];
};
const onChangePatternPreview = (e, index, key, contentData) => {
  const currentContent = [...contentData];
  if (Array.isArray(currentContent) && currentContent.length > index) {
    if (typeof currentContent[index] === 'object' && key && typeof key === 'string') {
      let value = '';
      if (typeof e === 'string' || Array.isArray(e) || typeof e === 'object' && e.name) {
        value = e;
      }
      currentContent[index][key] = value;
    }
  }
  return [...currentContent];
};
const onChangePatternDetail = (e, index, key, contentData) => {
  const currentContent = [...contentData];
  if (Array.isArray(currentContent) && currentContent.length > index) {
    if (typeof currentContent[index] === 'object' && typeof currentContent[index].patternDetail === 'object' && key && typeof key === 'string') {
      let value = '';
      if (typeof e === 'string' || Array.isArray(e) || typeof e === 'object' && e.name) {
        value = e;
      }
      if (typeof e === 'object' && e.target) {
        value = e.target.innerText;
      }
      currentContent[index].patternDetail[key] = value;
    }
  }
  return [...currentContent];
};
const onChangeGroupDetail = (e, index, key, contentData) => {
  const currentContent = [...contentData];
  if (Array.isArray(currentContent) && currentContent.length > index) {
    if (typeof currentContent[index] === 'object' && key && typeof key === 'string') {
      let value = '';
      if (typeof e === 'object' && e.target) {
        value = e.target.innerText;
      } else if (['content', 'expanded'].includes(key)) {
        value = e;
      }
      currentContent[index][key] = value;
    }
  }
  return [...currentContent];
};
const onKeyDownParagraph = (e, addNewContentItem = () => {}) => {
  if (e.keyCode === 38) {
    // Key Up press => Move to top parrent p
    setTimeout(() => {
      try {
        const pElement = e.target.parentElement.previousElementSibling.querySelector('p');
        if (pElement) {
          e.target.blur();
          pElement.focus();
        }
      } catch (e) {
        console.log(e);
      }
    }, 100);
  }
  if (e.keyCode === 40) {
    // Key Up press => Move to down parrent p
    setTimeout(() => {
      try {
        const pElement = e.target.parentElement.nextElementSibling.querySelector('p');
        if (pElement) {
          e.target.blur();
          pElement.focus();
        }
      } catch (e) {
        console.log(e);
      }
    }, 100);
  }
  if (e.shiftKey && e.keyCode === 8) {
    // Handle delete when detect Shift + Delete
    try {
      e.target.parentNode.lastElementChild.click();
    } catch (e) {
      console.log(e);
    }
  }
  if (e && e.keyCode === 13) {
    //Enter key press detected
    // Add new blank paragraph
    // Get current item index
    try {
      const currentItemIndex = parseInt(e.target.getAttribute('data-index'));
      if (typeof currentItemIndex === 'number') {
        addNewContentItem(POST_ITEM_TYPE$1.PARAGRAPH, getSelectionText(), currentItemIndex);
      }
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      if (e && e.target && e.target.blur) {
        e.target.blur();
        const listParagraph = document.querySelectorAll('p');
        if (listParagraph.length > 0) {
          // Focus to next sibling
          const item = e.target.parentElement.nextElementSibling.querySelector('p');
          if (item && item.focus) {
            item.focus();
            if (window.getSelection) {
              const selection = window.getSelection(),
                range = document.createRange();
              range.selectNodeContents(item);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }
      }
    }, 100);
    e.preventDefault();
  }
};
const onCaptionChange = (e, index, contentData) => {
  const currentContent = [...contentData];
  if (index < currentContent.length) {
    currentContent[index].imageDescription = e.target.innerText;
  }
  return [...currentContent];
};
const renderItemByType = ({
  type,
  text,
  content,
  webWidth,
  webHeight,
  urlWeb,
  imageDescription = 'Image description',
  url,
  textLink,
  patternDetail = {},
  imageUrl,
  previewUrl,
  buttonText,
  message,
  data = [],
  style = {},
  expanded
}, index, styles = {}, onDeleteContentItem = () => {}, onAddNewContentItem = () => {}, isMobile, isAdmin, contentData, onChangeContent = () => {}, Link) => {
  let result = /*#__PURE__*/React.createElement("p", null, text),
    editComponent = /*#__PURE__*/React.createElement("p", {
      onDragStart: onDragStart,
      draggable: "true",
      suppressContentEditableWarning: true,
      contentEditable: "true",
      onBlur: e => onChangeContent(onChangeText(e, index, contentData)),
      onKeyDown: e => onKeyDownParagraph(e, onAddNewContentItem),
      "data-index": index
    }, text),
    viewComponent = /*#__PURE__*/React.createElement(Linkify, {
      as: "p",
      options: {
        target: '_blank'
      }
    }, text);
  let subContent = /*#__PURE__*/React.createElement("div", null);
  const dropZoneDiv = /*#__PURE__*/React.createElement("div", {
    id: index,
    onDragLeave: onDragLeave,
    onDragOver: onDragOver,
    onDrop: e => onChangeContent(onDrop(e, contentData)),
    className: styles.dropZone
  });
  switch (type) {
    case POST_ITEM_TYPE$1.TITLE:
      editComponent = /*#__PURE__*/React.createElement("div", {
        className: styles.bigTitle,
        onDragStart: onDragStart,
        draggable: "true",
        suppressContentEditableWarning: true,
        contentEditable: "true",
        onBlur: e => onChangeContent(onChangeText(e, index, contentData))
      }, text);
      viewComponent = /*#__PURE__*/React.createElement("div", {
        className: styles.bigTitle
      }, text);
      break;
    case POST_ITEM_TYPE$1.BIG_HEADER:
      editComponent = /*#__PURE__*/React.createElement("h2", {
        onDragStart: onDragStart,
        draggable: "true",
        suppressContentEditableWarning: true,
        contentEditable: "true",
        onBlur: e => onChangeContent(onChangeText(e, index, contentData))
      }, text);
      viewComponent = /*#__PURE__*/React.createElement("h2", null, text);
      break;
    case POST_ITEM_TYPE$1.MEDIUM_HEADER:
      editComponent = /*#__PURE__*/React.createElement("h3", {
        onDragStart: onDragStart,
        draggable: "true",
        suppressContentEditableWarning: true,
        contentEditable: "true",
        onBlur: e => onChangeContent(onChangeText(e, index, contentData))
      }, text);
      viewComponent = /*#__PURE__*/React.createElement("h3", null, text);
      break;
    case POST_ITEM_TYPE$1.SMALL_HEADER:
      editComponent = /*#__PURE__*/React.createElement("h4", {
        onDragStart: onDragStart,
        draggable: "true",
        suppressContentEditableWarning: true,
        contentEditable: "true",
        onBlur: e => onChangeContent(onChangeText(e, index, contentData))
      }, text);
      viewComponent = /*#__PURE__*/React.createElement("h4", null, text);
      break;
    case POST_ITEM_TYPE$1.RELATED_TOPIC:
      editComponent = /*#__PURE__*/React.createElement(RelatedToMenu$1, {
        url: url,
        text: text,
        textLink: textLink,
        onDragStart: onDragStart,
        onChange: (key, e, index) => onChangeContent(onChangeUrl(key, e, index, contentData)),
        index: index
      });
      viewComponent = /*#__PURE__*/React.createElement("div", {
        className: styles.relatedTo
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.arrow
      }), /*#__PURE__*/React.createElement("div", {
        className: styles.textRelatedTo
      }, text), /*#__PURE__*/React.createElement(Link, {
        href: url
      }, /*#__PURE__*/React.createElement("a", {
        onClick: e => {
          sendSlackMessage({
            channel: SLACK_CHANNELS.FREE_CRAFTPATTERNS,
            message: `Related To Clicked:\\n*Post*: <${process.env.NEXT_PUBLIC_pageUrl}/tip/${id}|${title}>\\n*Url*: <${process.env.NEXT_PUBLIC_pageUrl}${url}|${textLink}>`
          });
        }
      }, textLink)));
      break;
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[0]:
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[1]:
    case POST_ITEM_TYPE_SUBMENU$1.IMAGE[2]:
      if (Array.isArray(data)) {
        editComponent = /*#__PURE__*/React.createElement("div", {
          onDragStart: onDragStart,
          onMouseDown: e => {
            e.currentTarget.draggable = true;
          },
          onMouseUp: e => {
            e.currentTarget.draggable = false;
          },
          draggable: "false",
          style: {
            display: 'flex',
            flexDirection: 'column'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: styles.imageWrapper,
          style: {
            display: 'flex',
            justifyContent: 'center'
          }
        }, data.map((img, idx) => /*#__PURE__*/React.createElement("div", {
          style: {
            ...style,
            width: 'unset',
            height: 'unset'
          }
        }, /*#__PURE__*/React.createElement(ImageUploadable$1, {
          resizeable: true,
          key: idx,
          wrapperStyle: {
            width: style.width,
            height: style.height
          },
          onChangeImage: ({
            imgSrc,
            imgFile
          }) => {
            onChangeContent(onChangeImageMultiple({
              imgIndex: idx,
              data: {
                imgSrc,
                imgFile
              }
            }, index, 'data', contentData));
          },
          onChangeStyle: s => {
            onChangeContent(onChangeImageMultiple({
              style: {
                ...style,
                ...s
              }
            }, index, 'style', contentData));
          },
          isAdmin: true,
          isEdit: true,
          src: img.url
        }), /*#__PURE__*/React.createElement("figcaption", {
          onBlur: e => onChangeContent(onChangeImageMultiple({
            imgIndex: idx,
            data: {
              description: e.target.innerText
            }
          }, index, 'data', contentData)),
          suppressContentEditableWarning: true,
          contentEditable: "true",
          className: styles.imageDescription
        }, img.description)))), /*#__PURE__*/React.createElement(MultiImageConfig, {
          data: style,
          onChange: data => {
            onChangeContent(onChangeImageMultiple({
              style: {
                ...data
              }
            }, index, 'style', contentData));
          }
        }));
        viewComponent = /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 20
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: styles.imageWrapper
        }, data.map((img, idx) => /*#__PURE__*/React.createElement("div", {
          style: {
            ...style,
            width: 'unset',
            height: 'unset'
          }
        }, /*#__PURE__*/React.createElement(ImageUploadable$1, {
          className: styles.imageUpload,
          key: idx,
          wrapperStyle: {
            width: style.width,
            height: style.height
          },
          src: img.url
        }), /*#__PURE__*/React.createElement("figcaption", {
          className: styles.imageDescription
        }, img.description)))));
      }
      /**
       * Support old image component with urlWeb
       */
      if (urlWeb) {
        editComponent = /*#__PURE__*/React.createElement(ImageUpload$1, {
          width: webWidth,
          height: webHeight,
          onResize: size => onChangeContent(onImageResize(size, index, contentData)),
          onDragStart: onDragStart,
          caption: /*#__PURE__*/React.createElement("figcaption", {
            onBlur: e => onChangeContent(onCaptionChange(e, index, contentData)),
            suppressContentEditableWarning: true,
            contentEditable: "true",
            className: styles.imageDescription
          }, imageDescription),
          onChange: async e => onChangeContent(await onChangeImage(e, index, contentData)),
          url: urlWeb
        });
        viewComponent = /*#__PURE__*/React.createElement("div", {
          className: styles.imgWrapper
        }, /*#__PURE__*/React.createElement("img", {
          alt: imageDescription || 'Image with no description',
          src: urlWeb,
          width: isMobile ? '100%' : webWidth,
          height: isMobile ? 'auto' : webHeight
        }), /*#__PURE__*/React.createElement("figcaption", {
          className: styles.imageDescription
        }, imageDescription));
      }
      /** */
      break;
    case POST_ITEM_TYPE$1.ADS:
      editComponent = /*#__PURE__*/React.createElement("div", {
        onDragStart: onDragStart,
        draggable: "true",
        className: styles.ads
      }, "ADS HERE");
      viewComponent = /*#__PURE__*/React.createElement(AdBanner$1, null);
      break;
    case POST_ITEM_TYPE$1.VIDEO:
      editComponent = /*#__PURE__*/React.createElement(PostVideo$1, {
        onDragStart: onDragStart,
        url: url,
        onChange: e => onChangeContent(onChangeUrl('url', e, index, contentData)),
        onChangeText: e => onChangeContent(onChangeText(e, index, contentData)),
        text: text
      });
      viewComponent = /*#__PURE__*/React.createElement("div", {
        className: styles.imgWrapper
      }, url && /*#__PURE__*/React.createElement("iframe", {
        title: text,
        src: `https://www.youtube.com/embed/${url}`,
        frameborder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
      }), /*#__PURE__*/React.createElement("figcaption", {
        className: styles.imageDescription
      }, text));
      break;
    case POST_ITEM_TYPE$1.SUBCRIBE_ME:
      subContent = /*#__PURE__*/React.createElement("div", {
        className: styles.subcribeMe
      }, /*#__PURE__*/React.createElement(YouTubeSubscribe$1, {
        channelid: 'UCf0jCxiSGh_pBExFN3k1CIA',
        theme: "default",
        layout: "full",
        count: "hidden"
      }), /*#__PURE__*/React.createElement("img", {
        alt: "Subcribe me",
        src: "/images/subcribe-me.png"
      }));
      editComponent = subContent;
      viewComponent = subContent;
      break;
    case POST_ITEM_TYPE$1.BUY_ME_A_COFFEE:
      subContent = /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement("a", {
        onClick: () => {
          sendSlackMessage({
            channel: SLACK_CHANNELS.FREE_CRAFTPATTERNS,
            message: `An user has clicked on the buy me a coffee:\\n*Post*: <${process.env.NEXT_PUBLIC_pageUrl}/tip/${id}|${title}>`
          });
        },
        href: "https://www.buymeacoffee.com/cheryx",
        target: "_blank"
      }, /*#__PURE__*/React.createElement("img", {
        src: "https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png",
        alt: "Buy Me A Coffee",
        style: {
          height: 60,
          width: 217
        }
      })));
      editComponent = /*#__PURE__*/React.createElement("div", {
        onDragStart: onDragStart,
        draggable: "true"
      }, subContent);
      viewComponent = subContent;
      break;
    case POST_ITEM_TYPE$1.PATTERN:
      subContent = /*#__PURE__*/React.createElement(PatternDetail$1, _extends({
        onChange: (e, index, key) => onChangeContent(onChangePatternDetail(e, index, key, contentData))
      }, patternDetail, {
        index: index,
        isAdmin: isAdmin
      }));
      editComponent = /*#__PURE__*/React.createElement("div", {
        onDragStart: onDragStart,
        draggable: "true"
      }, subContent);
      viewComponent = subContent;
      break;
    case POST_ITEM_TYPE$1.PATTERN_PREVIEW:
      subContent = /*#__PURE__*/React.createElement(PatternPreview$1, {
        buttonText: buttonText,
        message: message,
        previewUrl: previewUrl,
        onChange: (e, index, key) => onChangeContent(onChangePatternPreview(e, index, key, contentData)),
        imageUrl: imageUrl,
        index: index,
        isAdmin: isAdmin
      });
      editComponent = /*#__PURE__*/React.createElement("div", {
        onDragStart: onDragStart,
        draggable: "true"
      }, subContent);
      viewComponent = subContent;
      break;
    case POST_ITEM_TYPE$1.GROUP:
      subContent = /*#__PURE__*/React.createElement(GroupContent, {
        expanded: expanded,
        isEdit: isAdmin,
        isMobile: isMobile,
        title: text,
        content: content,
        onChange: (e, key) => onChangeContent(onChangeGroupDetail(e, index, key, contentData))
      });
      editComponent = /*#__PURE__*/React.createElement("div", {
        onDragStart: onDragStart,
        draggable: "true"
      }, subContent);
      viewComponent = subContent;
      break;
  }
  if (isAdmin) {
    result = wrapperActionAdmin( /*#__PURE__*/React.createElement(React.Fragment, null, dropZoneDiv, " ", editComponent), index, styles, onDeleteContentItem, onAddNewContentItem);
  } else {
    result = viewComponent;
  }
  return result;
};

export { AdBanner, AdminMenu, IMAGE_SUBMENU, ImageUpload, ImageUploadable, MenuAddComponentPost, POST_ITEM_TYPE, POST_ITEM_TYPE_SUBMENU, PatternDetail, PatternPreview, PostContent, PostVideo, RelatedToMenu, SubLink, YouTubeSubscribe, getPostId, gtag, noImageUrl, uploadContentImageFiles };
