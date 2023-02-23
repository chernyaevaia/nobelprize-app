import { FormEvent, useState } from "react";
import { Input } from "../ui/Input";
import { Dropdown } from "../ui/Dropdown";
import {
  BIRTH_CONTINENT,
  GENDER_OPTIONS,
  Laureat,
  NOBEL_PRIZE_CATEGORIES,
} from "../utils/types";
import { restApiService } from "../utils/RestApiService";
import { LaureatsCards } from "./LaureatsList";
import styles from "./SearchPanel.module.scss";

export function SearchPanel() {
  const [laureats, setLaureats] = useState<Laureat[]>();
  const [gender, setGender] = useState("");
  const [category, setCategoty] = useState("");
  const [awardYear, setAwardYear] = useState("");
  const [birthContinent, setBirthContinent] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    restApiService
      .getLaureates(gender, birthContinent, +awardYear, category)
      .then((data) => setLaureats(data));
  };

  return (
    <>
      <form className={styles.container}onSubmit={handleSubmit}>
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
        <button className={styles.searchBtn} type="submit">
          Search
        </button>
      </form>
      <LaureatsCards laureats={laureats} />
    </>
  );
}
