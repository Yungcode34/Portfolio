import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from 'axios'
import { weatherAPIKey, newsAPIKey } from './secrets'
import { WorkLinks, OutputInstructions, WeatherOutput, NewsOutput, AboutOutput, AskForLocation, LocationDenied } from './components'

class App extends Component {
  constructor() {
    super();

    this.state = {
      output: '',
      input: 'getting location',
      lat: null,
      long: null,
      cityName: '',
      temp: null,
      weatherDescr: null,
      newsTitle: '',
      newsDesc: '',
      newsUrl: '',
      denied: false,
    };
  }

  componentDidMount() {
    // this.outputInstructions();
    this.askForLocation()

    this.getCurrentLocation();
    this.getNews();
  }

  outputInstructions() {
    return <OutputInstructions/>
  }

  askForLocation() {
    return <AskForLocation />
  }

  getNews() {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsAPIKey}`)
    .then(res => {
      this.setState({
        newsTitle: res.data.articles[0].title,
        newsDesc: res.data.articles[0].description,
        newsUrl: res.data.articles[0].url,
      })
    })
    .catch(err => console.error(err))
  }

  getCurrentLocation() {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0, 
    }
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      this.setState({
        lat,
        long,
        input: ''
      })
      this.mainOutput()
      this.outputAudio()
      this.getWeather()
    }, (err) => {
      if (err.code === err.PERMISSION_DENIED) {
        this.setState({input: '', denied: true})
        console.log(this.state)
        this.mainOutput()
        this.outputAudio()
        console.log(err)
      }
    })
  }
  
  getWeather() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&APPID=${weatherAPIKey}`)
    .then(res => {
      console.log(res.data)
      this.setState({
        temp: Math.floor(res.data.main.temp * 9 / 5 - 459.67),
        weatherDescr: res.data.weather[0].description,
        cityName: res.data.name,
      })
    })
    .catch(err => console.error(err))
    
  }

  typing (evt) {
    let input = evt.target.value;
    let audio = document.getElementById("beep");
    if (typeof input === "string") {
      audio.play();
    }
  }
  
  outputAudio() {
    let audio = document.getElementById("data");
    audio.play();
  }

  changeToCommands() {
    setTimeout(() => {
      this.mainOutput()
    }, 5000)
  }

  mainOutput() {
    const state = this.state
    let aboutInput = ['about', 'who are you', 'hi', 'hello']
    if (aboutInput.includes(state.input)) {
      return <AboutOutput />
    } else if (state.input === 'weather' && !state.denied) {
      return <WeatherOutput temp={state.temp} weatherDescr={state.weatherDescr} cityName={state.cityName} />
    } else if (state.denied && state.input === 'weather') {
      // state.denied = !state.denied;
      return <LocationDenied />
    } else if (state.input === 'latest news') {
      return <NewsOutput newsUrl={state.newsUrl} newsTitle={state.newsTitle} newsDesc={state.newsDesc} />;
    } else if (state.input === 'getting location') {
      return <AskForLocation />
    } else {
      this.outputAudio();
      return <OutputInstructions />;
    }
  }


  // use switch statements instead of if statements 
  handleSubmit(evt) {
    evt.preventDefault();
    let input = evt.target.inputval.value;
    let workInput = ['work', 'projects']
    let aboutInput = ['about', 'who are you', 'hi', 'hello']
    let changeState = () => this.setState({output: '', input})
    if (workInput.includes(input)) {
      this.setState({
        output: {
          "Mongo scraper": " https://glacial-oasis-46115.herokuapp.com/",
          "Unidos catering": "https://github.com/Yungcode34/online-unidos-catering",
          "Firend finder": "https://cryptic-dawn-20142.herokuapp.com/",
          "React click game": "https://intense-temple-19100.herokuapp.com/",
          "App vid Tutorials ↓":"",
          "Unidos catering ran local": "https://drive.google.com/file/d/18C5Iyg_XC1lMDQ5na22_qm8AZWZf3vg_/view",
          "Node market app prt 1": " https://drive.google.com/file/d/1001WbcE5KkqDX56mxHxEibWSBqVQQePu/view",
          "Node market app prt 2": "https://drive.google.com/file/d/17oEzDv5L6Jr_aaHyYc6_joanvotuHfiZ/view",
        },
        input
      });
      evt.target.inputval.value = "";
      this.outputAudio();
      return <WorkLinks output={this.state.output} />;
    } else if (input === "links") {
      this.setState({
        output: {
          Github: "https://github.com/Yungcode34",
          Instagram: "https://www.instagram.com/Butterrzz/",
      
        },
        input
      });
      evt.target.inputval.value = "";
      this.outputAudio();
      return <WorkLinks output={this.state.output} />;
    } else if (aboutInput.includes(input)) {
      changeState()
      evt.target.inputval.value = "";
      this.outputAudio();
      return this.mainOutput();
    } else if (input === 'weather') {
      changeState()
      evt.target.inputval.value = "";
      this.outputAudio()
      return this.mainOutput()
    } else if (input === 'latest news') {
      changeState()
      evt.target.inputval.value = "";
      this.outputAudio()
      return this.mainOutput()
    } else {
      changeState()
      evt.target.inputval.value = "";
      this.outputAudio();
      return this.mainOutput();
    }
  }

  render() {
    const work = this.state.output;
    return (
      <div className="App">
        <h1 className="white luis">// ANDRES CARDENAS //</h1>

        <div className="panels">
          <div className="input-panel">
            <p className="white">INPUT</p>
            <form onSubmit={evt => this.handleSubmit(evt)}>
              <input
                onChange={this.typing}
                className="input-box"
                name="inputval"
              />
              <button type="submit" className="white">
                | SUBMIT |
              </button>
            </form>
            <audio
              ref={(beep) => { this.audio = beep }}
              id="beep"
              src="https://firebasestorage.googleapis.com/v0/b/symbalplayer.appspot.com/o/music%2Fbeep.wav?alt=media&token=e076788f-03ae-433c-98cf-d977b1d38f80"
            />
            <audio
              ref={(data) => { this.audio = data }}
              id="data"
              src="https://firebasestorage.googleapis.com/v0/b/symbalplayer.appspot.com/o/music%2Fdata_1.mp3?alt=media&token=534f968d-a663-4b3a-9282-5061ac52acdb"
            />
          </div>

          <div className="output-panel">
            <p className="white">OUTPUT</p>
            <div className="output-box">
                {typeof work === 'string'
                  ? this.mainOutput()
                  : <WorkLinks output={this.state.output} /> 
                }
            </div>
            <p>hi</p>
          </div>
        </div>
        <div className="footer white">+</div>
      </div>
    );
  }
}

export default App;
