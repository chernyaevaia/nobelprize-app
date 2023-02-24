import { Laureat } from "./types";

export class RestApiService {
  fetchApi<T>(url: string, method: string = "GET", headers?: Object) {
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
    gender?: string,
    birthContinent?: string,
    nobelPrizeYear?: string,
    nobelPrizeCategory?: string
  ): Promise<Laureat[]> => {
    let awardNobelYear = +nobelPrizeYear!;

    let obj = {
      gender,
      birthContinent,
      awardNobelYear,
      nobelPrizeCategory,
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
