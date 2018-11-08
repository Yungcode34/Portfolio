import React from 'react'

const WeatherOutput = (props) => {
  return (
    <div className="about">
      <p>Hi,</p>
      <br />
      <p>It is {props.temp} degrees Farenheit</p>
      <p>and a {props.weatherDescr} kind of</p>
      day in {props.cityName}.
      <br />
    </div>
  )
}

export default WeatherOutput
