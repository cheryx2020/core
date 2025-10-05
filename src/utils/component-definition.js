import { CIRCLE_IMAGE } from "../../hooks/usePageData";
export const COMPONENT_DEFINITIONS = [
    {
        value: "ADMIN_MENU",
        label: "Admin Menu",
        defaultData: {
            id: "ADMIN_MENU",
            text: "Admin Menu Actions",
            saveBodyDataKey: "menuData",
            saveAPI: "/api/admin/menu",
            nosave: "false",
        },
    },
    {
        value: "BEST_SELLER",
        label: "Best Seller",
        defaultData: {
            id: "BEST_SELLER",
            message: "Our Best Selling Items",
            api: "bestSellerData",
        },
    },
    {
        value: CIRCLE_IMAGE,
        label: "Circle Image Group",
        defaultData: {
            id: CIRCLE_IMAGE,
            title: "Explore Categories",
            value: [
                "https://avatars.githubusercontent.com/u/9473156?v=4",
                "https://avatars.githubusercontent.com/u/9473156?v=4",
                "https://avatars.githubusercontent.com/u/9473156?v=4",
            ],
            wrapperClassName: "circle-image-wrapper",
            bigImageClassName: "circle-image-big",
            seeMoreClassName: "circle-see-more",
            iconSeeMoreClassName: "circle-see-more-icon",
            navigate: "/shop/all",
            styleTagContent: `.circle-image-wrapper { /* styles */ }`,
        },
    },
    {
        value: "NOTE",
        label: "Note",
        defaultData: {
            id: "NOTE",
            title: "Important Notice",
            text: [
                "Description 1",
                "Description 2",
                "Description 3",
            ],
        },
    },
    {
        value: "PATTERN_LIST",
        label: "Pattern List",
        defaultData: {
            id: "PATTERN_LIST",
            api: "freePatterns",
        },
    },
    {
        value: "TITLE",
        label: "Page Title",
        defaultData: {
            id: "TITLE",
            text: "Welcome to Our Page!",
        },
    },
    {
        value: "DIV",
        label: "Generic Div",
        defaultData: {
            id: "DIV",
            className: "custom-div-section",
            styleTagContent: `.custom-div-section { background-color: #f0f0f0; padding: 20px; }`,
        },
    },
    {
        value: "ContentWithTitle",
        label: "Content With Title (Pattern List)",
        defaultData: {
            id: "ContentWithTitle",
            title: "Featured Patterns",
            api: "featuredPatterns",
            freePatternClassName: "featured-patterns-container",
            styleTagContent: `.featured-patterns-container { margin-top: 20px; }`,
        },
    },
    {
        value: "LIST_ARTICLE",
        label: "List Article",
        defaultData: {
            id: "LIST_ARTICLE",
            titleText: "Latest Articles",
            linkText: "Read All",
            url: "/blog",
            api: "latestArticles",
            articleWrapperClassName: "blog-section-wrapper",
            titleClassName: "blog-title-container",
            styleTagContent: `.blog-section-wrapper { border-top: 1px solid #eee; padding-top: 30px; }`,
        },
    },
];