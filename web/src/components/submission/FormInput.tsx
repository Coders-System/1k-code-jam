interface FormInputProps {
  labelName: string;
  name: string;
  placeholder: string;
  value: any;
  onChange: any,
  error? : string | false,
  isTextArea?: boolean;
}

export function FormInput({
  labelName,
  placeholder,
  onChange,
  name,
  value,
  error,
  isTextArea = false,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <label className="">{labelName}</label>

      {isTextArea ? (
        <textarea
        value={value}
        name={name}
          className="text-gray-800 placeholder:text-xs"
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (

        <input
        value={value}
        name={name}
          className="text-gray-800 placeholder:text-xs"
          onChange={onChange}
          type="text"
          placeholder={placeholder}
        />
      )}
      {error ? <p className="text-red-500">{error}</p> : null }
    </div>
  );
}
