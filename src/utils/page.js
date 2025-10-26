import React from "react";
import { CIRCLE_IMAGE } from "../../hooks/usePageData";
import CircleGroup from "../components/circle-group/circle-group";
import BestSeller from "../components/best-seller/best-seller";
import PatternList from "../components/pattern-list/pattern-list";
import Title from "../components/title/title";
import Note from "../components/note/note";
import AdminMenu from "../components/admin-menu/admin-menu";
import ContentWithTitle from "../components/content-with-title/content-with-title";
import ListArticle from "../components/list-article/list-article";
import TitleLink from "../components/title-link/title-link";
import GenericDiv from "./generic-div";

const PageItem = ({ data, router, ...rest }) => {
    switch (data?.id) {
        case "ADMIN_MENU":
            const { onClickSave, setIsEdit, isAdmin, isEdit } = rest;
            return isAdmin && <AdminMenu
                isEdit={isEdit}
                text="Menu"
                saveBodyDataKey={data?.saveBodyDataKey}
                saveAPI={data?.saveAPI}
                nosave={data?.nosave === "true" ? true : false}
                onSaveClick={!(data?.nosave === "true") && onClickSave ? onClickSave : () => { }}
                onEditClick={(e) => { setIsEdit(true) }}
                onCancelClick={(e) => { setIsEdit(false); }}
            />
        case "BEST_SELLER":
            return <BestSeller message={data?.message} {...rest} data={data?.[data.api] ?? {}} />
        case CIRCLE_IMAGE:
            return <>
                <style>{data?.styleTagContent}</style>
                <div className={data?.wrapperClassName} onClick={() => {
                    if (data?.navigate && router && typeof router.push === 'function') {
                        router.push(data?.navigate);
                    }
                }}>
                    <Title text={data?.title} />
                    <div className={data?.bigImageClassName}></div>
                    <CircleGroup urls={data?.value} />
                    <div className={data?.seeMoreClassName}>
                        <div className={data?.iconSeeMoreClassName}></div>
                    </div>
                </div>
            </>;
        case "NOTE":
            return <Note {...rest} title={data.title} text={data.text} />
        case "PATTERN_LIST":
            return (
                <PatternList
                    {...rest}
                    style={{ marginTop: rest.isMobile ? 20 : 40 }}
                    api={data.api}
                    data={data?.[data.api] ?? []}
                />
            );
        case "TITLE":
            return (
                <Title text={data?.text || "TITLE"} />
            );
        case "DIV":
            // return <>
            //     <style>{data?.styleTagContent}</style>
            //     <div className={data?.className}></div>
            // </>
            return <GenericDiv config={data} />
        case "ContentWithTitle":
            return <>
                <style>{data?.styleTagContent}</style>
                <ContentWithTitle
                    theme={rest?.theme}
                    title={data?.title}
                    className={data?.freePatternClassName}
                    content={<PatternList {...rest} isBottom={true} isAdmin={false} api={data.api} data={data?.[data.api] ?? []} />}
                />
            </>
        case "LIST_ARTICLE": 
            return <>
                <style>{data?.styleTagContent}</style>
                <div className={data?.articleWrapperClassName}>
                    <div className={data?.titleClassName}>
                        <TitleLink linkText={data?.linkText} Link={rest?.Link} styles={rest?.theme ? { backgroundColor: theme?.NAVIGATION?.backgroundColor } : undefined} text={data?.titleText} url={data?.url} />
                    </div>
                    <ListArticle Link={rest?.Link} Image={rest?.Image} api={data.api} data={data?.[data?.api] ?? []} isMobile={rest?.isMobile} />
                </div>
            </>
        default:
            return <div>Not implemented</div>;
    }
};

export default PageItem;