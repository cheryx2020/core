import styles from './PatternItem.module.scss';
import ImageUploadable from '../image-uploadable/image-uploadable';
import { APIService, setShowLoading, handleApiError } from "@cheryx2020/api-service";
import { useEffect, useState } from 'react';
import PatternName from '../pattern-name/pattern-name';
import Select from 'react-select'
const PatternItem = ({ useRouter = () => {}, useDispatch = () => {}, imageUrl = '/images/no-image.png', language = 'vi', _id, description, name, nameColor = '#0A7BCA', isMobile, ravelryUrl, patternId = '', order, isAdmin, isAddNew, isEditing, isFree, isBottom, listPatternDetail = [] }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [prNameColor, setPrNameColor] = useState(nameColor);
  const [des, setDes] = useState(isAddNew ? 'Description' : description);
  const [prName, setPrName] = useState(isAddNew ? 'Pattern Name' : name);
  const [patternFile, setPatternFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [isEdit, setIsEdit] = useState(isEditing);
  const [_isFree, setIsFree] = useState(isFree);
  const [prRavelryUrl, setPrRavelryUrl] = useState(ravelryUrl);
  const [prPatternId, setPrPatternId] = useState(patternId);
  const [selectedPatternDetail, setSelectedPatternDetail] = useState(null);
  const [isShowUrl, setIsShowUrl] = useState(true);
  const [prOrder, setPrOrder] = useState(order);
  const router = useRouter();
  const listVariable = {
    prNameColor,
    des,
    prName,
    prRavelryUrl,
    prPatternId,
    nameColor,
    description,
    name,
    ravelryUrl,
    _isFree,
    prOrder
  }
  useEffect(() => {
    if (patternId && Array.isArray(listPatternDetail) && listPatternDetail.length > 0) {
      setSelectedPatternDetail(listPatternDetail.find(item => item.value === patternId));
    }
  }, [patternId, listPatternDetail]);
  const onChangeIsFree = e => {
    setIsFree(!_isFree);
  }
  const content = <><div onBlur={(e) => {
    setDes(e.target.innerText);
  }} className={styles.description} suppressContentEditableWarning={true} contentEditable={isEdit ? 'true' : 'false'}>{des}</div>
    <PatternName
      isBottom={isBottom}
      onBlur={(e) => {
      setPrName(e.target.innerText);
    }} nameColor={prNameColor} onChangeColor={(color) => setPrNameColor(color)} isEdit={isEdit} text={prName} />
  </>;
  const makeUrl = () => {
    let url = ravelryUrl;
    try {
      if (url.includes(process.env.NEXT_PUBLIC_pageUrl) || patternId) {
        const split = url.split('/'), patternDetailPath = 'pattern-detail';
        let path = 'tip';
        if (url.includes(patternDetailPath) || patternId) {
          path = patternDetailPath;
        }
        url = `/${path}/${patternId ? patternId : split[split.length - 1]}`;
      }
    } catch(e) {
      console.log(e);
    }
    return url;
  }
  const onClickPatternItem = () => {
    let url = ravelryUrl;
    if (!isAdmin) {
      if (url.includes(process.env.NEXT_PUBLIC_pageUrl) || patternId) {
        const split = url.split('/'), patternDetailPath = 'pattern-detail';
        let path = 'tip';
        if (url.includes(patternDetailPath) || patternId) {
          path = patternDetailPath;
        }
        router.push(`/${path}/${patternId ? patternId : split[split.length - 1]}`).then(() => window.scrollTo(0, 0));
      } else {
        window.open(ravelryUrl);
      }
    } else {
      // Handle is admin
      if (isFree && url.includes(process.env.NEXT_PUBLIC_pageUrl)) {
        // Handle click to free pattern
        // const split = url.split('/');
        // router.push(`/edit-post/${split[split.length - 1]}`);
      } else {
        // if (patternId) {
        //   router.push(`/pattern-detail/${patternId}?isAdmin=true`);
        // }
      }
    }
  }
  const onClickPatternDetail = () => {
    if (patternId) {
      router.push(`edit-pattern-detail/${patternId}`);
    }
  }
  const dispatch = useDispatch();
  const onClickEdit = (e) => {
    e.stopPropagation();
    if (!isEdit) {
      setIsEdit(true);
    } else {
      const bodyFormData = new FormData();
      let data = {};
      const mapKeys = {
        des: 'description',
        prName: 'name',
        prNameColor: 'nameColor',
        prRavelryUrl: 'ravelryUrl',
        _isFree: 'isFree',
        prOrder: 'order'
      };
      for (const [key, value] of Object.entries(mapKeys)) {
        if (listVariable[key] != listVariable[value]) {
          data[value] = listVariable[key];
        }
      }
      for (const [key1, value1] of Object.entries(data)) {
        bodyFormData.set(key1, value1);
      }
      if (selectedPatternDetail && selectedPatternDetail.value) {
        bodyFormData.set('patternId', selectedPatternDetail.value);
        data.patternId = selectedPatternDetail.value;
      }
      // Handle on save
      if (!isAddNew) {
        if (!_id) {
          alert('Không tìm thấy id');
          return;
        }
        if (imgFile) {
          bodyFormData.set('file', imgFile);
          bodyFormData.set('requestAbsoluteUrlResponse', true);
        }
        if (patternFile) {
          bodyFormData.set('patternFile', patternFile);
        }
        setShowLoading(dispatch, true);
        APIService.put(`edit-pattern?id=${_id}`, (imgFile || patternFile) ? bodyFormData : data, imgFile ? {
          headers: { 'Content-Type': 'multipart/form-data' }
        } : {}).then(res => {
          // Handle create post success
          alert('Cập nhật pattern thành công');
          setShowLoading(dispatch, false);
          window.location.reload();
        }).catch(err => {
          setShowLoading(dispatch, false);
          handleApiError(err);
        });
        return;
      }
      if (!imgFile) {
        alert('Vui lòng chọn hình của mẫu');
        return;
      }
      setShowLoading(dispatch, true);
      bodyFormData.set('requestAbsoluteUrlResponse', true);
      bodyFormData.set('file', imgFile);
      bodyFormData.set('name', prName);
      bodyFormData.set('description', des);
      bodyFormData.set('nameColor', prNameColor);
      bodyFormData.set('ravelryUrl', prRavelryUrl);
      bodyFormData.set('language', language);
      if (patternFile) {
        bodyFormData.set('patternFile', patternFile);
      }
      APIService.post(`add-pattern`, bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        // Handle create post success
        alert('Thêm pattern thành công');
        setShowLoading(dispatch, false);
        window.location.reload();
      }).catch(err => {
        setShowLoading(dispatch, false);
        handleApiError(err);
      });
    }
  }
  const onClickDelete = () => {
    if (confirm('Bạn có chắc muốn xoá mẫu này không?')) {
      if (_id) {
        setShowLoading(dispatch, true);
        APIService.delete(`remove-pattern?id=${_id}`).then(res => {
          setShowLoading(dispatch, false);
          alert('Xoá mẫu thành công');
          window.location.reload();
        }).catch(err => {
          setShowLoading(dispatch, false);
          handleApiError(err);
        });
      } else {
        alert('Not found pattern id');
      }
    }
  }
  const onClickCancel = () => {
    setIsEdit(false);
  }
  const onChangeImage = async ({imgSrc, imgFile}) => {
    setImgSrc(imgSrc);
    setImgFile(imgFile);
  }

  const onChangeFile = (e) => {
    try {
      setPatternFile(e.target.files[0]);
    } catch(e) {
      console.log(e);
    }
  }
  // const { isAdmin : _isAdmin } = router.query || {};
  // if (_isAdmin) {
  //     isAdmin = true;
  // }
  return <div href={makeUrl()} className={`${styles.wrapper} ${isBottom ? styles.isBottom : ''}`} style={{
    width: isAddNew ? '100%' : 'initial',
    height: isAddNew ? '100%' : 'initial',
    backgroundColor: isAddNew ? 'inherit' : 'inherit',
    padding: isAddNew ? 5 : 0,
  }} onClick={onClickPatternItem}>
    {isAdmin && <div className={styles.editMenu}>
      {isEdit && <label className={styles.isFree}><input type="checkbox" onChange={onChangeIsFree} checked={_isFree}/> Is Free</label>}
      {isEdit && !isAddNew && <div className={styles.button} onClick={onClickCancel}>Cancel</div>}
      <div onClick={onClickEdit} className={styles.button}>{isEdit ? 'Save' : 'Edit'}</div>
      {!isAddNew && !isEdit && <div onClick={onClickDelete} className={styles.button}>Delete</div>}
      {!isAddNew && !isEdit && <div onClick={onClickPatternDetail} className={styles.button}>Detail</div>}
    </div>}
    {_isFree && <div className={`${styles.freeTag} ${isBottom ? styles.isBottom : ''}`}></div>}
    <ImageUploadable isEdit={isEdit} isAddNew={isAddNew} isAdmin={isAdmin} width={isBottom ? 468/2 : 468} height={isBottom ? 333/2 : 333} src={isEdit ? imgSrc : imageUrl} onChangeImage={onChangeImage} />
    {isMobile ? <div className={styles.mobileContent}>{content}</div> : content}
    {/* {isEdit && isShowUrl && <input placeholder="Link nhóm" value={prRavelryUrl} onChange={e => { setPrRavelryUrl(e.target.value); selectedPatternDetail != null && setSelectedPatternDetail(null)}} />} */}
    {/* {isEdit && <input placeholder="Id mẫu" value={prPatternId} onChange={e => setPrPatternId(e.target.value)} />} */}
    {isEdit && <div style={{marginBottom: 5}}><Select
                    placeholder="Chọn bài viết"
                    classNamePrefix={'muti-select'}
                    value={selectedPatternDetail}
                    options={listPatternDetail} 
                    onChange={item => {setSelectedPatternDetail(item); setIsShowUrl(false)}}
                    isMulti={false}
                    /></div>}
    {isEdit && <input placeholder="Thứ tự" value={prOrder} onChange={e => setPrOrder(e.target.value)} />}
    {/* {isEdit && <div className={styles.patternUpload}><div className={styles.label}>Upload Pattern File: </div><input type="file" onChange={onChangeFile} /></div>} */}
    {/* {isAdmin && googleDriveFileId && <Link href={`https://drive.google.com/uc?export=view&id=${googleDriveFileId}`}><a target="_blank">Pattern File: {googleDriveFileId}</a></Link>} */}
  </div>
}
export default PatternItem