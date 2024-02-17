import styles from './PatternItem.module.scss';
import ImageUploadable from '../image-uploadable/image-uploadable';
import { APIService, setShowLoading, handleApiError } from "@cheryx2020/api-service";
import React, { useEffect, useState } from 'react';
import PatternName from '../pattern-name/pattern-name';
import Select from 'react-select'

const NoImage = 'https://cheryx.com/images/no-image.png';
const PatternItem = ({ useRouter = () => { }, useDispatch = () => { }, imageUrl = NoImage, language = 'vi', _id, description, name, nameColor = '#0A7BCA', isMobile, ravelryUrl, patternId = '', order, isAdmin, isAddNew, isEditing, isFree, isBottom, listPatternDetail = [], apiDelete = 'remove-pattern', apiEdit = 'edit-pattern', apiAdd = 'add-pattern', onClickUrl = 'edit-pattern-detail' }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [prNameColor, setPrNameColor] = useState(nameColor);
  const [des, setDes] = useState(isAddNew ? 'Description' : description);
  const [prName, setPrName] = useState(isAddNew ? 'Pattern Name' : name);
  const [patternFile, setPatternFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [isEdit, setIsEdit] = useState(isEditing);
  const [_isFree, setIsFree] = useState(isFree);
  const [prRavelryUrl, setPrRavelryUrl] = useState(ravelryUrl);
  const [selectedPatternDetail, setSelectedPatternDetail] = useState(null);
  const [prOrder, setPrOrder] = useState(order);
  const router = useRouter();
  const listVariable = {
    prNameColor,
    des,
    prName,
    prRavelryUrl,
    nameColor,
    description,
    name,
    ravelryUrl,
    _isFree,
    prOrder
  }
  useEffect(() => {
    setPrName(name);
    setIsFree(isFree);
    setDes(description);
    setPrNameColor(nameColor);
    setIsEdit(isEditing);
    setImgSrc(imageUrl || NoImage);
    }, [name, isFree, description, nameColor, isEditing, imageUrl]);
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
  const makeUrl = (baseUrl) => {
    let url = baseUrl;
    try {
      if (url?.includes(process.env.NEXT_PUBLIC_pageUrl) || patternId) {
        const split = url.split('/'), patternDetailPath = 'pattern-detail';
        let path = 'tip';
        if (url.includes(patternDetailPath) || patternId) {
          path = patternDetailPath;
        }
        url = `/${path}/${patternId ? patternId : split[split.length - 1]}`;
      }
    } catch (e) {
      console.log(e);
    }
    return url;
  }
  const onClickPatternItem = () => {
    let url = ravelryUrl;
    if (!isAdmin) {
      if (url?.includes(process.env.NEXT_PUBLIC_pageUrl) || patternId) {
        const split = url.split('/'), patternDetailPath = 'pattern-detail';
        let path = 'tip';
        if (url.includes(patternDetailPath) || patternId) {
          path = patternDetailPath;
        }
        router.push(`/${path}/${patternId ? patternId : split[split.length - 1]}`).then(() => window.scrollTo(0, 0));
      } else {
        ravelryUrl && window.open(ravelryUrl);
      }
    }
  }
  const onClickPatternDetail = () => {
    if (patternId) {
      router.push(`${onClickUrl}/${patternId}`);
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
        APIService.put(`${apiEdit}?id=${_id}`, (imgFile || patternFile) ? bodyFormData : data, imgFile ? {
          headers: { 'Content-Type': 'multipart/form-data' }
        } : {}).then(() => {
          alert('Cập nhật thành công');
          setShowLoading(dispatch, false);
          window.location.reload();
        }).catch(err => {
          setShowLoading(dispatch, false);
          handleApiError(err);
        });
        return;
      }
      if (!imgFile) {
        alert('Vui lòng chọn hình');
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
      APIService.post(apiAdd, bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        // Handle create post success
        alert('Thêm thành công');
        setShowLoading(dispatch, false);
        window.location.reload();
      }).catch(err => {
        setShowLoading(dispatch, false);
        handleApiError(err);
      });
    }
  }
  const onClickDelete = () => {
    if (confirm('Bạn có chắc muốn xoá không?')) {
      if (_id) {
        setShowLoading(dispatch, true);
        APIService.delete(`${apiDelete}?id=${_id}`).then(res => {
          setShowLoading(dispatch, false);
          alert('Xoá thành công');
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
  const onChangeImage = async ({ imgSrc, imgFile }) => {
    setImgSrc(imgSrc);
    setImgFile(imgFile);
  }

  return <div href={makeUrl(ravelryUrl)} className={`${styles.wrapper} ${isBottom ? styles.isBottom : ''}`} style={{
    width: isAddNew ? '100%' : 'initial',
    height: isAddNew ? '100%' : 'initial',
    backgroundColor: isAddNew ? 'inherit' : 'inherit',
    padding: isAddNew ? 5 : 0,
  }} onClick={onClickPatternItem}>
    {isAdmin && <div className={styles.editMenu}>
      {isEdit && <label className={styles.isFree}><input type="checkbox" onChange={onChangeIsFree} checked={_isFree} /> Is Free</label>}
      {isEdit && !isAddNew && <div className={styles.button} onClick={onClickCancel}>Cancel</div>}
      <div onClick={onClickEdit} className={styles.button}>{isEdit ? 'Save' : 'Edit'}</div>
      {!isAddNew && !isEdit && <div onClick={onClickDelete} className={styles.button}>Delete</div>}
      {!isAddNew && !isEdit && <div onClick={onClickPatternDetail} className={styles.button}>Detail</div>}
    </div>}
    {_isFree && <div className={`${styles.freeTag} ${isBottom ? styles.isBottom : ''}`}></div>}
    <ImageUploadable className={styles.image} isEdit={isEdit} src={imgSrc} onChangeImage={onChangeImage} />
    {isMobile ? <div className={styles.mobileContent}>{content}</div> : content}
    {isEdit && <div style={{ marginBottom: 5 }}><Select
      placeholder="Chọn bài viết"
      classNamePrefix={'muti-select'}
      value={selectedPatternDetail}
      options={listPatternDetail}
      onChange={item => { setSelectedPatternDetail(item); }}
      isMulti={false}
    /></div>}
    {isEdit && <input placeholder="Thứ tự" value={prOrder} onChange={e => setPrOrder(e.target.value)} />}
  </div>
}
export default PatternItem