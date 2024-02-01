import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { LaureatList } from "./components/LaureatList";
import { SearchPanel } from "./components/SearchPanel";
import { restApiService } from "./utils/RestApiService";
import { Laureat } from "./utils/types";
import { Typography, CircularProgress } from "@mui/joy";

function App() {
  const [randomLaureats, setRandomLaureats] = useState<Laureat[]>();
  const [userRequestedLaureats, setUserRequestedLaureats] = useState<Laureat[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotFoundMessage, setNotFoundMessage] = useState<boolean>(false);

  useEffect(() => {
    if (userRequestedLaureats?.length === 0) {
      setNotFoundMessage(true);
    } else {
      setNotFoundMessage(false);
    }
  }, [userRequestedLaureats]);

  useEffect(() => {
    setIsLoading(true);
    handleFetchRandom();
  }, []);

  const handleFetchRandom = () => {
    setUserRequestedLaureats(undefined);
    restApiService
      .getLaureates(Math.floor(Math.random() * 300))
      .then((data) =>
        setRandomLaureats(data.sort(() => 0.5 - Math.random()).slice(0, 6))
      )
      .then(() => setIsLoading(false));
  };

  const getFavLaureates = () => {
    setUserRequestedLaureats(JSON.parse(localStorage.getItem("favs")!));
  };

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
    deathContinent: string | null
  ) => {
    e.preventDefault();
    setIsLoading(true);
    restApiService
      .getLaureates(
        null,
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
        setUserRequestedLaureats(data);
        setIsLoading(false);
      });
  };
  const logo: string = require("./nobel_logo.svg").default;
  return (
    <>
      <div className="intro-container">
        <img alt="l" src={logo} style={{ width: "120px", height: "120px" }} />
        <p className="intro-text ">
          For the greatest benefit <br /> to humankind
        </p>
      </div>
      <div className="app-container">
        <SearchPanel
          onSubmitClick={handleSubmit}
          onFetchRandomLaureats={handleFetchRandom}
          onFetchFavLaureats={getFavLaureates}
        />
        {isNotFoundMessage && (
          <>
            <Typography level="body-lg">
              We couldn't find any matches for your search parameters.
            </Typography>
            <Typography level="body-lg">
              Please, double check your search or try different search
              parameters.
            </Typography>
          </>
        )}
        {isLoading && <CircularProgress variant="solid" />}
        {!isLoading && (
          <LaureatList
            laureats={userRequestedLaureats ? userRequestedLaureats : randomLaureats}
          />
        )}
      </div>
    </>
  );
}

export default App;
