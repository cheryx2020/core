export default BestSeller;
declare function BestSeller({ useRouter, useDispatch, isEdit, data, message }: {
    useRouter?: (() => void) | undefined;
    useDispatch?: (() => void) | undefined;
    isEdit: any;
    data: any;
    message?: string | undefined;
}): React.JSX.Element;
import React from 'react';
