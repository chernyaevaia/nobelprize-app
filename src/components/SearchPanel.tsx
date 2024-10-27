import { FormEvent, useEffect, useState } from "react";
import {
  CONTINENTS,
  GENDER_OPTIONS,
  NOBEL_PRIZE_CATEGORIES,
} from "../utils/types";
import { ERROR_HELPER_MESSAGES as errorMessages } from "../utils/helpers";
import styles from "./SearchPanel.module.scss";
import {
  Button,
  FormHelperText,
  FormLabel,
  Input,
  Option,
  Select,
  ListItemDecorator,
} from "@mui/joy";
import moment from "moment";
import { Dices, Heart } from "lucide-react";

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
  onFetchRandomLaureats: () => void;
  onFetchFavLaureats: () => void;
}

export function SearchPanel({
  onSubmitClick,
  onFetchRandomLaureats,
  onFetchFavLaureats,
}: SearchPanelProps) {
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

  const currentYear = +moment(new Date()).format("YYYY");
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
    +awardYearSince > currentYear;

  const birthDateInvalid =
    +birthDate > currentYear ||
    (birthDate.trim() !== "" && birthDate.trim().length < 4);
  const birthDateToInvalid =
    +birthDateTo > currentYear ||
    (birthDateTo.trim() !== "" && birthDateTo.trim().length < 4);
  const deathDateInvalid = +deathDate > currentYear;
  const deathDateToInvalid = +deathDateTo > currentYear;

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

  const awardToHelperText =
    (invalidFromToAwardDates && errorMessages.birthDateFromTo) ||
    (awardYearTo && invalidAwardAfterBirth && errorMessages.awardBeforeBirth) ||
    (!awardYearSince && errorMessages.awardToEnable);

  const birthYearToHelperText =
    (birthDateTo && invalidFromToBirthDates && errorMessages.birthDateFromTo) ||
    (!birthDate && errorMessages.birthToEnable);

  const deathYearToHelperText =
    (deathDateTo && invalidDeathAfterBirth && errorMessages.birthAfterDeath) ||
    (invalidFromToDeathDates && errorMessages.deathDateFromTo) ||
    (!deathDate && errorMessages.deathToEnable);

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
    hasInvalidYearInput,
    formFilled,
  ]);

  const onReset = () => {
    setAwardYearSince("");
    setAwardYearTo("");
    setBirthContinent("");
    setBirthDate("");
    setBirthDateTo("");
    setDeathDate("");
    setDeathDateTo("");
    setGender("");
    setDeathContinent("");
    setCategory("");
  };

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
          <FormLabel>Gender</FormLabel>
          <Select
            onChange={(e, value) => setGender(value)}
            style={{ width: "150px" }}
            variant="outlined"
            size="lg"
            value={gender}
          >
            {GENDER_OPTIONS.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div>
          <FormLabel>Category</FormLabel>
          <Select
            onChange={(e, value) => setCategory(value)}
            style={{ width: "260px" }}
            variant="outlined"
            size="lg"
            value={category}
          >
            {NOBEL_PRIZE_CATEGORIES.map((option) => (
              <div key={option.value} className={styles.optionWrapper}>
                <Option style={{ width: "280px" }} value={option.value}>
                  <ListItemDecorator>{option.icon}</ListItemDecorator>
                  {option.label}
                </Option>
              </div>
            ))}
          </Select>
        </div>
        <div>
          <FormLabel>Year Awarded</FormLabel>
          <Input
            type="number"
            style={{ width: "210px" }}
            onChange={(e) => setAwardYearSince(e.target.value)}
            size="lg"
            placeholder="starting from 1901"
            variant="outlined"
            value={awardYearSince}
            color={
              awardYearSinceInvalid ||
              invalidAwardAfterBirth ||
              invalidFromToAwardDates
                ? "danger"
                : "neutral"
            }
          />
          <FormHelperText style={{ maxWidth: "210px", fontSize: "12px" }}>
            {invalidAwardAfterBirth && errorMessages.awardBeforeBirth}
          </FormHelperText>
        </div>
        <div>
          <FormLabel>Year Awarded (until)</FormLabel>
          <Input
            type="number"
            style={{ width: "210px" }}
            onChange={(e) => setAwardYearTo(e.target.value)}
            size="lg"
            placeholder="starting from 1901"
            variant="outlined"
            value={awardYearTo}
            color={
              awardYearTo && (invalidAwardAfterBirth || invalidFromToAwardDates)
                ? "danger"
                : "neutral"
            }
            disabled={!awardYearSince || awardYearSinceInvalid}
          />
          <FormHelperText style={{ maxWidth: "210px", fontSize: "12px" }}>
            {awardToHelperText}
          </FormHelperText>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div>
          <FormLabel>Continent of Birth</FormLabel>
          <Select
            onChange={(e, value) => setBirthContinent(value)}
            style={{ width: "260px" }}
            variant="outlined"
            size="lg"
            value={birthContinent}
          >
            {CONTINENTS.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <FormLabel>Year of Birth</FormLabel>
          <Input
            style={{ width: "210px" }}
            type="number"
            onChange={(e) => setBirthDate(e.target.value)}
            size="lg"
            variant="outlined"
            value={birthDate}
            color={
              birthDateInvalid ||
              invalidDeathAfterBirth ||
              invalidFromToBirthDates
                ? "danger"
                : "neutral"
            }
          />
        </div>
        <div>
          <FormLabel>Year of Birth (until)</FormLabel>
          <Input
            style={{ width: "210px" }}
            type="number"
            onChange={(e) => setBirthDateTo(e.target.value)}
            size="lg"
            variant="outlined"
            value={birthDateTo}
            disabled={!birthDate || birthDateInvalid}
            color={
              birthDateToInvalid ||
              (birthDateTo && invalidDeathAfterBirth) ||
              invalidFromToBirthDates
                ? "danger"
                : "neutral"
            }
          />
          <FormHelperText style={{ maxWidth: "210px", fontSize: "12px" }}>
            {birthYearToHelperText}
          </FormHelperText>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div>
          <FormLabel>Continent of Death</FormLabel>
          <Select
            onChange={(e, value) => setDeathContinent(value)}
            style={{ width: "260px" }}
            variant="outlined"
            value={deathContinent}
            size="lg"
          >
            {CONTINENTS.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <FormLabel>Year of Death</FormLabel>
          <Input
            style={{ width: "210px" }}
            type="number"
            onChange={(e) => setDeathDate(e.target.value)}
            size="lg"
            variant="outlined"
            value={deathDate}
            color={
              deathDateToInvalid ||
              invalidFromToDeathDates ||
              invalidDeathAfterBirth
                ? "danger"
                : "neutral"
            }
          />
          <FormHelperText style={{ maxWidth: "210px", fontSize: "12px" }}>
            {invalidDeathAfterBirth && errorMessages.birthAfterDeath}
          </FormHelperText>
        </div>
        <div>
          <FormLabel>Year of Death (until)</FormLabel>
          <Input
            style={{ width: "210px" }}
            type="number"
            onChange={(e) => setDeathDateTo(e.target.value)}
            size="lg"
            variant="outlined"
            value={deathDateTo}
            color={
              deathDateToInvalid ||
              (deathDateTo &&
                (invalidFromToDeathDates || invalidDeathAfterBirth))
                ? "danger"
                : "neutral"
            }
            disabled={!deathDate || deathDateInvalid}
          />
          <FormHelperText style={{ maxWidth: "210px", fontSize: "12px" }}>
            {deathYearToHelperText}
          </FormHelperText>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button
          onClick={() => onFetchFavLaureats()}
          variant="soft"
          startDecorator={<Heart />}
          size="lg"
        >
          Favorites
        </Button>

        <Button
          type="submit"
          color="neutral"
          variant="solid"
          size="lg"
          disabled={disabled}
        >
          Search
        </Button>
        <Button
          variant="soft"
          startDecorator={<Dices />}
          size="lg"
          onClick={() => {
            onFetchRandomLaureats();
            onReset();
          }}
        >
          Random result
        </Button>
        <Button
          color="neutral"
          variant="solid"
          size="lg"
          onClick={() => onReset()}
          disabled={!formFilled}
        >
          Clear all
        </Button>
      </div>
    </form>
  );
}
