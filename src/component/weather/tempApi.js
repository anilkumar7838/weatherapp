// api.openweathermap.org/data/2.5/weather?q= Delhi &appid=aa5ef17604225a4a94320abdccb9b915

import React from "react";
import WeatherCard from "./weatherCard";
import "./style.css";
import weatherCard from "./weatherCard";

const TempApi = () => {
    const [searchvalue,setSearchvalue]= React.useState("delhi");
    const [tempInfo,setTempInfo]= React.useState({});

    const getWeatherInfo= async ()=>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=aa5ef17604225a4a94320abdccb9b915`;
            const res= await fetch(url);
            const data=await res.json();
            // console.log(data);
            const {temp,humidity,pressure}=data.main;
            const{main:weathermood}=data.weather[0];
            const {name}= data;
            const {speed}=data.wind;
            const {country,sunset}= data.sys;

            const mynewWeatherInfo={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            }
            setTempInfo(mynewWeatherInfo);
        }catch(error){
            console.log(error);
        }
    }

    React.useEffect(() => {
        getWeatherInfo();
    }, [])
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchvalue}
            onChange={(e) =>{setSearchvalue(e.target.value)}}
          />
          <button className="searchButton" type="button" onClick={()=>{getWeatherInfo()}}>
            Search
          </button>
        </div>
      </div>

    {/* <WeatherCard tempInfo={tempInfo}/>       */}
    <WeatherCard {...tempInfo}/>      
    </>
  );
};

export default TempApi;
