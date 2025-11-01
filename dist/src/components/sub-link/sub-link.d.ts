export default SubLink;
declare function SubLink({ data, wrapperStyle, className, renderItem }: {
    data: any;
    wrapperStyle?: {} | undefined;
    className?: string | undefined;
    renderItem?: (() => void) | undefined;
}): React.JSX.Element;
import React from 'react';
