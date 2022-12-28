import { useState } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
      })
      setLocation('')
    }
  }

  return (
    <>
      <Head>
        <title>Weather App - NextJS</title>
      </Head>
    //  main body
      <div className={styles.app}>
        {/* location input  */}
        <div className={styles.search_bar}>
          <input
            value={location}
            placeholder='Enter your Location!!'
            type="text"
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
          />
        </div>

        {/* weather information  */}
        <div className={styles.container}>
          <div className={styles.top_box}>
            <div className={styles.location}>
              <p>{data.name}</p>
            </div>
            <div className={styles.temp}>
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className={styles.description}>
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {/* extra information  */}
          {data.name !== undefined &&
            <div className={styles.bottom}>
              <div className={styles.feels}>
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className={styles.wind}>
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
              <div className={styles.humidity}>
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>

            </div>
          }



        </div>
      </div>
    </>
  );
}

export default App;