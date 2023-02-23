import { LaureatCard } from "./LaureatCard";
import { Laureat } from "../utils/types";
import styles from "./LaureatsList.module.scss"

export interface LaureatsList {
    laureats?: Laureat[]
}

export function LaureatsCards ({laureats}: LaureatsList) {

  return (
    <div className={styles.wrapper}>
      {laureats &&
        laureats.map((laureat) => (
          <LaureatCard
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
