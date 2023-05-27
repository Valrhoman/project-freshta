export default function InputField({
  name,
  value,
  label,
  focusedInput,
  onChange,
  onFocus,
  onBlur,
  ...props
}: {
  name: string;
  value: string;
  label: string;
  focusedInput: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  return (
    <label className="relative" htmlFor={name}>
      <p
        className={`absolute top-0 px-6 py-6 z-10 ${
          focusedInput === name || value !== ""
            ? "-translate-y-4 text-base text-greeny-500 !important"
            : "text-2xl text-gray-800"
        }} transition-all`}
      >
        {label}
      </p>
      <input
        className={`px-6 pt-8 pb-4 outline-none w-full text-2xl rounded-xl border ${
          focusedInput === name || value !== ""
            ? "outline-greeny-100 outline-2 outline-offset-0 border-greeny-200"
            : "border-gray-200"
        }`}
        name={name}
        id={name}
        autoCapitalize="off"
        onFocus={onFocus}
        onChange={onChange}
        onBlur={onBlur}
        required
        {...props}
      />
    </label>
  );
}
