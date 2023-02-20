import React, { FormEvent, useState } from "react";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { GENDER_OPTIONS, Laureat } from "../types";
import { restApiService } from "../RestApiService";
import { LaureatsCards } from "./LaureatsList";

export function SearchPanel() {
  const [laureats, setLaureats] = useState<Laureat[]>();
  const [gender, setGender] = useState("");
  const [awardYear, setAwardYear] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    restApiService.getLaureates(gender, +awardYear).then((data) => setLaureats(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <Dropdown
        options={GENDER_OPTIONS}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <Input
        type="text"
        value={awardYear}
        onChange={(e) => setAwardYear(e.target.value)}
      />
      <button type="submit">
        Search
      </button>
      </form>
      <LaureatsCards laureats={laureats}/>
    </>
  );
}
