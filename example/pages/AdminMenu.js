import React from "react";
import { AdminMenu } from "@cheryx2020/core";

const Index = () => {
    return <div>
        <div style={{ width: 400, height: 'auto' }}>
            <AdminMenu 
                text="Admin Options"
                onSaveClick={() => alert('Saved!')}
                onEditClick={() => alert('Editing...')}
                onCancelClick={() => alert('Cancelled!')}
                onPreviewClick={() => alert('Previewing...')}
            />
        </div>
    </div>
}
export default Index;