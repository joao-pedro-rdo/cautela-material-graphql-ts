interface LabelAndInputForm {
    label: string;
    type: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    placeholder?: string;
}
const LabelAndInputForm = (props: LabelAndInputForm) => {
    return (
        <>
            <label htmlFor={props.id} className="block text-sm font-medium text-blue-800">
                {props.label}
            </label>
            <input
                type={props.type}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-blue-900 placeholder-blue-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder={props.placeholder}
            />
        </>
    );
};

export default LabelAndInputForm;

                   