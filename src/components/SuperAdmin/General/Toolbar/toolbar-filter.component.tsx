interface Option {
  value: string;
  display: string;
}

interface ToolbarFilterProps {
  options: Option[];
  filterKey: any;
  setFilter: (value: React.SetStateAction<any>) => void;
  setPage?: (value: React.SetStateAction<number>) => void;
}

export default function ToolbarFilter({
  options,
  filterKey,
  setFilter,
  setPage,
}: ToolbarFilterProps) {
  return (
    <select
      className="form-select form-select-sm"
      style={{ width: "auto" }}
      value={filterKey}
      onChange={(e) => {
        setFilter(e.target.value);
        if (setPage) setPage(1);
      }}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.display}
        </option>
      ))}
    </select>
  );
}
