'use client';

import TempeRings from '@/components/temperatureconverter/TempRings';
import styles from './tempconv.module.css';
import { useState } from 'react';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState(24); // Starting Celsius value: 24°C
  const [farenheit, setFarenheit] = useState(75); // Corresponding Fahrenheit value for 24°C

  // Convert Celsius to Fahrenheit
  const convertToFarenheit = () => {
    const F = Math.round((9 / 5) * celsius + 32);
    setFarenheit(F);
  };

  // Convert Fahrenheit to Celsius
  const convertToCelsius = () => {
    const C = Math.round((farenheit - 32) * (5 / 9));
    setCelsius(C);
  };
  console.log(celsius);

  return (
    <div>
      <h2>Temperature Converter Page</h2>
      <div className={styles.container}>
        <TempeRings
          celsius={celsius}
          setCelsius={setCelsius}
          deg='C'
          convertToFarenheit={convertToFarenheit}
          farenheit={farenheit}
          setFarenheit={setFarenheit}
        />

        <TempeRings
          celsius={celsius}
          setCelsius={setCelsius}
          farenheit={farenheit}
          setFarenheit={setFarenheit}
          deg='F'
          convertToCelsius={convertToCelsius}
        />
      </div>
    </div>
  );
}
