import React, { Component} from 'react';
import { Route,Routes } from 'react-router-dom';
import { connect } from 'react-redux';


import weather from './assets/animated/weather.svg';
import CountryWeather from './containers/countryPage/country';
import CityWeather from './containers/cityPage/city';
import './App.css'

class App extends Component {
  
  render(){



    return (
      <div className='App'>
        <h1>Weather Forecast <img src={weather} alt="LOGO"/></h1>
        <div>
         
            <Routes>
              <Route path="/" element={<CountryWeather/>} />
              <Route path="/CityWeather" element={<CityWeather/>} />
            </Routes>
         
          
        </div>
      </div>   
        
      
    )
  }
  
};

const mapStateToProps=state=>{
  return{
          
    City:state.place.placeDetails.city,
          
  }
}

export default connect(mapStateToProps)(App);