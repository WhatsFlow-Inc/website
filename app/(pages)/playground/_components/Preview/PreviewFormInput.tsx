import { FormInputProps } from "@/types/flowJSON";
import { useState } from "react";

const FormInput: React.FC<FormInputProps> = ({
  type,
  label,
  required,
  inputType = "text",
  pattern,
  helperText,
  initialValue = "",
  name,
  onChange
}) => {
  const [value, setValue] = useState(initialValue);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange(name, e.target.value);
  };

  // Render appropriate input type
  if (type === "TextArea") {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium mb-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={4}
          required={required}
          value={value}
          onChange={handleChange}
          name={name}
        />
        {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      </div>
    );
  }

  const getInputType = () => {
    switch (inputType) {
      case "number": return "number";
      case "email": return "email";
      case "password": return "password";
      case "passcode": return "password";
      case "phone": return "tel";
      default: return "text";
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={getInputType()}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        required={required}
        pattern={pattern}
        value={value}
        onChange={handleChange}
        name={name}
      />
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
};

export default FormInput