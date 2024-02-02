import { LaureatCard } from "./LaureatCard";
import { Laureat } from "../utils/types";
import styles from "./LaureatList.module.scss";
import { useState } from "react";

export interface ILaureatList {
  laureats: Laureat[];
}

export function LaureatList({ laureats }: ILaureatList) {
  const [storageItems, setStorageItems] = useState(() =>
    JSON.parse(localStorage.getItem("favs") || "[]")
  );

  function toggleFavs(laureat: Laureat) {
    const isAdded = storageItems.find(
      (item: Laureat) => item.id === laureat.id
    );
    if (!isAdded) {
      const newStorageItem = [...storageItems, laureat];
      setStorageItems(newStorageItem);
      localStorage.setItem("favs", JSON.stringify(newStorageItem));
    } else {
      const newStorageItem = storageItems.filter(
        (item: Laureat) => item.id !== laureat.id
      );
      setStorageItems(newStorageItem);
      localStorage.setItem("favs", JSON.stringify(newStorageItem));
    }
  }

  function isFav(id: number) {
    if (storageItems.find((item: Laureat) => item.id === id)) {
      return true;
    }
    return false;
  }

  return (
    <div className={styles.wrapper}>
      {laureats &&
        laureats
          .filter((l) => l.knownName && l.birth.place)
          .map((laureat) => (
            <LaureatCard
              key={laureat.wikipedia.english}
              laureat={laureat}
              toggleFavs={toggleFavs}
              isFav={isFav(laureat.id)}
            />
          ))}
    </div>
  );
}
