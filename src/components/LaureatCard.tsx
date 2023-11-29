import styles from "./LaureatCard.module.scss";
import moment from "moment";
import { Button, Card, Chip, Divider } from "@mui/joy";
import {
  ArrowUpRightSquare,
  BookOpenText,
  Atom,
  FlaskConical,
  AreaChart,
  Syringe,
  Globe,
} from "lucide-react";

export interface LaureatCardProps {
  gender: string;
  knownName: string;
  wikipedia: string;
  birthDate: string;
  birthCity: string;
  birthCountry: string;
  birthContinent: string;
  awardYear: string;
  dateAwarded: string;
  category: string;
  motivation: string;
}

const categoryIcons: any = {
  Literature: { icon: <BookOpenText />, color: "#910d2e" },
  Peace: { icon: <Globe />, color: "#6fc5f7" },
  Physics: { icon: <Atom />, color: "#1d30c2" },
  Chemistry: { icon: <FlaskConical />, color: "#8f34eb" },
  "Physiology or Medicine": { icon: <Syringe />, color: "#3cb5a9" },
  "Economic Sciences": { icon: <AreaChart />, color: "#1aa343" },
};

export function LaureatCard(props: LaureatCardProps) {
  const color = categoryIcons[props.category].color;
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
        <Divider
          sx={{
            backgroundColor: color,
            margin: "8px 0",
          }}
        />
        <li className={styles.motivation}>{props.motivation}</li>
        <Divider
          sx={{
            backgroundColor: color,
            margin: "8px 0",
          }}
        />
        <li>
          <span>
            Born on {" " + moment(props.birthDate).format("MMMM Do YYYY")} in{" "}
            {props.birthCity}, {props.birthCountry}.
          </span>
        </li>
        <li>
          <span>
            Awarded{" "}
            {props.dateAwarded
              ? "on " + moment(props.dateAwarded).format("MMMM Do YYYY")
              : "in " + props.awardYear}
            .
          </span>
        </li>
      </ul>
      <Button
        component="a"
        href={props.wikipedia}
        target="_blank"
        color="primary"
        startDecorator={<ArrowUpRightSquare />}
      >
        Open Wikipedia
      </Button>
    </Card>
  );
}
