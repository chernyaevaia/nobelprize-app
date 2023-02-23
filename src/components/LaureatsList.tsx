import { LaureatCard } from "./LaureatCard";
import { Laureat } from "../types";
import styles from "./LaureatsList.module.scss"

export interface LaureatsList {
    laureats?: Laureat[]
}

export function LaureatsCards ({laureats}: LaureatsList) {
  //const [laureats, setLaureats] = useState<Laureat[]>();

//   const fetchLaureats = useCallback(() => {
//     restApiService.getLaureates("male", 1975).then((data) => setLaureats(data));
//   }, [setLaureats]);

//   useEffect(() => {
//     fetchLaureats();
//   }, [fetchLaureats]);

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
