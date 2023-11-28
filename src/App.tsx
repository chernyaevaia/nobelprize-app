import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { LaureatsCards } from "./components/LaureatsList";
import { SearchPanel } from "./components/SearchPanel";
import { restApiService } from "./utils/RestApiService";
import { Laureat } from "./utils/types";
import moment from "moment";

function App() {
  const [laureats, setLaureats] = useState<Laureat[]>();
  const [isIntroVisible, setIntroVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    restApiService
      .getLaureates()
      .then((data) =>
        setLaureats(data.sort(() => 0.5 - Math.random()).slice(0, 6))
      )
      .then(() => setIsLoading(false));
  }, []);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    gender: string | null,
    category: string | null,
    awardYearSince: string | null,
    awardYearTo: string | null,
    birthContinent: string | null,
    birthDate: string | null,
    birthDateTo: string | null,
    deathDate: string | null,
    deathDateTo: string | null,
    deathContinent: string | null,
  ) => {
    e.preventDefault();
    const yearAwardedValid =
      awardYearSince &&
      (+awardYearSince < 1901 ||
        +awardYearSince > +moment(new Date()).format("YYYY"));

    if (yearAwardedValid) {
      alert("Please enter correct award year");
      return;
    } else {
      setIsLoading(true);
      restApiService
        .getLaureates(
          gender,
          birthContinent,
          awardYearSince,
          awardYearTo,
          category,
          birthDate,
          birthDateTo,
          deathDate,
          deathDateTo,
          deathContinent
        )
        .then((data) => {
          setIntroVisible(false);
          setLaureats(data);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="app-container">
      <SearchPanel onSubmitClick={handleSubmit} />
      {isLoading && <div className="loader"></div>}
      {!isLoading && <LaureatsCards laureats={laureats} />}
    </div>
  );
}

export default App;
