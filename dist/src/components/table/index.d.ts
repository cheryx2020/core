export default Table;
declare function Table({ addButtonText, listApi, listDataPath, addApi, editApi, deleteApi, formFields }: {
    addButtonText?: string | undefined;
    listApi: any;
    listDataPath?: string | undefined;
    addApi: any;
    editApi: any;
    deleteApi: any;
    formFields?: never[] | undefined;
}): React.JSX.Element;
import React from "react";
