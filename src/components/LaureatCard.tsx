import { Laureat } from "../utils/types";
import styles from "./LaureatCard.module.scss";
import moment from "moment";

export function LaureatCard(laureat: Laureat) {
  return (
    <div className={styles.card}>
      <ul>
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
        <li>
          <span>Prize status: </span>
          {laureat.nobelPrizes[0].prizeStatus}
        </li>
        <li className={styles.linkBtn}>
          <a
            className={styles.wikiLink}
            href={laureat.wikipedia.english}
            target="_blank"
          >
            Open Wikipedia
          </a>
        </li>
      </ul>
    </div>
  );
}
