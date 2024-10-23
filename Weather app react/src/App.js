import "./App.css";
import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let [cityname, setcityname] = useState("agra");
  let [bg, setbg] = useState();
  let [bgaddress, setbgaddress] = useState("");
  let [weatherdata, setweatherdata] = useState(); //initially weatherdata has value 'undefined'
  let [weekdata, setweekdata] = useState(); //initially weatherdata has value 'undefined'
  let [loadend, setload] = useState(false); // data has loaded or not
  let [isPopoverVisible, setPopoverVisible] = useState(false);
  let [date, setdate] = useState(new Date());
  let ampm = date.getHours() >= 12 ? "PM" : "AM";
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysOfWeek[date.getDay()];

  const getbg = (back) => {

    let main=back.toLowerCase();

    let clear = "clear.webp";
    let cloudy = "cloudy.jpg";
    let snow = "snow.jpg";
    let stormy = "stormy.jpg";
    let fog = "stormy.jpg";
    let rain="rainy1.jpg";
    
    if (main === "clear") {
      setbgaddress(clear);
    } else if (main === "clouds") {
      setbgaddress(cloudy);
    } else if (bg === "snow") {
      setbgaddress(snow);
    } else if (bg === "stormy") {
      setbgaddress(stormy);
    } else if (bg === "rain") {
      setbgaddress(rain);
    } else if (bg === "fog") {
      setbgaddress(fog);
    } else {
      setbgaddress(rain);
    }

  }

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  let getdata = (event) => {
    event.preventDefault();
    setload(false);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.cod === "404") {
          alert(data.message);
          return;
        } else {
          let main = data.weather[0].main;
          setbg(main);
          getbg(main);
          setweatherdata(data);
          let lat = data.coord.lat;
          let lon = data.coord.lon;
          getweekdata(lat, lon);
        }
        // setload(true);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setweatherdata(undefined);
        setload(true);
      });

    setcityname("");
  };

  let getweekdata = (lat, lon) => {
    // const url = `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${lat}/${lon}`;

    const url = `https://api.weatherapi.com/v1/forecast.json?key=db0bcce5930d4ba8a42110714243108&q=${cityname}&days=3&aqi=no&alerts=no`;
    const options = {
      method: "GET",
      // headers: {
      //   'x-rapidapi-key': 'ad2dcaaa03mshaaa91f2a73f906ap1822b7jsn978f3f644a29',
      //   'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
      // }
      headers: {
        "Transfer-Encoding": "chunked",
        Connection: "keep-alive",
        Vary: "Accept-Encoding",
        "CDN-PullZone": "93447",
        "CDN-Uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
        "CDN-RequestCountryCode": "GB",
        "x-weatherapi-qpm-left": "1000000",
        "CDN-ProxyVer": "1.04",
        "CDN-RequestPullSuccess": "True",
        "CDN-RequestPullCode": "200",
        "CDN-CachedAt": "10/18/2024 17:12:41",
        "CDN-EdgeStorageId": "874",
        "CDN-Status": "200",
        "CDN-RequestTime": "0",
        "CDN-RequestId": "585c0106524db86755c91eb08539f493",
        "CDN-Cache": "HIT",
        "Cache-Control": "public, max-age=180",
        "Content-Type": "application/json",
        Date: "Fri, 18 Oct 2024 17:12:44 GMT",
        Server: "BunnyCDN-DE1-865",
      },
    };

    // Wrapping in an async function
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(url, options); // Await the fetch call
        const result = await response.json(); // Parse the result as JSON
        // console.log(result);                         // Log the result to console
        setweekdata(result);
        // console.log(result.forecast.forecastday[1].hour[0].time)
        setload(true);
      } catch (error) {
        console.error("Error fetching weather data:", error); // Handle any errors
        setload(true);
      }
    };

    // Calling the async function
    fetchWeatherData();
  };

  useEffect(() => {       // data on starting app
    // setload(false);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.coord) {
          setweatherdata(data);
          let main=data.weather[0].main;
          setbg(main);
          getbg(main);

          let lat = data.coord.lat;
          let lon = data.coord.lon;
          getweekdata(lat, lon);
        }
      });

    setcityname("");
  }, []);

  useEffect(() => {
    // to change time accordingly
    const interval = setInterval(() => {
      setdate(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval
  }, []);

  return (
    <div className="main">
  
      <div className="head"
       style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/${bgaddress})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh"
      }}
       >
        <div className="navbar">
          <div className="left">
            <h3>WeatherApp</h3>
          </div>
          <div className="middle">
            {weatherdata && loadend && weekdata ? (
              <div>
                {weekdata.location.name}, {weekdata.location.region},{" "}
                {weekdata.location.country}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
  
        <main className="content"> {/* Main landmark starts here */}
          <div className="search">
            <form className="" onSubmit={getdata}>
              <input
                value={cityname}
                onChange={(e) => {
                  setcityname(e.target.value);
                }}
                type="text"
                placeholder="Enter City Name"
              />
              <button type="submit">Search</button>
            </form>
          </div>
  
          {loadend && weatherdata ? (
            <div className="data">
              <div className="current">
                <div className="today">
                  <div className="temp">
                    <img
                      className=""
                      src={`https://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`}
                      alt="Not found"
                    />
                    {weatherdata.main.temp} &deg;C
                  </div>
  
                  <p className="city">{weatherdata.name}</p>
  
                  <div className="date">
                    <h3>
                      {day}, {formattedDate}
                    </h3>
                    <h3>
                      {date.getHours() >= 12
                        ? date.getHours() % 12
                        : date.getHours()}
                      :
                      {date.getMinutes() < 10
                        ? "0" + date.getMinutes()
                        : date.getMinutes()}{" "}
                      {ampm}{" "}
                    </h3>
                  </div>
  
                  <div className="wind">
                    <div className="speed">
                      <h4>Wind Speed</h4> {weatherdata.wind.speed}
                    </div>
                    <div className="speed">
                      <h4>Humidity</h4>
                      {weatherdata.main.humidity}
                    </div>
                  </div>
  
                  <div className="bar"></div>
  
                  <div className="climate">
                    {weatherdata.weather[0].description}
                  </div>
                </div>
              </div>
  
              <div className="week">
                <div className="day">
                  <h4 className="date">
                    {weekdata.forecast.forecastday[0].date}
                  </h4>
                  <div placeholder="Scroll left to see more" className="boxes">
                    {weekdata.forecast.forecastday[0].hour.map((e, i) => {
                      return (
                        <div key={i} className="box">
                          <p className="">{e.time.split(" ")[1]}</p>
                          <img src={`${e.condition.icon}`} alt="X" />
                          <h3 className="">{e.temp_c} &deg;C</h3>
                          <p>{e.condition.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="day">
                  <h4 className="date">
                    {weekdata.forecast.forecastday[1].date}
                  </h4>
                  <div placeholder="Scroll left to see more" className="boxes">
                    {weekdata.forecast.forecastday[1].hour.map((e, i) => {
                      return (
                        <div key={i} className="box">
                          <p className="">{e.time.split(" ")[1]}</p>
                          <img src={`${e.condition.icon}`} alt="X" />
                          <h3 className="">{e.temp_c} &deg;C</h3>
                          <p>{e.condition.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="load">
              <h3 className="txt">Data is loading ...</h3>
              <div className="quote">
                <h5 className="">Do you know ?</h5>
                <p className="">
                  The hottest temperature ever recorded on Earth is 134°F (56.7°C)
                </p>
                <button className="brief" onClick={togglePopover}>
                  Click to read more
                </button>
                {isPopoverVisible && (
                  <div className=" expla popover-content">
                    The hottest temperature ever recorded on Earth is 134°F
                    (56.7°C)! This scorching record was set in Death Valley,
                    California, on July 10, 1913. Despite its harsh environment,
                    the area supports unique wildlife and plants that have adapted
                    to these intense conditions.
                  </div>
                )}
              </div>
            </div>
          )}
        </main> {/* Main landmark ends here */}
      </div>
    </div>
  );
}
export default App;  