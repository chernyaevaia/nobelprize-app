import { LaureatCard } from "./LaureatCard";
import { Laureat } from "../utils/types";
import styles from "./LaureatsList.module.scss";

export interface LaureatsList {
  laureats?: Laureat[];
}

export function LaureatsCards({ laureats }: LaureatsList) {
  return (
    <div
    className={styles.wrapper}>
      {laureats &&
        laureats
        .filter((l) => l.knownName && l.birth.place)
        .map((laureat, idx) => (
          <LaureatCard
              key={laureat.wikipedia.english}
              gender={laureat.gender}
              knownName={laureat.knownName.en}
              birthDate={laureat.birth.date}
              birthCity={laureat.birth?.place.city ? laureat.birth?.place.city.en : ""}
              birthCountry={laureat.birth?.place.country ? laureat.birth?.place.country.en : ""}
              awardYear={laureat.nobelPrizes[0].awardYear}
              dateAwarded={laureat.nobelPrizes[0].dateAwarded}
              motivation={laureat.nobelPrizes[0].motivation.en}
              category={laureat.nobelPrizes[0].category.en}
              wikipedia={laureat.wikipedia.english}
              deathCity={laureat.death?.place.city ? laureat.death?.place.city.en : ""}
              deathDate={laureat.death ? laureat.death?.date : ""}
              deathCountry={laureat.death?.place.country ? laureat.death?.place.country.en : ""}
            />
          ))}
    </div>
  );
}
