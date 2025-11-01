export default PatternDetail;
declare function PatternDetail({ name: _name, theme, price: _price, discount, ravelryUrl: _ravelryUrl, lovecraftsUrl: _lovecraftsUrl, bigImageUrl: _bigImageUrl, imageList: _imageList, isAdmin, onChange, index, noImageUrl }: {
    name: any;
    theme: any;
    price: any;
    discount: any;
    ravelryUrl?: string | undefined;
    lovecraftsUrl: any;
    bigImageUrl: any;
    imageList: any;
    isAdmin: any;
    onChange?: (() => void) | undefined;
    index: any;
    noImageUrl?: string | undefined;
}): React.JSX.Element;
import React from 'react';
