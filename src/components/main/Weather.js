import React from "react";
import "./weather.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSun,
  FaStreetView,
  FaSearch,
  FaCloud,
  FaCloudShowersHeavy,
} from "react-icons/fa";

function Weather() {
  const [history, setHistory] = useState({
    location: "",
    country: "",
    lDate: "",
    temp: "",
    minTemp: "",
    maxTemp: "",
    weatherStatus: "",
  });
  const [fldData, setFldData] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=Faisalabad&appid=b2ac8ff3776e2d3bfefb3f7de63a228a&units=metric"
      )
      .then((res) => {
        let dat = {
          location: res.data.name,
          country: res.data.sys.country,
          lDate: new Date().toLocaleDateString(),
          temp: Math.floor(res.data.main.temp),
          minTemp: Math.floor(res.data.main.temp_min),
          maxTemp: Math.floor(res.data.main.temp_max),
          weatherStatus: res.data.weather[0].main,
        };
        setHistory(dat);
      });
  }, []);
  const val = () => {
    let a = fldData;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${a}&appid=b2ac8ff3776e2d3bfefb3f7de63a228a&units=metric`
      )
      .then((res) => {
        console.log(res.data);
        let dat = {
          location: res.data.name,
          country: res.data.sys.country,
          lDate: new Date().toLocaleDateString(),
          temp: Math.floor(res.data.main.temp),
          minTemp: Math.floor(res.data.main.temp_min),
          maxTemp: Math.floor(res.data.main.temp_max),
          weatherStatus: res.data.weather[0].main,
        };
        setHistory(dat);
      });
  };

  const getCurrentTime = () => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let now = new Date();
    let month = months[now.getMonth()];
    let date = now.getDate();

    let hours = now.getHours();
    let mins = now.getMinutes();
    let perios = "AM";
    if (hours > 11) {
      perios = "PM";
      if (hours > 12) hours -= 12;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }

    return `${month} ${date} | ${hours}:${mins}${perios}`;
  };
  const handleDown = (e) => {
    if (e.key === "Enter") {
      val();
    }
  };

  const weatherImg = (tempStatus) => {
    if (tempStatus === "Sunny") {
      return <FaSun style={{ color: "#eccc68" }} />;
    } else if (tempStatus === "Clouds") {
      return <FaCloud style={{ color: "white" }} />;
    } else if (tempStatus === "Rainy") {
      return <FaCloudShowersHeavy style={{ color: "white" }} />;
    } else {
      return <FaSun style={{ color: "#eccc68" }} />;
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div className="box">
        <div className="searchBox">
          <input
            type="text"
            value={fldData}
            onInput={(e) => setFldData(e.target.value)}
            onKeyDown={handleDown}
          />
          <div onClick={val} style={{ width: "25px", marginLeft: "3px" }}>
            <FaSearch />
          </div>
        </div>
        <div className="wave one"></div>
        <div className="wave two"></div>
        <div className="wave three"></div>

        <div id="weathercon">
          {/* <FaSun style={{ color: "#eccc68" }} /> */}
          {weatherImg(history.weatherStatus)}
        </div>

        <div className="info">
          <h2 className="location">
            <FaStreetView />
            {history.location},{history.country}
          </h2>
          <p id="date">date {getCurrentTime()}</p>
          <h1 className="temp" id="temp">
            {history.temp}&deg;C
          </h1>
          <h3 className="tempmin_max">
            {history.minTemp}&deg;C | {history.maxTemp}&deg;C
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Weather;
