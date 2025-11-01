export default AdminMenu;
declare function AdminMenu({ text, onSaveClick, onEditClick, onCancelClick, isEdit, nosave, saveAPI, saveBodyDataKey }: {
    text: any;
    onSaveClick?: (() => void) | undefined;
    onEditClick?: (() => void) | undefined;
    onCancelClick?: (() => void) | undefined;
    isEdit: any;
    nosave: any;
    saveAPI: any;
    saveBodyDataKey: any;
}): React.JSX.Element;
import React from "react";
