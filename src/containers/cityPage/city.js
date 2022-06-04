import React,{useState,useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';


import {connect} from 'react-redux';
import { Navigate } from 'react-router';

import Spinner from '../../components/Spinner/Spinner'; 
import rain from '../../assets/animated/rainy-6.svg'
import thunder from '../../assets/animated/thunder.svg'
import snow from '../../assets/animated/snowy-1.svg'
import Sunny from '../../assets/animated/day.svg'
import night from '../../assets/animated/night.svg'
import cloud from '../../assets/animated/cloudy.svg'
import LineChart from '../../components/lineChart/lineChart';
import LineChart2 from '../../components/lineChart/lineChart2';
import './city.css';


const CityWeather =(props)=>{
    
    const [placeDetails,setPlaceDetails] =useState({});
    const [weatherDetails,setWeatherDetails] =useState({});
    const [flag,setFlag] =useState(false);
    const [hourlyData,setHourlyData]=useState([]);
    const [monthlyData,setMonthlyData]=useState([]);
    const [error,setError] = useState({});

    useEffect(()=>{
        
        const URL=`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=86d45c50f1294e0abd320841220106&q=${props.City},${props.Country}&num_of_days=15&tp=3&format=json&includelocation=yes`;
        axios.get(URL)
        .then(wData=>{
        
        const place={ country:wData.data.data.nearest_area[0].country[0].value
            ,city:wData.data.data.nearest_area[0].region[0].value,
            area:wData.data.data.nearest_area[0].areaName[0].value};

       const Weather={
        avgtempC:wData.data.data.weather[0].avgtempC,
        maxtempC:wData.data.data.weather[0].maxtempC,
        mintempC:wData.data.data.weather[0].mintempC,
        sunHour:wData.data.data.weather[0].sunHour,
        sunrise:wData.data.data.weather[0].astronomy[0].sunrise,
        sunset:wData.data.data.weather[0].astronomy[0].sunset,
        weatherDesc:wData.data.data.current_condition[0].weatherDesc[0].value,
        
       }
       
       setPlaceDetails(place);
       setWeatherDetails(Weather);
       setHourlyData(wData.data.data.weather[0].hourly);
       setMonthlyData(wData.data.data.weather);
       setFlag(true);

       //console.log(wData.data.data.weather[0].hourly);
       //console.log(wData.data.data.weather);
       
        })
        .catch(error=>{
            setError(error);
        });

    },[])
    
    
    let source;
        if(flag){
            switch (weatherDetails.weatherDesc) {
                case "Sunny":
                    source=Sunny;
                    break;
                case "Snow":
                    source=snow;
                    break;
                case "Thunder":
                    source=thunder;
                    break;
                case "Cloudy":
                    source=cloud;
                    break;
                case "Rainy":
                    source=rain;
                    break;
                case "Clear":
                    source=night;
                    break;
                default:
                    source=Sunny;
                break;
            }
        }
        return (


            <div>
                
                {props.City !== "none"?
                !flag?error?<h2>{error.message} Please check your Network</h2>:<Spinner/>:
                <div className='container anmi'>
 
                    <div className='row mt-5 justify-content-center'>
                        <h1>{props.City},{placeDetails.country}</h1>
                    </div>

                    <div className='row mt-2 justify-content-center'>
                        <div className='col-4 fonte1'>
                            {moment().format('dddd')}
                        </div>
                        <div className='col-4 fonte1'>
                            {moment().format('LL')}
                        </div>
                    </div>


                    <div className='row mt-4'>

                        <div className='col-6'>
                            <img src={source} className="img-animate" alt='svg'/>    
                        </div>
                        
                        <div className='col-6 fonte align-self-center'>
                            <div className='row justify-content-center '>
                                {weatherDetails.avgtempC}c
                            </div>
                            <div className='row justify-content-center fonte3'>
                                avgtempC
                            </div>
                            
                        </div>
                    </div>
                   
                    <div className='row justify-content-center'>

                        <div className='col-6 fonte align-self-start'>{weatherDetails.weatherDesc}</div>

                        <div className='col-3 fonte'>
                            <div className='row justify-content-center align-self-end'>
                                {weatherDetails.maxtempC}c
                            </div>
                            <div className='row justify-content-center fonte3' >
                                maxtempC
                            </div>
                        </div>
                        
                        <div className='col-3 fonte'>
                            <div className='row justify-content-center align-self-end'>
                                {weatherDetails.mintempC}c
                            </div>
                            <div className='row justify-content-center fonte3' >
                                mintempC
                            </div>
                        </div>
                   
                    </div>

                    <div className='row mt-1 justify-content-center'>

                        <div className='col-6 align-self-end fonte'>{Number(weatherDetails.sunHour)}</div>
                        <div className='col-3 align-self-end fonte1' >{weatherDetails.sunrise}</div>
                        <div className='col-3 align-self-end fonte1' >{weatherDetails.sunset}</div>

                    </div>

                    <div className='row mb-2 justify-content-center'>

                        <div className='col-6 fonte2'>Sun Hours</div>
                        <div className='col-3 fonte2'>Sun Rise</div>
                        <div className='col-3 fonte2'>Sun Set </div>

                    </div>


                    <div className='row mt-2'>
                        
                        <LineChart  hourlyDataSet={hourlyData}  city={props.City}/>
                    </div>
                    <div className='row mt-2 mb-3'>
                        
                        <LineChart2  monthlyDataSet ={monthlyData}  city={props.City}/>
                    </div>
                    
                </div>
                
                :<Navigate to="/" />}
                
            </div>


        )
   

}

const mapStateToProps=state=>{
    return{
            
        City:state.place.placeDetails.city,
        Country:state.place.placeDetails.country,
            
    }
}

export default connect(mapStateToProps)(CityWeather);
