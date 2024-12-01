import React from "react"
import Input from "../../src/components/input/index";

export const Properties = ({children}) => {
    return <div style={{ marginTop: 10 }}>{children}</div>
}
const Property = ({ type = "checkbox", value, onChange = () => { }, text, description }) => {
    const wrapper = { display: 'flex', margin: "5px 0px", alignItems: "center" }
    if (type === "input") {
        return <div style={wrapper}><div style={{ marginRight: 10, minWidth: 100 }}><b>{text}</b>: {description}</div><Input style={{width: '100%', marginBottom: 0}} value={value} onChange={onChange} /></div>
    }
    return <>
        <div style={wrapper}>{type === "checkbox" ? <input type={type} checked={value} onChange={onChange} /> : null}<div><b>{text}</b>: {description}</div></div>
    </>
}
export default Property;