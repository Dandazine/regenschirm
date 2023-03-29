import React, { useState } from "react";
import { Data } from "../typings";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [error, setError] = useState<string>("");
  const [apiData, setApiData] = useState<Data>();
  const [cityName, setCityName] = useState<string>("");
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
    import.meta.env.VITE_API_KEY
  }&units=metric`;
  const IMG_URL = `https://openweathermap.org/img/wn/`;

  // Fetching the data
  const fetchData = async () => {
    const resp = await fetch(API_URL);
    const data = await resp.json();
    // clear error messages
    setError("");
    // error checking
    if (data.cod !== 200) {
      setError(data.message);
      return;
    }
    setApiData(data);
    setCityName("");
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    // if they press enter, fetch the data
    if (e.key === "Enter") {
      fetchData();
    }
  };

  const handleTimeZone = (dt: number, time: number) => {
    const date = new Date(dt);
    return date;
  };

  return (
    <>
      <main>
        <section className="app">
          <input
            type="text"
            placeholder="Enter city name..."
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
            onKeyPress={handleSearch}
            className="search"
          />
          {/* error message  */}
          {error !== "" ? (
            <p className="error-msg">{error}. Try again!</p>
          ) : null}

          {typeof apiData?.main === "undefined" || error !== "" ? (
            <>
              <h1>Welcome to Regenschirm!</h1>
              <p>Get started by typing a city name.</p>
            </>
          ) : (
            <>
              <h2>
                {apiData?.name}, {apiData?.sys?.country}
              </h2>
              <h3>Current weather in {apiData?.name}</h3>
              <div className="city">
                <div className="temperature">
                  <img
                    src={IMG_URL + apiData?.weather[0]?.icon + "@2x.png"}
                    alt={apiData?.weather[0]?.description}
                  />
                  <p>{Math.ceil(apiData?.main?.temp)} °C</p>
                </div>
                <div className="details">
                  <h3>{apiData?.weather[0]?.main}</h3>
                  <p>Feels like {Math.ceil(apiData?.main?.feels_like)} °C</p>
                </div>
              </div>
              <div className="extra-details">
                <p>
                  Humidity: <span>{apiData?.main?.humidity} %</span>
                </p>
                <p>
                  Visibility:
                  <span>{Math.ceil(apiData?.visibility / 1000)}km</span>
                </p>
                <p>
                  Winds: <span>{apiData?.wind?.speed} m/s</span>
                </p>
                <p>
                  Clouds: <span>{apiData?.clouds?.all} %</span>
                </p>
                <p>
                  Pressure: <span>{apiData?.main?.pressure} hPa</span>
                </p>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
