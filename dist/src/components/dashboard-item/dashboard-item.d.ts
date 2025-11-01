export default DashboardItem;
declare function DashboardItem({ Link, url, text, onClick }: {
    Link?: (({ children }: {
        children: any;
    }) => React.JSX.Element) | undefined;
    url: any;
    text: any;
    onClick: any;
}): React.JSX.Element;
import React from 'react';
