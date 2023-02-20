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
    nobelPrizeYear?: number
  ): Promise<Laureat[]> => {
    if (!nobelPrizeYear) {
      return this.fetchApi(
        `https://api.nobelprize.org/2.1/laureates?gender=${gender}`
      )
        .then((res) => res.laureates)
        .catch((e) => console.log(e));
    }
    if (!gender) {
      return this.fetchApi(
        `https://api.nobelprize.org/2.1/laureates?nobelPrizeYear=${nobelPrizeYear}`
      )
        .then((res) => res.laureates)
        .catch((e) => console.log(e));
    }
    return this.fetchApi(
      `https://api.nobelprize.org/2.1/laureates?gender=${gender}&nobelPrizeYear=${nobelPrizeYear}`
    )
      .then((res) => res.laureates)
      .catch((e) => console.log(e));
  };
}

export const restApiService = new RestApiService();
