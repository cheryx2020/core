import { useState } from 'react';
import { APIService } from '@cheryx2020/api-service';

export const CIRCLE_IMAGE = "paterns-circle-images";

function usePageData({ page, pageName, router }) {
    const [pageData, setPageData] = useState(JSON.parse(JSON.stringify(page)));
    const [urlChanges, setUrlChanges] = useState({});
    const [loading, setLoading] = useState(false);
    const [isDurty, setIsDurty] = useState(true);
    const onDataPageChange = (id, data) => {
        if (data?.url) {
            setUrlChanges({ ...urlChanges, [data.url]: data?.data.imgFile });
        }
        if (id === CIRCLE_IMAGE) {
            // Handle keep data for circle image
            for (let i = 0; i < pageData.length; i++) {
                // find index changes
                if (pageData[i]?.id === CIRCLE_IMAGE) {
                    const index = pageData[i]?.value?.findIndex(item => item === data?.url);
                    if (index > -1) {
                        // We have a rule for the value of a page config to handle upload files
                        pageData[i].value[index] = `${pageName}_${data?.data?.imgFile?.name?.toLowerCase()}`;
                    }
                }
            }
            setPageData([...pageData]);
        }
    }

    const onClickSave = (e) => {
        e.stopPropagation();
        const content = JSON.stringify(pageData);
        const removedImages = JSON.stringify(Object.keys(urlChanges));
        const bodyFormData = new FormData();
        for (const url of Object.values(urlChanges)) {
            bodyFormData.append("images", url);
        }
        bodyFormData.set("removedImages", removedImages);
        bodyFormData.set("content", content);
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