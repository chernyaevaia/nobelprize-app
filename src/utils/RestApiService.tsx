import { Laureat } from "./types";

export class RestApiService {
  fetchApi(url: string, method: string = "GET", headers?: Object) {
    const params = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    return fetch(url, params).then((res) => {
      if (res.status === 400) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    });
  }

  getLaureates = (
    offset?: number | null,
    gender?: string | null,
    birthContinent?: string | null,
    nobelPrizeYear?: string | null,
    yearTo?: string | null,
    nobelPrizeCategory?: string | null,
    birthDate?: string | null,
    birthDateTo?: string | null,
    deathDate?: string | null,
    deathDateTo?: string | null,
    deathContinent?: string | null,

  ): Promise<Laureat[]> => {
    let obj = {
      offset,
      gender,
      birthContinent,
      nobelPrizeYear,
      yearTo,
      nobelPrizeCategory,
      birthDate,
      birthDateTo,
      deathDate,
      deathDateTo,
      deathContinent,
    };

    let maybeQueryParams = Object.entries(obj)
      .filter((kv) => kv[1])
      .map((kv) => `${kv[0]}=${kv[1]}`)
      .join("&");

    let queryParams = maybeQueryParams ? "?" + maybeQueryParams : "";

    return this.fetchApi(
      `https://api.nobelprize.org/2.1/laureates${queryParams}`
    )
      .then((res) => res.laureates)
      .catch((e) => console.log(e));
  };
}

export const restApiService = new RestApiService();
