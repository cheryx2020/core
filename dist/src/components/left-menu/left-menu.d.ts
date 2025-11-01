export default LeftMenu;
declare function LeftMenu({ data, selected, isAdmin, onSelectedItem, Link }: {
    data?: any[];
    selected: any;
    isAdmin: any;
    onSelectedItem?: () => void;
    Link?: ({ children }: {
        children: any;
    }) => any;
}): React.JSX.Element;
import React from 'react';
