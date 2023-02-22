import React, { FormEvent, useState } from "react";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import {
  BIRTH_CONTINENT,
  GENDER_OPTIONS,
  Laureat,
  NOBEL_PRIZE_CATEGORIES,
} from "../types";
import { restApiService } from "../RestApiService";
import { LaureatsCards } from "./LaureatsList";

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
      <form onSubmit={handleSubmit}>
        <Dropdown
          options={GENDER_OPTIONS}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <Dropdown
          options={NOBEL_PRIZE_CATEGORIES}
          value={category}
          onChange={(e) => setCategoty(e.target.value)}
        />
        <Input
          type="text"
          placeholder="starting from 1901"
          value={awardYear}
          onChange={(e) => setAwardYear(e.target.value)}
        />
        <Dropdown
          options={BIRTH_CONTINENT}
          value={birthContinent}
          onChange={(e) => setBirthContinent(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <LaureatsCards laureats={laureats} />
    </>
  );
}
