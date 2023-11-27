import { FormEvent, useEffect, useState } from "react";
import {
  BIRTH_CONTINENT,
  GENDER_OPTIONS,
  NOBEL_PRIZE_CATEGORIES,
} from "../utils/types";
import styles from "./SearchPanel.module.scss";

import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Input from "@mui/joy/Input";
import { Button, FormLabel } from "@mui/joy";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

export interface SearchPanelProps {
  onSubmitClick: (
    e: FormEvent<HTMLFormElement>,
    gender: string | null,
    birthContinent: string | null,
    awardYear: string | null,
    category: string | null
  ) => void;
}

export function SearchPanel({ onSubmitClick }: SearchPanelProps) {
  const [gender, setGender] = useState<string | null>("");
  const [category, setCategory] = useState<string | null>("");
  const [awardYear, setAwardYear] = useState("");
  const [birthContinent, setBirthContinent] = useState<string | null>("");
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
        <div>
          <FormLabel htmlFor="gender-button" id="select-gender">
            Gender
          </FormLabel>
          <Select
            onChange={(e, value) => setGender(value)}
            style={{ width: "200px" }}
            variant="outlined"
            size="lg"
            defaultValue="undefined"
            slotProps={{
              button: {
                id: "gender-button",
                "aria-labelledby": "select-gender gender-button",
              },
            }}
          >
            {GENDER_OPTIONS.map((option) => (
              <Option value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </div>
        <div>
          <FormLabel htmlFor="category-button" id="select-category">
            Category
          </FormLabel>
          <Select
            onChange={(e, value) => setCategory(value)}
            style={{ width: "260px" }}
            variant="outlined"
            size="lg"
            defaultValue="undefined"
            slotProps={{
              button: {
                id: "category-button",
                "aria-labelledby": "select-category category-button",
              },
            }}
          >
            {NOBEL_PRIZE_CATEGORIES.map((option) => (
              <div className={styles.optionWrapper}>
                <Option style={{ width: "280px" }} value={option.value}>
                  <ListItemDecorator>{option.icon}</ListItemDecorator>
                  {option.label}
                </Option>
              </div>
            ))}
          </Select>
        </div>
        <div>
          <FormLabel htmlFor="continent-button" id="select-continent">
            Continent of Birth
          </FormLabel>
          <Select
            onChange={(e, value) => setBirthContinent(value)}
            style={{ width: "260px" }}
            variant="outlined"
            size="lg"
            defaultValue="undefined"
            slotProps={{
              button: {
                id: "continent-button",
                "aria-labelledby": "select-continent continent-button",
              },
            }}
          >
            {BIRTH_CONTINENT.map((option) => (
              <Option value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </div>
        <div>
          <FormLabel>Year Awarded</FormLabel>
          <Input
            onChange={(e) => setAwardYear(e.target.value)}
            size="lg"
            placeholder="starting from 1901"
            variant="outlined"
          />
        </div>
      </div>
      <Button
        type="submit"
        color="neutral"
        variant="solid"
        size="lg"
        disabled={disabled}
      >
        Search
      </Button>
    </form>
  );
}
