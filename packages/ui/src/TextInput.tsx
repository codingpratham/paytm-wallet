import "./css/textInput-style.css"
export const TextInput = ({
    placeholder,
    onChange,
    label
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
}) => {
    return (
        <div className="text-input-container">
            <label className="text-input-label">{label}</label>
            <input
                onChange={(e) => onChange(e.target.value)}
                type="text"
                className="text-input"
                placeholder={placeholder}
            />
        </div>
    );
};
