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
import { Button, FormHelperText, FormLabel } from "@mui/joy";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import moment from "moment";

export interface SearchPanelProps {
  onSubmitClick: (
    e: FormEvent<HTMLFormElement>,
    gender: string | null,
    birthContinent: string | null,
    awardYearSince: string | null,
    awardYearTo: string | null,
    category: string | null,
    birthDate: string | null,
    birthDateTo: string | null,
    deathDate: string | null,
    deathDateTo: string | null,
    deathContinent: string | null
  ) => void;
}

export function SearchPanel({ onSubmitClick }: SearchPanelProps) {
  const [gender, setGender] = useState<string | null>("");
  const [category, setCategory] = useState<string | null>("");

  const [awardYearSince, setAwardYearSince] = useState("");
  const [awardYearTo, setAwardYearTo] = useState("");

  const [birthDate, setBirthDate] = useState("");
  const [birthDateTo, setBirthDateTo] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [deathDateTo, setDeathDateTo] = useState("");

  const [birthContinent, setBirthContinent] = useState<string | null>("");
  const [deathContinent, setDeathContinent] = useState<string | null>("");

  const [disabled, setDisabled] = useState<boolean>(true);

  const invalidDeathAfterBirth =
    (birthDate && deathDate && +birthDate > +deathDate) ||
    (birthDate && deathDateTo && +birthDate > +deathDateTo) ||
    (birthDateTo && deathDate && +birthDateTo > +deathDate) ||
    (birthDateTo && deathDateTo && +birthDateTo > +deathDateTo);

  const invalidAwardAfterBirth =
    (birthDate && awardYearSince && +birthDate > +awardYearSince) ||
    (birthDate && awardYearTo && +birthDate > +awardYearTo) ||
    (birthDateTo && awardYearSince && +birthDateTo > +awardYearSince) ||
    (birthDateTo && awardYearTo && +birthDateTo > +awardYearTo);

  const invalidFromToDeathDates =
    deathDate && deathDateTo && +deathDate > +deathDateTo;
  const invalidFromToBirthDates =
    birthDate && birthDateTo && +birthDate > +birthDateTo;
  const invalidFromToAwardDates =
    awardYearSince && awardYearTo && +awardYearSince > +awardYearTo;
  const awardYearSinceInvalid =
    (awardYearSince.trim() !== "" && +awardYearSince < 1901) ||
    +awardYearSince > +moment(new Date()).format("YYYY");

  const birthDateInvalid = +birthDate > +moment(new Date()).format("YYYY");
  const birthDateToInvalid = +birthDateTo > +moment(new Date()).format("YYYY");
  const deathDateInvalid = +deathDate > +moment(new Date()).format("YYYY");
  const deathDateToInvalid = +deathDateTo > +moment(new Date()).format("YYYY");

  const hasInvalidYearInput =
    birthDateInvalid ||
    birthDateToInvalid ||
    deathDateToInvalid ||
    deathDateInvalid ||
    awardYearSinceInvalid ||
    invalidDeathAfterBirth ||
    invalidAwardAfterBirth ||
    invalidFromToDeathDates ||
    invalidFromToBirthDates ||
    invalidFromToAwardDates;

  const formFilled =
    gender ||
    category ||
    awardYearSince ||
    birthContinent ||
    birthDate ||
    deathDate ||
    deathContinent;


  useEffect(() => {
    if (hasInvalidYearInput) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    if (formFilled && !hasInvalidYearInput) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    gender,
    category,
    awardYearSince,
    birthContinent,
    birthDate,
    deathDate,
    deathContinent,
    birthDateTo,
    deathDateTo,
    awardYearTo,
  ]);

  return (
    <form
      className={styles.container}
      onSubmit={(e) =>
        onSubmitClick(
          e,
          gender,
          category,
          awardYearSince,
          awardYearTo,
          birthContinent,
          birthDate,
          birthDateTo,
          deathDate,
          deathDateTo,
          deathContinent
        )
      }
    >
      <div className={styles.wrapper}>
        <div className={styles.container1}>
          <FormLabel htmlFor="gender-button" id="select-gender">
            Gender
          </FormLabel>
          <Select
            onChange={(e, value) => setGender(value)}
            style={{ width: "150px" }}
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
      </div>

      <div className={styles.wrapper}>
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
          <FormLabel>Year Awarded (from)</FormLabel>
          <Input
            type="number"
            style={{ width: "210px" }}
            onChange={(e) => setAwardYearSince(e.target.value)}
            size="lg"
            placeholder="starting from 1901"
            variant="outlined"
            color={awardYearSinceInvalid ? "danger" : "neutral"}
          />
          <FormHelperText>"YYYY" format</FormHelperText>
        </div>
        <div>
          <FormLabel>Year Awarded (to)</FormLabel>
          <Input
            type="number"
            style={{ width: "210px" }}
            onChange={(e) => setAwardYearTo(e.target.value)}
            size="lg"
            placeholder="starting from 1901"
            variant="outlined"
            disabled={!awardYearSince || awardYearSinceInvalid}
          />
          <FormHelperText>"YYYY" format</FormHelperText>
        </div>
      </div>

      <div className={styles.wrapper}>
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
          <FormLabel>Year of Birth (from)</FormLabel>
          <Input
            style={{ width: "210px" }}
            type="number"
            onChange={(e) => setBirthDate(e.target.value)}
            size="lg"
            variant="outlined"
            color={birthDateInvalid ? "danger" : "neutral"}
          />
          <FormHelperText>"YYYY" format</FormHelperText>
        </div>
        <div>
          <FormLabel>Year of Birth (to)</FormLabel>
          <Input
            style={{ width: "210px" }}
            type="number"
            onChange={(e) => setBirthDateTo(e.target.value)}
            size="lg"
            variant="outlined"
            disabled={!birthDate || birthDateInvalid}
          />
          <FormHelperText>{invalidFromToBirthDates && "check dates"}</FormHelperText>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div>
          <FormLabel htmlFor="deathcontinent-button" id="select-deathcontinent">
            Continent of Death
          </FormLabel>
          <Select
            onChange={(e, value) => setDeathContinent(value)}
            style={{ width: "260px" }}
            variant="outlined"
            size="lg"
            defaultValue="undefined"
            slotProps={{
              button: {
                id: "deathcontinent-button",
                "aria-labelledby":
                  "select-deathcontinent deathcontinent-button",
              },
            }}
          >
            {BIRTH_CONTINENT.map((option) => (
              <Option value={option.value}>{option.label}</Option>
            ))}
          </Select>
        </div>
        <div>
          <FormLabel>Year of Death (from)</FormLabel>
          <Input
            style={{ width: "210px" }}
            type="number"
            onChange={(e) => setDeathDate(e.target.value)}
            size="lg"
            variant="outlined"
            color={deathDateInvalid ? "danger" : "neutral"}
          />
          <FormHelperText>"YYYY" format</FormHelperText>
        </div>
        <div>
          <FormLabel>Year of Death (to)</FormLabel>
          <Input
            style={{ width: "210px" }}
            type="number"
            onChange={(e) => setDeathDateTo(e.target.value)}
            size="lg"
            variant="outlined"
            disabled={!deathDate || deathDateInvalid}
          />
          <FormHelperText>"YYYY" format</FormHelperText>
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
