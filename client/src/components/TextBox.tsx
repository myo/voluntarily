import "./styles/TextBox.scss"
interface Props {
    name: string,
    placeholder?: string
    type?: string
}

export const TextBox = ({name, placeholder="", type="text"}: Props) => {
    return (
        <div className="TextBoxComponent">
            <label htmlFor={name}>{name}</label>
            <input type={type} name={name} id={name} placeholder={placeholder}/>
        </div>
    );
};