interface MobileCategorySelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  getOptionLabel?: (option: string) => string;
}

export function MobileCategorySelect({
  label,
  options,
  value,
  onChange,
  getOptionLabel = (option) => option,
}: MobileCategorySelectProps) {
  return (
    <label className="mobile-category-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option value={option} key={option || 'all'}>
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
}
