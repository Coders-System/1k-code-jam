interface FormInputProps {
  labelName: string;
  placeholder: string;
  onEdit: (text: string) => void;
  isTextArea?: boolean;
}

export function FormInput({
  labelName,
  placeholder,
  onEdit,
  isTextArea = false,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <label className="">{labelName}</label>

      {isTextArea ? (
        <textarea
          className="text-gray-800 placeholder:text-xs"
          onChange={(e) => onEdit(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="text-gray-800 placeholder:text-xs"
          onChange={(e) => onEdit(e.target.value)}
          type="text"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
