import React, { useState, useRef, useEffect, Component } from 'react';
import { readFile, isBigFile } from '@cheryx2020/utils';
import PropTypes from 'prop-types';

var styles$2 = {"wrapper":"Sublink-module_wrapper__v-n3q","spliter":"Sublink-module_spliter__j4x-a","wrapperLink":"Sublink-module_wrapperLink__Lozil"};

const SubLink = ({
  data,
  wrapperStyle = {},
  className = '',
  renderItem = () => {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles$2.wrapper,
    style: wrapperStyle
  }, Array.isArray(data) && data.length > 0 && data.map((item, i) => {
    return /*#__PURE__*/React.createElement("div", {
      className: `${styles$2.wrapperLink} ${className}`,
      key: i
    }, renderItem(item), i < data.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: styles$2.spliter
    }, '>'));
  }));
};

var styles$1 = {"image":"ImageUploadable-module_image__B0Aq1","imageMenu":"ImageUploadable-module_imageMenu__KVFuF","resizer":"ImageUploadable-module_resizer__ccKdB","vertical":"ImageUploadable-module_vertical__cn5LW","horizontal":"ImageUploadable-module_horizontal__e9JwU"};

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
    className: `${styles$1.image} ${className}`,
    style: {
      ...defaultWrapperStyle,
      ...wrapperStyle
    }
  }, isAdmin && isEdit && /*#__PURE__*/React.createElement("div", {
    className: styles$1.imageMenu,
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
    className: styles$1.resizer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$1.vertical
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$1.horizontal
  })));
};

var styles = {"editImageBtn":"ImageUpload-module_editImageBtn__WJjSq","menuImage":"ImageUpload-module_menuImage__Qkkfq","uploadButton":"ImageUpload-module_uploadButton__QCNEB","textarea":"ImageUpload-module_textarea__pbgpO","imgWrapper":"ImageUpload-module_imgWrapper__y6fHe","videoMenu":"ImageUpload-module_videoMenu__pMOzt","deleteButton":"ImageUpload-module_deleteButton__K4dVX"};

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
    className: styles.imgWrapper,
    style: {
      position: 'relative'
    }
  }, showMenuImage && /*#__PURE__*/React.createElement("div", {
    className: styles.menuImage
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.deleteButton,
    onClick: () => setShowMenuImage(false)
  }, "x"), /*#__PURE__*/React.createElement("label", {
    className: styles.uploadButton
  }, /*#__PURE__*/React.createElement("span", null, "Upload Image"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    onChange: e => {
      setShowMenuImage(false);
      onChange(e);
    }
  }))), !showMenuImage && /*#__PURE__*/React.createElement("div", {
    className: styles.editImageBtn,
    onClick: () => setShowMenuImage(true)
  }, "Edit"), /*#__PURE__*/React.createElement("textarea", {
    className: styles.textarea,
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
    className: styles.imgWrapper
  }, showMenuVideo && /*#__PURE__*/React.createElement("div", {
    className: styles.videoMenu
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.deleteButton,
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
    className: styles.imageDescription,
    style: {
      minWidth: 100
    }
  }, text), !showMenuVideo && /*#__PURE__*/React.createElement("div", {
    className: styles.editImageBtn,
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

export { AdBanner, ImageUpload, ImageUploadable, PostVideo, SubLink, YouTubeSubscribe };
