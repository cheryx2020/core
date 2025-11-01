export default LeftMenu;
declare function LeftMenu({ data, selected, isAdmin, onSelectedItem, Link }: {
    data?: never[] | undefined;
    selected: any;
    isAdmin: any;
    onSelectedItem?: (() => void) | undefined;
    Link?: (({ children }: {
        children: any;
    }) => any) | undefined;
}): React.JSX.Element;
import React from 'react';
