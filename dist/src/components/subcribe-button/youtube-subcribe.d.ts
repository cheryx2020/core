export default YouTubeSubscribe;
declare class YouTubeSubscribe extends React.Component<any, any, any> {
    static defaultProps: {
        channelName: string;
        channelid: string;
        theme: string;
        layout: string;
        count: string;
    };
    /**
     *  React.createRef to attach script after mount
     *  Ref) https://reactjs.org/docs/refs-and-the-dom.html
     */
    constructor(props: any);
    youtubeSubscribeNode: React.RefObject<any>;
    state: {
        initialized: boolean;
    };
    initialized(): void;
    /**
     * 1. Script for API doesn't work in index.html.
     * 2. So You have to make it after components render.
     * 3. Make a script with JavaScript method to work.
     * 4. It is a little slow to show component at first.
     * 5. YouTube API gives you channelId instead channelName
     *    So You don't have to think about channelName when you
     *    need its API.
     */
    componentDidMount(): void;
    render(): React.JSX.Element;
}
import React from "react";
