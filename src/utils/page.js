import React from "react";
import { CIRCLE_IMAGE } from "../../hooks/usePageData";
import CircleGroup from "../components/circle-group/circle-group";
import BestSeller from "../components/best-seller/best-seller";
import PatternList from "../components/pattern-list/pattern-list";
import Note from "../components/note/note";

const PageItem = ({ data, ...rest }) => {
    switch (data?.id) {
        case "BEST_SELLER":
            return <BestSeller message={data?.message} {...rest} data={data?.[data.api] ?? {}}/>
        case CIRCLE_IMAGE:
            return <CircleGroup urls={data?.value || []} />;
        case "NOTE":
            return <Note {...rest} title={data.title} text={data.text}/>
        case "PATTERN_LIST":
            return (
                <PatternList
                    {...rest}
                    style={{ marginTop: rest.isMobile ? 20 : 40 }}
                    data={data?.[data.api] ?? []}
                />
            );
        default:
            return <div>Not implemented</div>;
    }    
};

export default PageItem;