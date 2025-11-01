export default PatternDetail;
declare function PatternDetail({ name: _name, theme, price: _price, discount, ravelryUrl: _ravelryUrl, lovecraftsUrl: _lovecraftsUrl, bigImageUrl: _bigImageUrl, imageList: _imageList, isAdmin, onChange, index, noImageUrl }: {
    name: any;
    theme: any;
    price: any;
    discount: any;
    ravelryUrl?: string;
    lovecraftsUrl: any;
    bigImageUrl: any;
    imageList: any;
    isAdmin: any;
    onChange?: () => void;
    index: any;
    noImageUrl?: string;
}): React.JSX.Element;
import React from 'react';
