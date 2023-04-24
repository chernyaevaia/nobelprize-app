import { LaureatCard } from "./LaureatCard";
import { Laureat } from "../utils/types";
import styles from "./LaureatsList.module.scss";

export interface LaureatsList {
  laureats?: Laureat[];
}

export function LaureatsCards({ laureats }: LaureatsList) {
  return (
    <div className={styles.wrapper}>
      {laureats &&
        laureats
          .filter((l) => l.knownName && l.birth.place)
          .map((laureat) => (
            <LaureatCard
              key={laureat.wikipedia.english}
              gender={laureat.gender}
              knownName={laureat.knownName}
              birth={laureat.birth}
              nobelPrizes={laureat.nobelPrizes}
              wikipedia={laureat.wikipedia}
            />
          ))}
    </div>
  );
}
