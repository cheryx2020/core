export default AdminMenu;
declare function AdminMenu({ text, onSaveClick, onEditClick, onCancelClick, isEdit, nosave, saveAPI, saveBodyDataKey }: {
    text: any;
    onSaveClick?: () => void;
    onEditClick?: () => void;
    onCancelClick?: () => void;
    isEdit: any;
    nosave: any;
    saveAPI: any;
    saveBodyDataKey: any;
}): React.JSX.Element;
import React from "react";
