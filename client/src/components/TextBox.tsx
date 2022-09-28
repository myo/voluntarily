import "./styles/TextBox.scss"
interface Props {
    name: string,
    placeholder?: string,
    type?: string,
    value?: string
    onChange?: any
}

export const TextBox = ({name, placeholder="", type="text", value="", onChange=()=>{}}: Props) => {
    return (
        <div className="TextBoxComponent">
            <label htmlFor={name}>{name}</label>
            <input type={type} name={name} id={name} placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
    );
};