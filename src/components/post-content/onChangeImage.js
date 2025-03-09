import { uploadFile, isBigFile } from "@cheryx2020/utils";

export const onChangeImage = async (e, index, contentData) => {
    if (!contentData) {
        return [];
    }
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