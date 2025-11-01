declare namespace _default {
    export { GA_TRACKING_ID };
    export { pageview };
    export { event };
}
export default _default;
declare const GA_TRACKING_ID: "G-E1RDMRRT6L";
declare function pageview(url: any): void;
declare function event({ action, category, label, value }: {
    action: any;
    category: any;
    label: any;
    value: any;
}): void;
