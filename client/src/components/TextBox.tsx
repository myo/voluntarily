import "./styles/TextBox.scss"
interface Props {
    name: string,
    label?: string,
    placeholder?: string,
    type?: string,
    value?: string,
    required?: boolean,
    onChange?: any
}

export const TextBox = ({name, label="", placeholder="", type="text", value="", required=false, onChange=()=>{}}: Props) => {
    return (
        <div className="TextBoxComponent">
            <label htmlFor={name}>{(label.length > 0 ? label : name)}{(required) ? <span className="required">*</span> : "" }</label>
            <input type={type} name={name} id={name} placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
    );
};