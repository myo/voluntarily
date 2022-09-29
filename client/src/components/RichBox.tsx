import "./styles/TextBox.scss"
interface Props {
    name: string,
    label?: string,
    placeholder?: string,
    value?: string,
    rows?:number,
    cols?:number,
    onChange?: any
}

export const RichBox = ({name, label="", placeholder="", value="", rows=5, cols=50, onChange=()=>{}}: Props) => {
    return (
        <div className="RichBoxComponent">
            <label htmlFor={name}>{(label.length > 0 ? label : name)}</label>
            <textarea name={name} id={name} placeholder={placeholder} value={value} rows={rows} cols={cols} onChange={onChange}/>
        </div>
    );
};