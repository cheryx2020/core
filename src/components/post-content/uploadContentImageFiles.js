import { uploadFile } from "@cheryx2020/utils";

export const uploadContentImageFiles = _contentData => {
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
                    __contentData[i].imageUrl = await uploadFile(__contentData[i].imageUrl, process.env.NEXT_PUBLIC_publicImagesPath, true, `pattern_detail_imageUrl_${patternName || ((new Date()).getTime())}`, true);
                    if (__contentData[i].imageUrl) {
                        listFileUploaded.push(__contentData[i].imageUrl)
                    }
                }
                /**
                 * Handle upload 2, 3 images component
                 */
                if (Array.isArray(__contentData[i].data)) {
                    for (let j = 0; j < __contentData[i].data.length; j++) {
                        if (typeof __contentData[i].data[j] === 'object' && typeof __contentData[i].data[j].imgFile === 'object') {
                            __contentData[i].data[j].url = await uploadFile(__contentData[i].data[j].imgFile, process.env.NEXT_PUBLIC_publicImagesPath, true, `post-images-${(new Date()).getTime()}`, true);
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
        resolve({ updatedContent: __contentData, listFileUploaded });
    });
}