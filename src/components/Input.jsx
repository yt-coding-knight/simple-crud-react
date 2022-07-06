export default function Input({ type, placeholder, name, value, onChange }) {
  return (
    <input
      className="border-b text-lg border-b-black focus:outline-none"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
