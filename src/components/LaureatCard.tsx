import { Laureat } from "../utils/types";
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

const categoryIcons: any = {
  Literature: { icon: <BookOpenText />, color: "#910d2e" },
  Peace: { icon: <Globe />, color: "#6fc5f7" },
  Physics: { icon: <Atom />, color: "#1d30c2" },
  Chemistry: { icon: <FlaskConical />, color: "#8f34eb" },
  "Physiology or Medicine": { icon: <Syringe />, color: "#3cb5a9" },
  "Economic Sciences": { icon: <AreaChart />, color: "#1aa343" },
};

export function LaureatCard(laureat: Laureat) {
  const color = categoryIcons[laureat.nobelPrizes[0].category.en].color;
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
        startDecorator={categoryIcons[laureat.nobelPrizes[0].category.en].icon}
        size="sm"
        variant="solid"
        sx={{
          backgroundColor: color,
          padding: "6px 14px",
          fontSize: "16px",
          alignSelf: "flex-end",
        }}
      >
        {laureat.nobelPrizes[0].category.en}
      </Chip>
      <ul>
        <li>
          <span>Name: </span>
          {laureat.knownName.en}
        </li>
        <li>
          <span>Gender: </span>
          {laureat.gender}
        </li>
        <Divider
          sx={{
            backgroundColor: color,
            margin: "8px 0",
          }}
        />
        <li className={styles.motivation}>
          {laureat.nobelPrizes[0].motivation.en}
        </li>
        <Divider
          sx={{
            backgroundColor: color,
            margin: "8px 0",
          }}
        />
        <li>
          <span>Born on {" " + moment(laureat.birth.date).format("MMMM Do YYYY")} in {laureat.birth.place.city.en}, {laureat.birth.place.country.en}.</span>
        </li>
        <li>
          <span>Awarded {laureat.nobelPrizes[0].dateAwarded
            ? "on " + moment(laureat.nobelPrizes[0].dateAwarded).format("MMMM Do YYYY")
            : "in " + laureat.nobelPrizes[0].awardYear}.</span>
        </li>
      </ul>
      <Button
        component="a"
        href={laureat.wikipedia.english}
        target="_blank"
        color="primary"
        startDecorator={<ArrowUpRightSquare />}
      >
        Open Wikipedia
      </Button>
    </Card>
  );
}
