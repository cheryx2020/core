export default Table;
declare function Table({ addButtonText, listApi, listDataPath, addApi, editApi, deleteApi, formFields }: {
    addButtonText?: string;
    listApi: any;
    listDataPath?: string;
    addApi: any;
    editApi: any;
    deleteApi: any;
    formFields?: any[];
}): React.JSX.Element;
import React from "react";
