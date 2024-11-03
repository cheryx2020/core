import React from "react";
import { CIRCLE_IMAGE } from "../../hooks/usePageData";
import CircleGroup from "../components/circle-group/circle-group";
import PatternList from "../components/pattern-list/pattern-list";

const PageItem = ({ data, isAdmin, isMobile, useRouter, useDispatch }) => {
    if (data?.id === "PATTERN_LIST") {
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
    } else if (data?.id === CIRCLE_IMAGE) {
        return <CircleGroup urls={data?.value || []} />;
    } else {
        return <div>Not implemented</div>;
    }
};

export default PageItem;