import { sendSlackMessage, SLACK_CHANNELS, removeAccents, uploadFile, isBigFile } from "@cheryx2020/utils";
import ImageUploadable from '../image-uploadable/image-uploadable';
import RelatedToMenu from '../related-to-menu/related-to-menu';
import AdminMenu from "../admin-menu/admin-menu";
import PatternDetail from "../pattern-detail/pattern-detail";
import ImageUpload from "../image-upload/image-upload";
import AdBanner from "../ad-banner/ad-banner";
import PostVideo from "../post-video/post-video";
import YouTubeSubscribe from "../subcribe-button/youtube-subcribe";
import PatternPreview from "../pattern-preview/pattern-preview";
import MenuAddComponentPost from "../menu-add-component-post/menu-add-component-post";
import { POST_ITEM_TYPE, POST_ITEM_TYPE_SUBMENU } from "../menu-add-component-post/menu-add-component-post";
import Linkify from "linkify-react";
import styles from "./PostContent.module.scss";
import React, { useEffect, useState } from "react";

const getSelectionText = () => {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

export const PostContent = ({
    data = [],
    onChangeData = () => { },
    onSaveClick = () => { },
    onEditClick = () => { },
    onCancelClick = () => { },
    isMobile,
    isEdit,
    isShowBigMenu = false,
    menuBtnClass = '',
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
    }
    const onEditBtnClick = () => {
        if (_isPreview) {
            setIsEdit(true);
            setIsPreview(false);
        } else {
            onEditClick();
        }
    }
    const onDeleteContentItem = index => {
        if (confirm('Bạn có chắn chắn muốn xoá dòng này?')) {
            let currentContent = [...data];
            currentContent.splice(index, 1);
            onChangeData([...currentContent]);
        }
    }
    return <div className={styles.wrapper}>{Array.isArray(data) && data.map((item, i) => renderItemByType(
        item ? item : {},
        i,
        styles,
        onDeleteContentItem,
        addNewContentItem,
        isMobile,
        _isEdit,
        data,
        onChangeData))}
        {_isEdit && (Array.isArray(data) && data.length == 0) && <MenuAddComponentPost
            btnClass={`${menuBtnClass ? ' ' + menuBtnClass : ''}`}
            onClickMenuItem={item => {
                addNewContentItem(item)
            }}
        />}
        {_isShowBigMenu && <AdminMenu
            isEdit={_isEdit}
            text={isShowMenu ? 'X' : 'Menu'}
            onSaveClick={onSaveClick}
            onEditClick={onEditBtnClick}
            onCancelClick={onCancelClick}
            onPreviewClick={() => { setIsEdit(!_isEdit); setIsPreview(!_isPreview); }}
        />}
    </div>
}

const GroupContent = ({ title, content, isMobile, isEdit, onChange = () => { }, expanded }) => {
    const [contentData, setContentData] = useState(content);
    const [_expanded, setExpanded] = useState(expanded);
    useEffect(() => {
        setContentData(content);
    }, [content])
    useEffect(() => {
        setExpanded(expanded);
    }, [expanded])
    return <div className={styles.wrapperGroupContent}>
        <div onClick={() => { !isEdit && onChange(!_expanded, 'expanded') }} suppressContentEditableWarning={isEdit} onBlur={e => onChange(e, 'text')} contentEditable={`${isEdit ? "true" : "false"}`} className={styles.header}>{title}</div>
        <div className={`${styles.contentZone}${_expanded || isEdit ? ` ${styles.edit} ` + styles.show : ''}`}>
            <PostContent isShowBigMenu={false} menuBtnClass={styles.btnMenu} onChangeData={(c) => { setContentData(c); onChange(c, 'content'); }} isEdit={isEdit} data={contentData} isMobile={isMobile} />
        </div>
    </div>
}

export const ImageConfig = ({ title, value, onChange = () => { } }) => {
    return <div data-testid="wrapper" style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}><label data-testid="label" style={{ marginRight: 5, minWidth: 50 }}>{title}: </label><input data-testid="input" type="number" value={value} onChange={e => { onChange(parseInt(e.target.value)) }} /></div>
}

export const MultiImageConfig = ({ data = {}, onChange = () => { } }) => {
    const [isLinkWidthHeight, setIsLinkWidthHeight] = useState(true);
    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div data-testid="link-width-height" style={{ position: 'absolute', left: -10, top: 9, cursor: 'pointer', width: 10 }} onClick={() => { setIsLinkWidthHeight(!isLinkWidthHeight) }}>
                <div style={{ height: 1, width: 5, backgroundColor: isLinkWidthHeight ? 'black' : 'lightgray' }}></div>
                <div style={{ height: 28, width: 1, backgroundColor: isLinkWidthHeight ? 'black' : 'lightgray' }}></div>
                <div style={{ height: 1, width: 5, backgroundColor: isLinkWidthHeight ? 'black' : 'lightgray' }}></div>
            </div>
            <ImageConfig title='Width' value={parseInt(data.width)} onChange={value => {
                onChange({ ...data, width: value, height: isLinkWidthHeight ? value : data.height })
            }} />
            <ImageConfig title='Height' value={parseInt(data.height)} onChange={value => {
                onChange({ ...data, height: value, width: isLinkWidthHeight ? value : data.width })
            }} />
        </div>
        <ImageConfig title='Gap' value={data.marginLeft * 2} onChange={value => { onChange({ ...data, marginLeft: value / 2, marginRight: value / 2 }) }} />
    </div>
}

export const noImageUrl = '/images/no-image.png';
export const getPostId = titleData => {
    let result = '';
    if (titleData) {
        result = removeAccents(titleData).trim().toLocaleLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-');
    }
    return result
}
const onDragStart = e => {
    try {
        e.dataTransfer.setData("itemIndex", e.target.dataset.index);
    } catch (err) {
        console.log(err);
    }
}
const makeContentOnChangeText = (e, index, contentData) => {
    const currentContent = [...contentData];
    if (index < currentContent.length) {
        currentContent[index].text = e.target.innerText;
        return [...currentContent];
    }
}
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
}
const onDragOver = e => {
    e.target.style.backgroundColor = 'blue';
    e.target.style.height = '30px';
    e.preventDefault();
}
const onDragLeave = e => {
    e.target.style.backgroundColor = 'white';
    e.target.style.height = '1px';
}
export const getContentByType = (type, textDefault = 'Edit this text', currentIndex = -1, contentData) => {
    let result = {
        type: type,
        text: textDefault
    };
    const defaultImage = {
        url: 'https://i.pinimg.com/564x/dd/ac/bf/ddacbf7737f2d60fa199fc2e764773be.jpg',
        description: 'Image description'
    }
    const currentContent = [...contentData];
    const imgStyles = {
        width: 250,
        height: 250,
        marginLeft: 10,
        marginRight: 10,
    };
    const imgCommon = {
        ...result,
        style: {
            ...imgStyles
        },
    }
    switch (type) {
        case POST_ITEM_TYPE.PATTERN_PREVIEW:
            result = {
                ...result,
                imageUrl: '/images/assets/image-pattern-preview.png'
            }
            break;
        case POST_ITEM_TYPE_SUBMENU.IMAGE[0]:
            result = {
                ...imgCommon,
                data: [defaultImage]
            }
            break;
        case POST_ITEM_TYPE_SUBMENU.IMAGE[1]:
            result = {
                ...imgCommon,
                data: [defaultImage, defaultImage]
            }
            break;
        case POST_ITEM_TYPE_SUBMENU.IMAGE[2]:
            result = {
                ...imgCommon,
                data: [defaultImage, defaultImage, defaultImage]
            }
            break;
        case POST_ITEM_TYPE.RELATED_TOPIC:
            result.text = 'Xem thêm:';
            result.textLink = 'Link';
            result.url = '#';
            break;
        case POST_ITEM_TYPE.VIDEO:
            result.text = 'Video Description';
            break;
        case POST_ITEM_TYPE.PATTERN:
            result.patternDetail = {
                name: "Pattern Name",
                price: "Học phí: 100.000",
                ravelryUrl: "",
                lovecraftsUrl: "",
                imageList: [noImageUrl],
                bigImageUrl: noImageUrl
            }
            break;
        case POST_ITEM_TYPE.GROUP:
            result.text = 'Group 1'
            result.content = [];
            break;
    }

    if (currentIndex !== -1 && currentIndex !== currentContent.length - 1) {
        // Handle push new content to currentIndex
        const tmp = [];
        for (let i = 0; i < currentContent.length; i++) {
            tmp.push(currentContent[i]);
            if (i === currentIndex) {
                tmp.push({ ...result });
            }
        }
        return [...tmp];
    } else {
        currentContent.push({ ...result });
        return [...currentContent];
    }
}
const wrapperActionAdmin = (item, index, styles = {}, onDeleteContentItem = () => { }, onAddNewContentItem = () => { }) => {
    return <div className={styles.wrapperAction}>
        {item}
        <div onClick={() => onDeleteContentItem(index)} className={styles.deleteButton}>X</div>
        <div className={styles.addButton}>
            <MenuAddComponentPost
                btnClass={styles.button}
                onClickMenuItem={item => {
                    onAddNewContentItem(item, undefined, index)
                }}
            />
        </div>
    </div>
}
const onChangeText = (e, index, contentData) => {
    return [...makeContentOnChangeText(e, index, contentData)];
}
const onDrop = (e, contentData) => {
    return [...makeContentDataOnDrop(e, contentData)];
}
const onChangeImageMultiple = ({ imgIndex, data, style }, index, key, contentData) => {
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
            _data = { ...style };
        }
        currentContent[index][key] = _data;
    }
    return [...currentContent];
}
const onChangeUrl = (key, e, index, contentData) => {
    const currentContent = [...contentData];
    if (index < currentContent.length) {
        currentContent[index][key] = e.target.value;
    }
    return [...currentContent];
}
const onImageResize = (size, index, contentData) => {
    if (index < contentData.length && size.width && size.height) {
        contentData[index].webWidth = size.width;
        contentData[index].webHeight = size.height;
    }
    return [...contentData];
}
const onChangeImage = async (e, index, contentData) => {
    if (e && e.target && e.target.files && e.target.files[0] && index < contentData.length) {
        if (isBigFile(e?.target?.files[0])) {
            alert('Kích thước file không được vượt quá 500KB');
            return;
        }
        let url = '';
        try {
            url = await uploadFile(e.target.files[0], process.env.NEXT_PUBLIC_publicImagesPath, false, `post_${(new Date()).getTime()}_image`, true);
        } catch (e) {

            url = '';
            alert('Có lỗi xảy ra khi tải ảnh lên.');
        }
        contentData[index].urlWeb = url;
    }
    return [...contentData];
}
const onChangePatternPreview = (e, index, key, contentData) => {
    const currentContent = [...contentData];
    if (Array.isArray(currentContent) && currentContent.length > index) {
        if (typeof currentContent[index] === 'object' && key && typeof key === 'string') {
            let value = '';
            if (typeof e === 'string' || Array.isArray(e) || (typeof e === 'object' && e.name)) {
                value = e;
            }
            currentContent[index][key] = value;
        }
    }
    return [...currentContent];
}
const onChangePatternDetail = (e, index, key, contentData) => {
    const currentContent = [...contentData];
    if (Array.isArray(currentContent) && currentContent.length > index) {
        if (typeof currentContent[index] === 'object' && typeof currentContent[index].patternDetail === 'object' && key && typeof key === 'string') {
            let value = '';
            if (typeof e === 'string' || Array.isArray(e) || (typeof e === 'object' && e.name)) {
                value = e;
            }
            if (typeof e === 'object' && e.target) {
                value = e.target.innerText;
            }
            currentContent[index].patternDetail[key] = value;
        }
    }
    return [...currentContent];
}
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
}
const onKeyDownParagraph = (e, addNewContentItem = () => { }) => {
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
                addNewContentItem(POST_ITEM_TYPE.PARAGRAPH, getSelectionText(), currentItemIndex);
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
                            const selection = window.getSelection(), range = document.createRange();
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
}
const onCaptionChange = (e, index, contentData) => {
    const currentContent = [...contentData];
    if (index < currentContent.length) {
        currentContent[index].imageDescription = e.target.innerText;
    }
    return [...currentContent];
}
const renderItemByType = ({ type, text, content, webWidth, webHeight, urlWeb, imageDescription = 'Image description', url, textLink, patternDetail = {}, imageUrl, previewUrl, patternId, buttonText, message, data = [], style = {}, expanded, isSubscribe }, index, styles = {},
    onDeleteContentItem = () => { },
    onAddNewContentItem = () => { },
    isMobile,
    isAdmin,
    contentData, onChangeContent = () => { }) => {
    let result = <p>{text}</p>,
        editComponent = <p onDragStart={onDragStart} draggable="true" suppressContentEditableWarning={true} contentEditable="true" onBlur={e => onChangeContent(onChangeText(e, index, contentData))} onKeyDown={e => onKeyDownParagraph(e, onAddNewContentItem)} data-index={index}>{text}</p>,
        viewComponent = <Linkify as="p" options={{ target: '_blank' }}>{text}</Linkify>;
    let subContent = <div></div>;
    const dropZoneDiv = <div id={index} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={e => onChangeContent(onDrop(e, contentData))} className={styles.dropZone}></div>;
    switch (type) {
        case POST_ITEM_TYPE.TITLE:
            editComponent = <div className={styles.bigTitle} onDragStart={onDragStart} draggable="true" suppressContentEditableWarning={true} contentEditable="true" onBlur={e => onChangeContent(onChangeText(e, index, contentData))}>{text}</div>;
            viewComponent = <div className={styles.bigTitle}>{text}</div>
            break;
        case POST_ITEM_TYPE.BIG_HEADER:
            editComponent = <h2 onDragStart={onDragStart} draggable="true" suppressContentEditableWarning={true} contentEditable="true" onBlur={e => onChangeContent(onChangeText(e, index, contentData))}>{text}</h2>;
            viewComponent = <h2>{text}</h2>
            break;
        case POST_ITEM_TYPE.MEDIUM_HEADER:
            editComponent = <h3 onDragStart={onDragStart} draggable="true" suppressContentEditableWarning={true} contentEditable="true" onBlur={e => onChangeContent(onChangeText(e, index, contentData))}>{text}</h3>;
            viewComponent = <h3>{text}</h3>
            break;
        case POST_ITEM_TYPE.SMALL_HEADER:
            editComponent = <h4 onDragStart={onDragStart} draggable="true" suppressContentEditableWarning={true} contentEditable="true" onBlur={e => onChangeContent(onChangeText(e, index, contentData))}>{text}</h4>;
            viewComponent = <h4>{text}</h4>
            break;
        case POST_ITEM_TYPE.RELATED_TOPIC:
            editComponent = <RelatedToMenu url={url} text={text} textLink={textLink} onDragStart={onDragStart} onChange={(key, e, index) => onChangeContent(onChangeUrl(key, e, index, contentData))} index={index} />;
            viewComponent = <div className={styles.relatedTo}><div className={styles.arrow}></div><div className={styles.textRelatedTo}>{text}</div><a href={url} onClick={(e) => {
                sendSlackMessage({ channel: SLACK_CHANNELS.FREE_CRAFTPATTERNS, message: `Related To Clicked:\\n*Post*: <${process.env.NEXT_PUBLIC_pageUrl}/tip/${id}|${title}>\\n*Url*: <${process.env.NEXT_PUBLIC_pageUrl}${url}|${textLink}>` })
            }}>{textLink}</a></div>
            break;
        case POST_ITEM_TYPE_SUBMENU.IMAGE[0]:
        case POST_ITEM_TYPE_SUBMENU.IMAGE[1]:
        case POST_ITEM_TYPE_SUBMENU.IMAGE[2]:
            if (Array.isArray(data)) {
                editComponent = <div onDragStart={onDragStart} onMouseDown={e => { e.currentTarget.draggable = true }} onMouseUp={e => { e.currentTarget.draggable = false }} draggable="false" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className={styles.imageWrapper} style={{ display: 'flex', justifyContent: 'center' }}>{data.map((img, idx) => <div style={{ ...style, width: 'unset', height: 'unset' }}>
                        <ImageUploadable resizeable={true} key={idx} wrapperStyle={{ width: style.width, height: style.height }} onChangeImage={({ imgSrc, imgFile }) => {
                            onChangeContent(onChangeImageMultiple({ imgIndex: idx, data: { imgSrc, imgFile } }, index, 'data', contentData));
                        }}
                            onChangeStyle={s => {
                                onChangeContent(onChangeImageMultiple({ style: { ...style, ...s } }, index, 'style', contentData));
                            }}
                            isEdit={true} src={img.url} />
                        <figcaption onBlur={e => onChangeContent(onChangeImageMultiple({ imgIndex: idx, data: { description: e.target.innerText } }, index, 'data', contentData))} suppressContentEditableWarning={true} contentEditable="true" className={styles.imageDescription}>{img.description}</figcaption>
                    </div>)}</div>
                    <MultiImageConfig
                        data={style}
                        onChange={data => {
                            onChangeContent(onChangeImageMultiple({ style: { ...data } }, index, 'style', contentData));
                        }}
                    />
                </div>;
                viewComponent = <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
                    <div className={styles.imageWrapper}>{data.map((img, idx) => <div style={{ ...style, width: 'unset', height: 'unset' }}>
                        <ImageUploadable className={styles.imageUpload} key={idx} wrapperStyle={{ width: style.width, height: style.height }} src={img.url} />
                        <figcaption className={styles.imageDescription}>{img.description}</figcaption>
                    </div>)}</div>
                </div>;
            }
            /**
             * Support old image component with urlWeb
             */
            if (urlWeb) {
                editComponent = <ImageUpload width={webWidth} height={webHeight} onResize={size => onChangeContent(onImageResize(size, index, contentData))} onDragStart={onDragStart} caption={<figcaption onBlur={e => onChangeContent(onCaptionChange(e, index, contentData))} suppressContentEditableWarning={true} contentEditable="true" className={styles.imageDescription}>{imageDescription}</figcaption>} onChange={async e => onChangeContent(await onChangeImage(e, index, contentData))} url={urlWeb} />;
                viewComponent = <div className={styles.imgWrapper}>
                    <img alt={imageDescription || 'Image with no description'} src={urlWeb} width={isMobile ? '100%' : webWidth} height={isMobile ? 'auto' : webHeight} />
                    <figcaption className={styles.imageDescription}>{imageDescription}</figcaption>
                </div>
            }
            /** */
            break;
        case POST_ITEM_TYPE.ADS:
            editComponent = <div onDragStart={onDragStart} draggable="true" className={styles.ads}>ADS HERE</div>;
            viewComponent = <AdBanner />
            break;
        case POST_ITEM_TYPE.VIDEO:
            editComponent = <PostVideo onDragStart={onDragStart} url={url} onChange={e => onChangeContent(onChangeUrl('url', e, index, contentData))} onChangeText={e => onChangeContent(onChangeText(e, index, contentData))} text={text} />;
            viewComponent = <div className={styles.imgWrapper}>
                {url && <iframe title={text} src={`https://www.youtube.com/embed/${url}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
                <figcaption className={styles.imageDescription}>{text}</figcaption>
            </div>;
            break;
        case POST_ITEM_TYPE.SUBCRIBE_ME:
            subContent = <div className={styles.subcribeMe}>
                <YouTubeSubscribe
                    channelid={'UCf0jCxiSGh_pBExFN3k1CIA'}
                    theme={"default"}
                    layout={"full"}
                    count={"hidden"}
                />
                <img alt="Subcribe me" src="/images/subcribe-me.png" />
            </div>;
            editComponent = subContent;
            viewComponent = subContent;
            break;
        case POST_ITEM_TYPE.BUY_ME_A_COFFEE:
            subContent = <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a onClick={() => {
                    sendSlackMessage({ channel: SLACK_CHANNELS.FREE_CRAFTPATTERNS, message: `An user has clicked on the buy me a coffee:\\n*Post*: <${process.env.NEXT_PUBLIC_pageUrl}/tip/${id}|${title}>` })
                }} href="https://www.buymeacoffee.com/cheryx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: 60, width: 217 }} /></a>
            </div>;
            editComponent = <div onDragStart={onDragStart} draggable="true">{subContent}</div>;
            viewComponent = subContent;
            break;
        case POST_ITEM_TYPE.PATTERN:
            subContent = <PatternDetail onChange={(e, index, key) => onChangeContent(onChangePatternDetail(e, index, key, contentData))} {...patternDetail} index={index} isAdmin={isAdmin} />;
            editComponent = <div onDragStart={onDragStart} draggable="true">{subContent}</div>;
            viewComponent = subContent;
            break;
        case POST_ITEM_TYPE.PATTERN_PREVIEW:
            subContent = <PatternPreview patternId={patternId} isSubscribe={isSubscribe} buttonText={buttonText} message={message} previewUrl={previewUrl} onChange={(e, index, key) => onChangeContent(onChangePatternPreview(e, index, key, contentData))} imageUrl={imageUrl} index={index} isAdmin={isAdmin} />;
            editComponent = <div onDragStart={onDragStart} draggable="true">{subContent}</div>;
            viewComponent = subContent;
            break;
        case POST_ITEM_TYPE.GROUP:
            subContent = <GroupContent expanded={expanded} isEdit={isAdmin} isMobile={isMobile} title={text} content={content} onChange={(e, key) => onChangeContent(onChangeGroupDetail(e, index, key, contentData))} />
            editComponent = <div onDragStart={onDragStart} draggable="true">
                {subContent}
            </div>
            viewComponent = subContent;
            break;
    }
    if (isAdmin) {
        result = wrapperActionAdmin(<>{dropZoneDiv} {editComponent}</>, index, styles, onDeleteContentItem, onAddNewContentItem)
    } else {
        result = viewComponent;
    }
    return result;
}
