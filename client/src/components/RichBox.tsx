import "./styles/TextBox.scss"
interface Props {
    name: string,
    label?: string,
    required?: boolean
    value?: string,
    rows?:number,
    cols?:number,
    onChange?: any
}

export const RichBox = ({name, label="", required=false, value="", rows=5, cols=50, onChange=()=>{}}: Props) => {
    return (
        <div className="RichBoxComponent">
        <label htmlFor={name}>{(label.length > 0 ? label : name)}{(required) ? <span className="required">*</span> : "" }</label>
            <textarea name={name} id={name} value={value} rows={rows} cols={cols} onChange={onChange}/>
        </div>
    );
};