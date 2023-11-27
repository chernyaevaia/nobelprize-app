import { Button } from "@mui/joy";
import { Laureat } from "../utils/types";
import styles from "./LaureatCard.module.scss";
import moment from "moment";
import  {ArrowUpRightSquare}  from 'lucide-react';


export function LaureatCard(laureat: Laureat) {

  return (
    <ul className={styles.card}>
      <li>
        <span>Name: </span>
        {laureat.knownName.en}
      </li>
      <li>
        <span>Gender: </span>
        {laureat.gender}
      </li>
      <li>
        <span>Birthdate: </span>
        {moment(laureat.birth.date).format("MMMM Do YYYY")}
      </li>
      <li>
        <span>Place of Birth: </span>
        {laureat.birth.place.city.en}, {laureat.birth.place.country.en},{" "}
        {laureat.birth.place.continent.en}
      </li>
      <li>
        <span>Category: </span> {laureat.nobelPrizes[0].category.en}
      </li>
      <li>
        <span>Date awarded: </span>
        {laureat.nobelPrizes[0].dateAwarded
          ? moment(laureat.nobelPrizes[0].dateAwarded).format("MMMM Do YYYY")
          : laureat.nobelPrizes[0].awardYear}
      </li>
      <li className={styles.motivation}>
        {laureat.nobelPrizes[0].motivation.en}
      </li>
      <li className={styles.extraMargin}>
        <span>Prize status: </span>
        {laureat.nobelPrizes[0].prizeStatus}
      </li>
      <li className={styles.linkBtn}>
        <Button
          component="a"
          href={laureat.wikipedia.english}
          target="_blank"
          color="neutral"
          startDecorator={<ArrowUpRightSquare />}
        >
          Open Wikipedia
        </Button>
      </li>
    </ul>
  );
}
