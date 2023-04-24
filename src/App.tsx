import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { LaureatsCards } from "./components/LaureatsList";
import { SearchPanel } from "./components/SearchPanel";
import { restApiService } from "./utils/RestApiService";
import { Laureat } from "./utils/types";

function App() {
  const [laureats, setLaureats] = useState<Laureat[]>();
  const [isIntroVisible, setIntroVisible] = useState<boolean>(true);

  useEffect(() => {
    restApiService
      .getLaureates()
      .then((data) =>
        setLaureats(data.sort(() => 0.5 - Math.random()).slice(0, 6))
      );
  }, []);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    gender?: string,
    category?: string,
    awardYear?: string,
    birthContinent?: string
  ) => {
    e.preventDefault();
    restApiService
      .getLaureates(gender, birthContinent, awardYear, category)
      .then((data) => {
        setIntroVisible(false);
        setLaureats(data);
      });
  };

  return (
    <>
      <p className="intro">
        Welcome
        <br />
        Between 1901 and 2022, the Nobel Prizes were awarded 615 times to 989
        people and organisations. <br /> Use our search form to find Nobel Prize
        laureates.
      </p>
      <SearchPanel onSubmitClick={handleSubmit} />
      {isIntroVisible && (
        <p className="recommendation">You might be interested:</p>
      )}
      {laureats?.length ? (
        <LaureatsCards laureats={laureats} />
      ) : (
        <p className="noResultsMessage">
          Sorry. We couldn't find any matches for your search. <br />
          Please, double check your search for typos or try different filters.
        </p>
      )}
    </>
  );
}

export default App;
