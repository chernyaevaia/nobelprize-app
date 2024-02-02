import styles from "./LaureatCard.module.scss";
import moment from "moment";
import { Button, Card, Chip, Divider, IconButton } from "@mui/joy";
import { ArrowUpRightSquare, Heart, HeartOff } from "lucide-react";
import { CATEGORY_ICONS as categoryIcons } from "../utils/helpers";
import { Laureat } from "../utils/types";

export interface LaureatCardProps {
  laureat: Laureat;
  toggleFavs: (laureat: Laureat) => void;
  isFav: boolean;
}

export function LaureatCard({ laureat, toggleFavs, isFav }: LaureatCardProps) {
  const gender = laureat.gender;
  const knownName = laureat.knownName.en;
  const birthDate = laureat.birth.date;
  const birthCity = laureat.birth?.place.city
    ? laureat.birth?.place.city.en
    : "";
  const birthCountry = laureat.birth?.place.country
    ? laureat.birth?.place.country.en
    : "";
  const awardYear = laureat.nobelPrizes[0].awardYear;
  const dateAwarded = laureat.nobelPrizes[0].dateAwarded;
  const motivation = laureat.nobelPrizes[0].motivation.en;
  const category = laureat.nobelPrizes[0].category.en;
  const wikipediaLink = laureat.wikipedia.english;
  const deathCity = laureat.death?.place.city
    ? laureat.death?.place.city.en
    : "";
  const deathDate = laureat.death ? laureat.death?.date : "";
  const deathCountry = laureat.death?.place.country
    ? laureat.death?.place.country.en
    : "";
  const color = categoryIcons[category].color;
  const pronoun = gender === "female" ? "She" : "He";

  const formatDate = (date: string) => {
    return moment(date).format("MMMM Do YYYY") === "Invalid date"
      ? `in ${birthDate.slice(0, 4)}`
      : `on ${moment(date).format("MMMM Do YYYY")}`;
  };

  return (
    <Card
      sx={{
        width: 320,
        boxShadow: "lg",
        border: "2px solid",
        borderColor: color,
      }}
    >
      <Chip
        startDecorator={categoryIcons[category].icon}
        size="sm"
        variant="solid"
        sx={{
          backgroundColor: color,
          padding: "6px 14px",
          fontSize: "16px",
          alignSelf: "flex-end",
        }}
      >
        {category}
      </Chip>
      <ul>
        <li>
          <span>Name: </span>
          {knownName}
        </li>
        <li>
          <span>Gender: </span>
          {gender}
        </li>
        <li>
          <span>Years of Life: </span>
          {moment(birthDate).format("YYYY") === "Invalid date"
            ? birthDate.slice(0, 4)
            : moment(birthDate).format("YYYY")}{" "}
          — {deathDate ? moment(deathDate).format("YYYY") : "now"}
        </li>
      </ul>
      <Divider
        sx={{
          backgroundColor: color,
          margin: "8px 0",
        }}
      />
      <p className={styles.motivation}>{motivation}</p>
      <Divider
        sx={{
          backgroundColor: color,
          margin: "8px 0",
        }}
      />
      <p>
        {knownName + " "}was born {" " + formatDate(birthDate)} in {birthCity},{" "}
        {birthCountry}.
      </p>
      <p>
        {pronoun} was awarded{" "}
        {dateAwarded ? "on " + formatDate(dateAwarded) : "in " + awardYear}.
      </p>
      {deathDate && `${pronoun} died on ${formatDate(deathDate)}`}
      {deathCity && ` in ${deathCity}, ${deathCountry}.`}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          component="a"
          href={wikipediaLink}
          target="_blank"
          color="primary"
          startDecorator={<ArrowUpRightSquare />}
        >
          Open Wikipedia
        </Button>
        <IconButton variant="soft" onClick={() => toggleFavs(laureat)}>
          {isFav ? <HeartOff /> : <Heart />}
        </IconButton>
      </div>
    </Card>
  );
}
