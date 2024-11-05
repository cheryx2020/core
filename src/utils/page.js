import React from "react";
import { CIRCLE_IMAGE } from "../../hooks/usePageData";
import CircleGroup from "../components/circle-group/circle-group";
import PatternList from "../components/pattern-list/pattern-list";

const PageItem = ({ data, isAdmin, isMobile, useRouter, useDispatch }) => {
    switch (data?.id) {
        case "PATTERN_LIST":
            return (
                <PatternList
                    useRouter={useRouter}
                    useDispatch={useDispatch}
                    style={{ marginTop: isMobile ? 20 : 40 }}
                    isAdmin={isAdmin}
                    isMobile={isMobile}
                    data={data?.[data.api] ?? []}
                />
            );
        case CIRCLE_IMAGE:
            return <CircleGroup urls={data?.value || []} />;
        default:
            return <div>Not implemented</div>;
    }    
};

export default PageItem;