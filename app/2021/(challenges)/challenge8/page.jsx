'use client';
import { useEffect, useState } from 'react';
import styles from './Weather.module.css';

// Minden nap neve
const daysOfWeekMap = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];

// Időjárás ikonjainak méretezése
const iconNameToSizeMap = {
  cloudy: { width: 264, height: 166 },
  sunny: { width: 208, height: 213 },
  stormy: { width: 246, height: 187 },
  snowy: { width: 230, height: 196 },
  'partly-cloudy': { width: 230, height: 209 },
  rainy: { width: 160, height: 222 },
};

// WMO kódokhoz rendelt ikonok
const weatherCodeToIconMap = {
  3: 'cloudy',
  53: 'stormy',
  51: 'rainy',
  71: 'snowy',
  52: 'rainy', // Ha van ilyen kód
};

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);

  // Fetch függvény az időjárási adatokhoz
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=46.4533&longitude=16.9861&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto'
      );
      const data = await response.json();
      if (data.daily) {
        setWeatherData(data.daily);
      } else {
        throw new Error('Érvénytelen adatformátum');
      }
    } catch (error) {
      console.error('Hiba történt az időjárási adatok betöltésekor:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Ha még nem töltődtek be az adatok, ne rendereljünk semmit
  if (!weatherData) {
    return <p>Az időjárási adatok betöltése folyamatban...</p>;
  }

  // Segédf

  return (
    <>
      <div className={styles.container}>
        <h2>Weather Forecast Nagykanizsa:</h2>
        <div className={styles.wrapper}>
          {weatherData.time &&
            weatherData.temperature_2m_max &&
            weatherData.temperature_2m_min &&
            weatherData.precipitation_sum &&
            weatherData.weathercode &&
            weatherData.time.map((day, index) => {
              const dayOfWeek = new Date(day).getDay();
              const dayName = daysOfWeekMap[dayOfWeek];
              const weatherIcon =
                weatherCodeToIconMap[weatherData.weathercode[index]] || 'sunny'; // Alapértelmezett 'sunny'
              const highTemp = weatherData.temperature_2m_max[index];
              const lowTemp = weatherData.temperature_2m_min[index];
              const precipitation = weatherData.precipitation_sum[index];

              return (
                <div key={index} className={styles.day}>
                  <div className={styles['day-of-week']}>{dayName}</div>
                  <div className={styles.date}>{new Date(day).getDate()}</div>

                  <div className={`${styles.bar} ${styles[weatherIcon]}`}>
                    <div className={styles.weather}>
                      <svg role='img'>
                        <use
                          href={`/weather.svg#${weatherIcon}`}
                          width={iconNameToSizeMap[weatherIcon]?.width || 100}
                          height={iconNameToSizeMap[weatherIcon]?.height || 100}
                          viewBox='0 0 264 166'
                        ></use>
                      </svg>
                    </div>
                    <div className={styles.temperature}>
                      {highTemp} <span className={styles.degrees}>&deg;</span>
                    </div>
                    <div className={styles.content}>
                      <div className={styles.precipitation}>
                        <svg role='img' className={styles.icon}>
                          <use href='/precipitation.svg#precipitation'></use>
                        </svg>
                        {precipitation} mm
                      </div>
                      <div className={styles.low}>
                        <svg role='img' className={styles.icon}>
                          <use href='/weather.svg#low'></use>
                        </svg>
                        {lowTemp}°C
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
