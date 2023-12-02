import styles from "./LaureatCard.module.scss";
import moment from "moment";
import { Button, Card, Chip, Divider } from "@mui/joy";
import { ArrowUpRightSquare } from "lucide-react";
import { CATEGORY_ICONS as categoryIcons } from "../utils/helpers";

export interface LaureatCardProps {
  gender: string;
  knownName: string;
  wikipedia: string;
  birthDate: string;
  birthCity: string;
  birthCountry: string;
  awardYear: string;
  dateAwarded: string;
  category: string;
  motivation: string;
  deathDate: string;
  deathCity: string;
  deathCountry: string;
}

export function LaureatCard(props: LaureatCardProps) {
  const color = categoryIcons[props.category].color;
  const pronoun = props.gender === "female" ? "She" : "He";

  const formatDate = (date: string) => {
    return moment(date).format("MMMM Do YYYY") === "Invalid date"
      ? `in ${props.birthDate.slice(0, 4)}`
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
        startDecorator={categoryIcons[props.category].icon}
        size="sm"
        variant="solid"
        sx={{
          backgroundColor: color,
          padding: "6px 14px",
          fontSize: "16px",
          alignSelf: "flex-end",
        }}
      >
        {props.category}
      </Chip>
      <ul>
        <li>
          <span>Name: </span>
          {props.knownName}
        </li>
        <li>
          <span>Gender: </span>
          {props.gender}
        </li>
        <li>
          <span>Years of Life: </span>
          {moment(props.birthDate).format("YYYY") === "Invalid date"
            ? props.birthDate.slice(0, 4)
            : moment(props.birthDate).format("YYYY")}{" "}
          — {props.deathDate ? moment(props.deathDate).format("YYYY") : "now"}
        </li>
      </ul>
      <Divider
        sx={{
          backgroundColor: color,
          margin: "8px 0",
        }}
      />
      <p className={styles.motivation}>{props.motivation}</p>
      <Divider
        sx={{
          backgroundColor: color,
          margin: "8px 0",
        }}
      />
      <p>
        {props.knownName + " "}was born {" " + formatDate(props.birthDate)} in{" "}
        {props.birthCity}, {props.birthCountry}.
      </p>
      <p>
        {pronoun} was awarded{" "}
        {props.dateAwarded
          ? "on " + formatDate(props.dateAwarded)
          : "in " + props.awardYear}
        .
      </p>
      {props.deathDate && `${pronoun} died on ${formatDate(props.deathDate)}`}
      {props.deathCity && ` in ${props.deathCity}, ${props.deathCountry}.`}
      <Button
        component="a"
        href={props.wikipedia}
        target="_blank"
        color="primary"
        sx={{ marginTop: "auto" }}
        startDecorator={<ArrowUpRightSquare />}
      >
        Open Wikipedia
      </Button>
    </Card>
  );
}
