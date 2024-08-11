import { useState } from "react";

let API_KEY = "e48d84a33ce942f787ebc2d9c4a32afb";

function App() {
  const [temperature, setTemperature] = useState();
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("");
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();

  const Search = async () => {
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=Metric&appid=${API_KEY}`;
    const data = await fetch(URL)
      .then((response) => {
        if (!response.ok) {
          alert("Please try a valid city name");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        alert("Error fetching weather data!");
      });
    if (data) {
      setCity(inputCity);
      setTemperature(Math.floor(data.main.temp));
      setHumidity(Math.floor(data.main.humidity));
      setWind(data.wind.speed);
    }
  };

  return (
    <div  className="flex justify-center items-center h-[100vh]" style={{background: "linear-gradient(to right, violet, darkblue)"}}>
      <div className=" box-border text-white rounded-xl bg-custom-gradient mx-auto py-10 w-[90%] max-w-md">
        <div className="flex justify-center items-center space-x-2 max-w-[80%] mx-auto">
          <input
            className="bg-[white] outline-none text-black p-2 pl-6 rounded-[100px] w-[100%]"
            placeholder="Search"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <button
            className="h-12 w-32 flex justify-center items-center bg-yellow-600 rounded-xl"
            onClick={Search}
          >
            Search
          </button>
        </div>
        <h1 className="text-[5rem] text-center mt-[-0.5rem]">
          {temperature}° C
        </h1>
        <h2 className="text-[3rem] text-center mt-[-1.5rem]">{city}</h2>

        <div className="flex justify-between max-w-[80%] mx-auto mt-6">
          <div className="flex space-x-2 items-center">
            <div>
              <p className="text-center text-xl">{humidity} %</p>
              <p className="text-sm text-center">Humidity</p>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <div>
              <p className="text-center text-xl">{wind} km/h</p>
              <p className="text-sm text-center">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;