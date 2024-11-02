import React from "react";
import { CIRCLE_IMAGE } from "../../hooks/usePageData";
import CircleGroup from "../components/circle-group/circle-group";

export const renderPageItem = (data) => {
    switch (data?.id) {
        case CIRCLE_IMAGE:
            return <CircleGroup urls={data?.value || []} />;
        default:
            return <div>Not implemented</div>
    }
}