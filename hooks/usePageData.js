import { useState } from 'react';
import { APIService } from '@cheryx2020/api-service';
import { getDomain } from '@cheryx2020/utils';

export const CIRCLE_IMAGE = "paterns-circle-images";

function usePageData({ page, pageName, router, domain = getDomain() }) {
    const [pageData, setPageData] = useState(JSON.parse(JSON.stringify(page)));
    const [urlChanges, setUrlChanges] = useState({});
    const [loading, setLoading] = useState(false);
    const [isDurty, setIsDurty] = useState(false);
    const onDataPageChange = (id, data) => {
        setIsDurty(true);
        let file = data.data.imgFile;
        if (data?.url) {
            if (id === CIRCLE_IMAGE) {
                const fileName = data.data.imgFile.name;
                const existingFile = data.data.imgFile;
                const blob = existingFile.slice(0, existingFile.size);
                const imgWidth = pageData?.find(i => i.id === CIRCLE_IMAGE)?.imgMaxWidth ?? 800;
                file = new File([blob], `${fileName}fileSize${imgWidth}`);
            }
            setUrlChanges({ ...urlChanges, [data.url]: file });
        }
        if (id === CIRCLE_IMAGE) {
            // Handle keep data for circle image
            for (let i = 0; i < pageData.length; i++) {
                // find index changes
                if (pageData[i]?.id === CIRCLE_IMAGE) {
                    const index = pageData[i]?.value?.findIndex(item => item === data?.url);
                    if (index > -1) {
                        // We have a rule for the value of a page config to handle upload files
                        pageData[i].value[index] = `${pageName}_${file.name?.toLowerCase()}`;
                    }
                }
            }
            setPageData([...pageData]);
        }
    }

    const onClickSave = (e) => {
        e?.stopPropagation();
        const content = JSON.stringify(pageData);
        const removedImages = JSON.stringify(Object.keys(urlChanges));
        const bodyFormData = new FormData();
        for (const url of Object.values(urlChanges)) {
            bodyFormData.append("images", url);
        }
        bodyFormData.set("removedImages", removedImages);
        bodyFormData.set("content", content);
        bodyFormData.set("domain", domain);
        setLoading(true);
        setIsDurty(false);
        APIService.post(`page`, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log("Success", res);
        }).catch(err => {
            console.error("Error", err);
        }).finally(() => {
            router.reload();
            setLoading(false);
        });
    }


    return {
        onDataPageChange,
        onClickSave,
        loading,
        isDurty,
    };
}

export default usePageData;