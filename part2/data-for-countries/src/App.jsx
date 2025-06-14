import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState({
    temp: null,
    wind: null,
    icon: null,
  });
  useEffect(() => {
    console.log("effect run", countries);

    // skip if currency is not defined

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
      });
  }, []);

  const onChangeHandler = (event) => {
    const searchName = event.target.value;
    setSearchCountry(searchName);
    console.log(searchName);
    if (countries) {
      const newfilteredCountries = countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchName.toLowerCase());
      });
      setFilteredCountries(newfilteredCountries);
      if (newfilteredCountries.length === 1) {
        showCountryView(newfilteredCountries[0].ccn3);
      }
    }
  };

  const showCountryView = (id) => {
    console.log("i was click");
    const singleCountry = filteredCountries.find((country) => {
      return country.ccn3 === id;
    });
    setFilteredCountries([singleCountry]); // wrap in array if needed for state
    console.log(singleCountry);
    console.log(singleCountry.latlng);
    const [lat, lng] = singleCountry.latlng; // now this should work
    console.log(lat, lng);
    weatherReport(lat, lng);
  };

  const weatherReport = (lt, lg) => {
    const lat = parseFloat(lt.toFixed(2));
    const lng = parseFloat(lg.toFixed(2));
    const api_key = "233382c55008e014a4a409d3254cf3f2";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`
      )
      .then((response) => {
        console.log(response.data);
        const tempCelsius = (response.data.main.temp - 273.15).toFixed(2);
        const wind = response.data.wind.speed;
        const icon = response.data.weather[0].icon;
        console.log(response.data.weather[0].icon);
        setWeather({ temp: tempCelsius, wind: wind, icon: icon });
      });
  };
  return (
    <div>
      <input
        onChange={onChangeHandler}
        placeholder="enter country name"
      ></input>
      {filteredCountries.length === 1 ? (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Area: {filteredCountries[0].area}</p>
          <h3>Languages</h3>

          <ul>
            {Object.values(filteredCountries[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img src={filteredCountries[0].flags.png} alt="flag" width="100" />

          <h2>Weather in {filteredCountries[0].capital}</h2>
          <p>{`temperature ${weather.temp} Celsius`}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather-icon"
          />
          <p>Wind {weather.wind} m/s</p>
        </div>
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.ccn3}>
              {country.name.common}{" "}
              <button
                onClick={() => showCountryView(country.ccn3)}
                style={{ marginLeft: "10px" }}
              >
                show
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
