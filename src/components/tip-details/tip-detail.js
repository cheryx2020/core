import React, { useEffect, useState } from 'react';
import { APIService, handleApiError, setShowLoading } from '@cheryx2020/api-service';
import { deleteFile, getDescriptionFromContent } from "@cheryx2020/utils";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from "react-share";
import styles from './TipDetail.module.scss';
import { getPostId, PostContent } from '../post-content/postUtils';
import { POST_ITEM_TYPE } from '../menu-add-component-post/menu-add-component-post';
import { useMemo } from 'react';
import { uploadContentImageFiles } from '../post-content/uploadContentImageFiles';

const TipDetail = ({ ProductJsonLd ,Link, useDispatch = () => {}, setIsEdit = () => {}, useRouter = () => {}, seo, data = { title: '', content: [], isPattern: false, isFree: false, seoTitle: '', seoDescription: '' }, isMobile, isAdmin, isEdit, category, isPatternDetail }) => {
  const defaultTitle = data?.title || 'Post title';
  const defaultContent = data?.content || [];
  const { title, content, seoTitle, seoDescription, id } = data;
  const [titleData, setTitleData] = useState(defaultTitle);
  const [contentData, setContentData] = useState(defaultContent);
  const [_isPattern, setIsPattern] = useState(data.isPattern ? true : false);
  const [_isFree, setIsFree] = useState(data.isFree ? true : false);
  useEffect(() => {
    if (data?._id) {
      setTitleData(defaultTitle);
      setContentData(defaultContent)
    }
  }, [isEdit, data]);
  const router = useRouter();
  const dispatch = useDispatch();
  const resetData = () => {
    setTitleData(defaultTitle);
    setContentData([]);
  }
  const onClickCancel = () => {
    setIsEdit(false);
  }
  const onClickSave = async () => {
    if (!category && !isPatternDetail) {
      alert('Bài viết phải thuộc về 1 loại nào .Chọn category bên menu bên trái');
      return false;
    }
    let _contentData = contentData, _listFileUploaded = [];
    // Handle upload image for content
    if (Array.isArray(_contentData)) {
      const { updatedContent, listFileUploaded } = await uploadContentImageFiles(_contentData);
      _contentData = updatedContent;
      _listFileUploaded = listFileUploaded;
    }
    const body = {
      language: process?.env?.NEXT_PUBLIC_language || 'en',
      title: titleData,
      id: getPostId(titleData),
      _id: data?._id,
      category: isPatternDetail ? 'pattern-detail' : category,
      isPattern: _isPattern,
      isFree: _isFree,
      content: JSON.stringify(_contentData)
    }
    if (isPatternDetail) {
      body.isPatternDetail = true;
    }
    if (confirm('Bạn có chắc chắn muốn lưu bài viết này không?')) {
      setShowLoading(dispatch, true);
      APIService.post(`${data?._id ? 'edit' : 'create'}-post`, body).then(res => {
        // Handle create post success
        if (!data?._id) {
          resetData();
        }
        alert('Lưu thành công');
        setShowLoading(dispatch, false);
      }).catch(err => {
        setShowLoading(dispatch, false);
        handleApiError(err);
      });
    } else {
      console.log('User cancel, start delete files');
      if (Array.isArray(_listFileUploaded)) {
        _listFileUploaded.forEach(file => {
          deleteFile(file);
        })
      }
    }
  }
  const onChangeContent = content => {
    // Handle update title for pattern detail
    try {
      const patternObj = content.find(i => i.type === POST_ITEM_TYPE.PATTERN);
      if (Array.isArray(content) && patternObj && typeof patternObj === 'object' && patternObj.patternDetail && patternObj.patternDetail.name) {
        setTitleData(patternObj.patternDetail.name);
      }
    } catch(e) {
      console.log(e);
    }
    setContentData([...content]);
  }
  
  /**
   * Detect if the post only has 1 video, then move it to the header as a main content and add "Video" prefix for the post title
   */
  let video = null;
  const videos = content?.filter(item => item.type === POST_ITEM_TYPE.VIDEO);
  if (videos?.length === 1) {
    video = videos[0];
  }
  const postTitle = useMemo(() => {
    let _title = title;
    if (!title?.toLowerCase()?.includes("video")) {
      _title =  `Video - ${title}`;
    }
    return _title;
  },[video,title])
  const siteName = seo?.site_name || 'Cheryx';
  return <><article className={styles.wrapper}>
    {isEdit && <div className={styles.adminTopHeader}>
      {!isPatternDetail && <input value={getPostId(titleData)} disabled={true} className={styles.adminMenuInputPostId}></input>}
      <div className={styles.actionButtons}>
        {!isPatternDetail && _isPattern && <label className={styles.checkBox}><span>Is Free</span><input checked={_isFree} type="checkbox" onChange={() => setIsFree(!_isFree)} /></label>}
        {!isPatternDetail && <label className={styles.checkBox}><span>Is Pattern</span><input checked={_isPattern} type="checkbox" onChange={() => setIsPattern(!_isPattern)} /></label>}
      </div>
    </div>}
    {!isPatternDetail && <header>
      {isEdit ? <h1 suppressContentEditableWarning={true} contentEditable="true" onBlur={(e) => { setTitleData(e.target.innerText) }}>{titleData}</h1> : <h1 itemProp="headline name">{postTitle}</h1>}
      {isEdit ? null : (video ? <PostContent useDispatch={useDispatch} data={[video]}/> : null)}
    </header>}
    <div itemProp="text">
    <PostContent
        useDispatch={useDispatch}
        isShowBigMenu={isAdmin}
        data={isAdmin ? contentData : ((video && !isPatternDetail) ? content?.filter(item => item.type !== POST_ITEM_TYPE.VIDEO) : content)}
        isMobile={isMobile}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onChangeData={onChangeContent}
        onSaveClick={onClickSave}
        onCancelClick={onClickCancel}
        linkComponent={Link}
      />
    </div>
    <div className={styles.shareZone}>
      <div className={styles.text}>Share:</div>
      <div className={styles.shareBtn}><FacebookShareButton url={`${process?.env?.NEXT_PUBLIC_pageUrl}/tip/${data.id}`} quote={postTitle} className="Demo__some-network__share-button"><FacebookIcon size={32} round/></FacebookShareButton></div>
      <div className={styles.shareBtn}><TwitterShareButton url={`${process?.env?.NEXT_PUBLIC_pageUrl}/tip/${data.id}`} quote={postTitle} className="Demo__some-network__share-button"><TwitterIcon size={32} round/></TwitterShareButton></div>
    </div>
  </article>
  {isPatternDetail && <ProductJsonLd
      productName={seoTitle ? seoTitle : postTitle}
      images={[
        `https://cheryx.com/images/${id}/${id}-1200x1200.png`,
        `https://cheryx.com/images/${id}/${id}-1200x900.png`,
        `https://cheryx.com/images/${id}/${id}-1200x675.png`
      ]}
      description={seoDescription ? seoDescription : getDescriptionFromContent(content)}
      brand={siteName}
      color="#F08C5F"
      manufacturerName={siteName}
      manufacturerLogo="https://cheryx.com/images/cheryx-logo-2.png"
      material="pdf"
      slogan="Knit a dream"
      disambiguatingDescription="Very easy to follow, perfect for the beginner knitter."
      releaseDate="2020-12-13T10:45:00+07:00"
      productionDate="2020-12-13T10:45:00+07:00"
      purchaseDate="2020-12-13T10:45:00+07:00"
      reviews={[
        {
          author: {
            type: 'Person',
            name: 'Jim',
          },
          datePublished: '2021-02-10T10:45:00+07:00',
          reviewBody:
            'This is my favorite product yet! Thanks Cheryx for the awesome pattern.',
          name: 'So awesome!!!',
          reviewRating: {
            bestRating: '5',
            ratingValue: '5',
            worstRating: '5',
          },
          publisher: {
            type: 'Organization',
            name: 'TwoVit',
          },
        },
      ]}
      aggregateRating={{
        ratingValue: '5.0',
        reviewCount: '10',
      }}
      offers={[
        {
          price: '6.00',
          priceCurrency: 'USD',
          priceValidUntil: '2022-12-13',
          itemCondition: 'https://schema.org/UsedCondition',
          availability: 'https://schema.org/InStock',
          url: 'https://www.ravelry.com/stores/cheryx',
          seller: {
            name: 'Ravelry',
          },
        }
      ]}
      mpn="64639"
      sku="64639"
    />}
  </>
}
export default TipDetail;