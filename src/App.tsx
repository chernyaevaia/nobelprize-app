import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { LaureatsCards } from "./components/LaureatsList";
import { SearchPanel } from "./components/SearchPanel";
import { restApiService } from "./utils/RestApiService";
import { Laureat } from "./utils/types";

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
    awardYear: string | null,
    birthContinent: string | null
  ) => {
    setIsLoading(true);
    e.preventDefault();
    restApiService
      .getLaureates(gender, birthContinent, awardYear, category)
      .then((data) => {
        setIntroVisible(false);
        setLaureats(data);
        setIsLoading(false);
      });
  };

  return (
    <>
      <SearchPanel onSubmitClick={handleSubmit} />
      {isLoading && <div className="loader"></div>}
      {!isLoading && <LaureatsCards laureats={laureats} />}
    </>
  );
}

export default App;
