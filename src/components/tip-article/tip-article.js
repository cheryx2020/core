import React from 'react';
import styles from './TipArticle.module.scss';
import { APIService, handleApiError, setShowLoading } from '@cheryx2020/api-service';
import { transformImageSrc, getDescriptionFromContent, isBigFile, uploadFile } from "@cheryx2020/utils";

const TipArticle = ({Image, Link, useDispatch = () => {}, data, isAdmin, onDeletePostSuccess = () => {}, unoptimized = true}) => {
  const dispatch = useDispatch();
  const onClickDelete = () => {
    if (confirm(`Bạn có chắn chắn muốn xoá bài viết '${data.title}'?`)) {
      setShowLoading(dispatch, true);
      if (!data || data && !data.id) {
        alert('Không tìm thấy id bài viết');
        return false;
      }
      APIService.delete(`delete-post?id=${data.id}`).then(res => {
        setShowLoading(dispatch, false);
        alert('Xoá bài viết thành công');
        onDeletePostSuccess();
      }).catch(err => {
        setShowLoading(dispatch, false);
        handleApiError(err);
      });
    }
  }
  const onChangeImage = async (e) => {
    setShowLoading(dispatch, true);
    if (e && e.target && e.target.files && e.target.files[0]) {
      let url = '';
      try {
        if (isBigFile(e?.target?.files[0], 200000)) {
          alert('Kích thước file không được vượt quá 200KB');
          return;
        }
        url = await uploadFile(e.target.files[0], process?.env?.NEXT_PUBLIC_publicImagesPath, false, `post_${data.id}_thubnail`, true);
      } catch(e) {
        url = '';
        alert('Có lỗi xảy ra khi tải ảnh lên');
        console.log(e);
      } finally {
        setShowLoading(dispatch, false);
      }
      if (url) {
        // Call api update post
        APIService.post(`edit-post`, {id: data.id ,imgUrl: url}).then(res => {
          // Handle create post success
          alert('Cập nhật hình ảnh thành công');
          setShowLoading(dispatch, false);
          window.location.reload();
        }).catch(err => {
          setShowLoading(dispatch, false);
          handleApiError(err);
        });
      } else {
        alert('Url hình ảnh không hợp lệ');
      }
    }
  }
  const onChangeIsBig = e => {
    if (e.target.checked && confirm(`Bài viết '${data.title}' sẽ trở thành chủ đề lớn trên trang chính phải không?`)) {
      setShowLoading(dispatch, true);
      // Call api update isBig
      APIService.post(`edit-post`, {id: data.id ,isBig: true}).then(res => {
        // Handle create post success
        alert('Cập nhật bài viết thành công');
        setShowLoading(dispatch, false);
        window.location.reload();
      }).catch(err => {
        setShowLoading(dispatch, false);
        handleApiError(err);
      });
    } else {
      e.target.checked = false;
    }
  }
  const onChangeIsShowAtHome = e => {
    setShowLoading(dispatch, true);
    // Call api update isBig
    APIService.post(`edit-post`, {id: data.id ,isShowAtHome: e.target.checked ? true : false}).then(res => {
      // Handle create post success
      alert('Cập nhật bài viết thành công');
      setShowLoading(dispatch, false);
      window.location.reload();
    }).catch(err => {
      setShowLoading(dispatch, false);
      handleApiError(err);
    });
  }
  return <article className={styles.wrapper}>
    {isAdmin && <div className={styles.editButtonZone}>
      {!data.isPattern && <div className={styles.checkIsBig}>
        <label><span>Big Item</span><input checked={data.isBig} type="checkbox" onChange={onChangeIsBig}/></label>
      </div>}
      {!data.isPattern && <div className={styles.checkIsBig}>
        <label><span>Show at home</span><input checked={data.isShowAtHome} type="checkbox" onChange={onChangeIsShowAtHome}/></label>
      </div>}
      <div className={styles.editButton}>
        <Link href={`/edit-post/${data.id}`}>Edit</Link>
      </div>
      <div className={styles.deleteButton} onClick={onClickDelete}>Delete</div>
    </div>}
    <Link href={`/${isAdmin ? 'preview' : 'tip'}/${data.id}`}>
      <div className={styles.image}>
        {isAdmin && <div className={styles.imageMenu} onClick={e => e.stopPropagation()}>
          <label><div>Upload</div><input hidden="true" type="file" onChange={onChangeImage}></input></label>
        </div>}
        <Image unoptimized={unoptimized} layout='fill' src={transformImageSrc(data.imgUrl)}/>
      </div>
    </Link>
    <div className={styles.info}>
      <Link href={`/${isAdmin ? 'preview' : 'tip'}/${data.id}`}><a className={styles.title}>{data.title}</a></Link>
      <div className={styles.description}>{getDescriptionFromContent(data.content)}</div>
      {/* <div className={styles.seeMore}>{`See more >>`}</div> */}
    </div>
  </article>
}
export default TipArticle;