import AdminMenu from "../../src/components/admin-menu/admin-menu"
import React from "react";
const Index = () => {
    return <div>
        <AdminMenu text="Menu" onEditClick={() => { alert(1) }}/>
    </div>
}
export default Index;