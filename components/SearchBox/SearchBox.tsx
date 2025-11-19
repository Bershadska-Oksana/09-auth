import type { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => (
  <input
    className={css.input}
    onChange={onChange}
    type="text"
    placeholder="Search notes"
    value={value}
  />
);

export default SearchBox;
