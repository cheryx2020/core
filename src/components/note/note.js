import React from 'react';
import styles from './Note.module.scss';

const DEFAULT_TEXT = [
    "Mình không làm file PDF, các lớp hướng dẫn đan là dạng Nhóm (Group) trên Facebook gồm công thức đan, video chi tiết hướng dẫn các công đoạn đan, cách khâu ráp, nhồi gòn tạo hình và các mẹo để tạo nên sản phẩm hoàn thiện.",
    "Chỉ cần biết đan cơ bản, có thể tham gia lớp và hoàn thành sản phẩm",
    "Nếu bạn chưa biết đan, ghé qua mục “Tự học đan len cơ bản” để bắt đầu tập đan thử nhé!",
];

const Note = ({title = "Lưu ý", text = DEFAULT_TEXT }) => {
    return <div className={styles.wrapper}>
        <div className={styles.noteTitle}>{title}</div>
        {Array.isArray(text) && text.map((item,i) => <div className={styles.p} key={i}><div className={styles.dot}></div> {item}</div>)}
    </div>
}
export default Note;