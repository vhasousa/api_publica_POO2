import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import api from '../../services/api';

import { Container, List } from './styles';

interface CityParams {
  city: string;
}

interface Weather {
  results: {
    city: string;
    description: string;
    date: string;
    forecast: [
      {
        date: string;
        weekday: string;
        max: number;
        min: number;
        description: string;
      },
    ];
  };
}

const City: React.FC = () => {
  const [weather, setWeather] = useState<Weather[]>([]);
  const { params } = useRouteMatch<CityParams>();

  useEffect(() => {
    async function loadData(): Promise<void> {
      const response = await api.get<Weather>(`&city_name=${params.city}`);
      const { data } = response;
      setWeather([data]);
    }

    loadData();
  }, [params.city]);

  return (
    <Container>
      {weather.map(city => (
        <h1>{city.results.city}</h1>
      ))}
      <List>
        {weather.map(cityWeather => (
          <li key={cityWeather.results.city}>
            <ul>
              {cityWeather.results.forecast.map(weekWeather => (
                <li key={weekWeather.date}>
                  <div>
                    <p>{weekWeather.date}</p>
                    <p>{weekWeather.weekday}</p>
                    <p>
{' '}
{weekWeather.min} ºC</p>
                    <p>
{' '}
{weekWeather.max} ºC</p>
                    <p>{weekWeather.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default City;
