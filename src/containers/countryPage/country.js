import React,{Component} from 'react';
import axios from 'axios';
import { RegionDropdown } from 'react-country-region-selector';
import {connect} from 'react-redux' ;
import { NavLink } from 'react-router-dom';


import moment from 'moment';
import Spinner from '../../components/Spinner/Spinner';
import {setCity,setPlace} from '../../store/actions/location';
import rain from '../../assets/animated/rainy-6.svg';
import thunder from '../../assets/animated/thunder.svg';
import snow from '../../assets/animated/snowy-1.svg';
import Sunny from '../../assets/animated/day.svg';
import night from '../../assets/animated/night.svg';
import cloud from '../../assets/animated/cloudy.svg';
import './country.css'



class CountryWeather extends Component{
    
    state={
        Latitude:0,
        Longitude:0,
        placeDetails:{},
        weatherDetails:{},
        flag:false,
        City:" ",
        error:false,

    }

    selectRegion (val) {
    this.props.onCityChoosen(val);
    this.setState({City:val});
    }


    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position)=>{ 
            
            this.setState({Latitude:position.coords.latitude,Longitude:position.coords.longitude,flag:false});
            
            const URL=`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=86d45c50f1294e0abd320841220106&q=${position.coords.latitude},${position.coords.longitude}&num_of_days=7&tp=3&format=json&includelocation=yes&tide=yes`;
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
            yearly:wData.data.data.ClimateAverages[0].month,
            
           }
            this.setState({placeDetails:place,weatherDetails:Weather,flag:true,error:false});
            this.props.onIntialPlace(this.state);
            })
            .catch(error=>{
                this.setState({error:error})
            });
 
        }); 
        

    }
    
    render(){
        let source,yearlyMonthes =null,yearlymaxtemp=null,avgDailyRainfall=null,avgMinTemp=null,absMaxTemp_F=null;
        
        if(this.state.flag){
            if(this.state.weatherDetails.weatherDesc){
                const weatherDesc=this.state.weatherDetails.weatherDesc
                if(weatherDesc.includes("sun")||weatherDesc.includes("Sun")){
                    source=Sunny;
                }
                else if(weatherDesc.includes("Snow")||weatherDesc.includes("snow")){
                    source=snow;
                }
                else if(weatherDesc.includes("Thunder")||weatherDesc.includes("thunder")){
                    source=thunder;
                }
                else if(weatherDesc.includes("Cloud")||weatherDesc.includes("cloud")){
                    source=cloud;
                }
                else if(weatherDesc.includes("rain")||weatherDesc.includes("Rain")){
                    source=rain;
                }
                else {
                    source=night;
                }
            }
            yearlyMonthes = this.state.weatherDetails.yearly.map(month=>{
                return(
                    <th key={month.name}>{month.name} </th>
                )
            })
            yearlymaxtemp = this.state.weatherDetails.yearly.map((temp,index)=>{
                return(
                    <td key={temp.absMaxTemp+index}>{ Number(temp.absMaxTemp).toFixed(1)} </td>
                )
            })
            avgDailyRainfall = this.state.weatherDetails.yearly.map((rain,index)=>{
                return(
                    <td key={rain.avgDailyRainfall+index}>{rain.avgDailyRainfall} </td>
                )
            })
            avgMinTemp = this.state.weatherDetails.yearly.map((temp1,index)=>{
                return(
                    <td key={temp1.avgMinTemp+index+4}>{temp1.avgMinTemp} </td>
                )
            })
            absMaxTemp_F = this.state.weatherDetails.yearly.map((tempf,index)=>{
                return(
                    <td key={tempf.absMaxTemp_F+index+8}>{tempf.absMaxTemp_F} </td>
                )
            })
           
            
        }

            
        return(
            <div>
                {!this.state.flag?this.state.error?<h2> You Have a{this.state.error.message} Please check your Network</h2>:<Spinner/>:
                
                <div className='container anmi align-items-center'>
                    
                    <div className="input-group mt-4">
                        <RegionDropdown
                        className='custom-select'
                        country={this.state.placeDetails.country}
                        value={this.state.City}
                        onChange={(val) => this.selectRegion(val)}
                        />

                        <div className="input-group-append">
                            <NavLink to="/CityWeather"><button className="btn btn-outline-primary" type="button" >Select</button></NavLink>
                        </div>
                    </div>

                    <div className='row mt-5 justify-content-center'>
                        <h1>{this.state.placeDetails.city},{this.state.placeDetails.country}</h1>
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

                        <div className='col-6 align-self-end'>
                            <img src={source} className="img-animate" alt='svg'/>    
                        </div>
                        
                        <div className='col-6 fonte align-self-center'>
                            <div className='row justify-content-center '>
                                {this.state.weatherDetails.avgtempC}c
                            </div>
                            <div className='row justify-content-center fonte3'>
                                avgtempC
                            </div>
                            
                        </div>
                    </div>
                   
                    <div className='row justify-content-center'>

                        <div className='col-6 fonte align-self-start'>{this.state.weatherDetails.weatherDesc}</div>

                        <div className='col-3 fonte'>
                            <div className='row justify-content-center align-self-end'>
                                {this.state.weatherDetails.maxtempC}c
                            </div>
                            <div className='row justify-content-center fonte3' >
                                maxtempC
                            </div>
                        </div>
                        
                        <div className='col-3 fonte'>
                            <div className='row justify-content-center align-self-end'>
                                {this.state.weatherDetails.mintempC}c
                            </div>
                            <div className='row justify-content-center fonte3' >
                                mintempC
                            </div>
                        </div>
                   
                    </div>

                    <div className='row mt-1 justify-content-center'>

                        <div className='col-6 align-self-end fonte'>{Number(this.state.weatherDetails.sunHour)}</div>
                        <div className='col-3 align-self-end fonte1' >{this.state.weatherDetails.sunrise}</div>
                        <div className='col-3 align-self-end fonte1' >{this.state.weatherDetails.sunset}</div>

                    </div>

                    <div className='row justify-content-center mb-2'>

                        <div className='col-6 fonte2'>Sun Hours</div>
                        <div className='col-3 fonte2'>Sun Rise</div>
                        <div className='col-3 fonte2'>Sun Set </div>
                    
                   
                    </div>
                   
                
                    
                    <div className="row row-content mt-4 mb-2">
                    <div className="col-12 resizeClass">
                    <h3>Yearly Expected Weather of {this.state.placeDetails.city},{this.state.placeDetails.country}</h3>
                    <div className="table-responsive">
                    <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            {yearlyMonthes}
                        </tr>
                      </thead>
                        <tbody className='customTable'>
                            <tr>
                                <th>absMaxTemp_C</th>
                                {yearlymaxtemp}
                            </tr>
                            <tr>
                                <th>avgDailyRainfall</th>
                                {avgDailyRainfall}
                            </tr>
                            <tr>
                                <th>absMaxTemp_F</th>
                                {absMaxTemp_F}
                            </tr>
                            <tr>
                                <th>avgMinTemp_C</th>
                                {avgMinTemp}
                            </tr>
                           
                        </tbody>
                    </table>
                    </div>
                    </div>
                    </div>
                    
                

                </div>}
            </div>
            
        )
    }

}

const mapDispatchToProps=dispatch=>{
    return{
            onCityChoosen:(city)=>dispatch(setCity(city)),
            onIntialPlace:(initialdata)=>dispatch(setPlace(initialdata)),
            
        }
}

export default connect(null,mapDispatchToProps)(CountryWeather);