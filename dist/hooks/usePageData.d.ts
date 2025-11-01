export const CIRCLE_IMAGE: "paterns-circle-images";
export default usePageData;
declare function usePageData({ page, pageName, router, domain, language }: {
    page: any;
    pageName: any;
    router: any;
    domain?: any;
    language?: string | undefined;
}): {
    onDataPageChange: (id: any, data: any) => void;
    onClickSave: (e: any) => void;
    loading: boolean;
    isDurty: boolean;
    isEdit: boolean;
    setIsEdit: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
