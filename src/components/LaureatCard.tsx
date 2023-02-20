import React from "react";
import { Laureat } from "../types";
import styles from "./LaureatCard.module.scss"

export function LaureatCard(laureat: Laureat) {
  return (
    <>
      <div className={styles.card}>
      <span>Name: {laureat.knownName.en}</span>
      <span>Gender: {laureat.gender}</span>
      <span>Birthdate: {laureat.birth.date}</span>
      <span>Place of Birth: {laureat.birth.place.city.en}   
      {laureat.birth.place.country.en}
      {laureat.birth.place.continent.en}</span>
      <span>Category: {laureat.nobelPrizes[0].category.en}</span>
      <span>Date awarded: {laureat.nobelPrizes[0].dateAwarded}</span>
      <span>{laureat.nobelPrizes[0].motivation.en}</span>
      <span>Prize status: {laureat.nobelPrizes[0].prizeStatus}</span>
      </div>
    </>
  );
}
//одна тупая карточка
