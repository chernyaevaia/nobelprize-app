import { FormEvent, useState } from "react";
import "./App.css";
import { LaureatsCards } from "./components/LaureatsList";
import { SearchPanel } from "./components/SearchPanel";
import { restApiService } from "./utils/RestApiService";
import { Laureat } from "./utils/types";

function App() {
  const [laureats, setLaureats] = useState<Laureat[]>();

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    gender?: string,
    birthContinent?: string,
    awardYear?: string,
    category?: string
  ) => {
    e.preventDefault();
    restApiService
      .getLaureates(gender, birthContinent, awardYear, category)
      .then((data) => setLaureats(data));
  };

  return (
    <>
      <SearchPanel onSubmitClick={handleSubmit} />
      <LaureatsCards laureats={laureats} />
    </>
  );
}

export default App;
