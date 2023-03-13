import { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { Dropdown } from "../ui/Dropdown";
import {
  BIRTH_CONTINENT,
  GENDER_OPTIONS,
  NOBEL_PRIZE_CATEGORIES,
} from "../utils/types";
import styles from "./SearchPanel.module.scss";

export interface SearchPanelProps {
  onSubmitClick: (
    e: FormEvent<HTMLFormElement>,
    gender?: string,
    birthContinent?: string,
    awardYear?: string,
    category?: string
  ) => void;
}

export function SearchPanel({ onSubmitClick }: SearchPanelProps) {
  const [gender, setGender] = useState("");
  const [category, setCategoty] = useState("");
  const [awardYear, setAwardYear] = useState("");
  const [birthContinent, setBirthContinent] = useState("");
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (gender || category || awardYear || birthContinent) {
      setDisabled(false);
    }
  }, [gender, category, awardYear, birthContinent]);

  return (
    <form
      className={styles.container}
      onSubmit={(e) =>
        onSubmitClick(e, gender, category, awardYear, birthContinent)
      }
    >
      <div className={styles.wrapper}>
        <Dropdown
          label="Gender"
          options={GENDER_OPTIONS}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <Dropdown
          label="Category"
          options={NOBEL_PRIZE_CATEGORIES}
          value={category}
          onChange={(e) => setCategoty(e.target.value)}
        />
        <Input
          label="Award Year"
          type="text"
          placeholder="starting from 1901"
          value={awardYear}
          onChange={(e) => setAwardYear(e.target.value)}
        />
        <Dropdown
          label="Born in"
          options={BIRTH_CONTINENT}
          value={birthContinent}
          onChange={(e) => setBirthContinent(e.target.value)}
        />
      </div>
      <button disabled={disabled} className={styles.searchBtn} type="submit">
        Search
      </button>
    </form>
  );
}
