import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

interface Weather {
  results: {
    city: string;
    description: string;
    date: string;
    forecast: [
      {
        weekday: string;
        max: number;
        min: number;
      },
    ];
  };
}

const Dashboard: React.FC = () => {
  const [weather, setWeather] = useState<Weather[]>([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    localStorage.setItem(
      '@hg_brasil_api_weather:weather',
      JSON.stringify(weather),
    );
  }, [weather]);

  async function handleAddCity(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const response = await api.get<Weather>(`&city_name=${city},${state}`);
    const localization = response.data;
    setWeather([...weather, localization]);
  }

  return (
    <Container>
      <h1>Clime e tempo</h1>
      <Form onSubmit={handleAddCity}>
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Digite uma cidade"
        />
        <input
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder="Digite a sigla do estado"
        />
        <SubmitButton>Adicionar</SubmitButton>
      </Form>
      <List>
        {weather.map(data => (
          <Link key={data.results.city} to={`/detail/${data.results.city}`}>
            <li>
              <strong>{data.results.city}</strong>
              <h1>{data.results.description}</h1>
              <div>
                <h3>
                  Mínima:
                  {data.results.forecast[0].min}
                  ºC
                </h3>
                <h3>
                  Máxima:
                  {data.results.forecast[0].max}
                  ºC
                </h3>
              </div>
            </li>
          </Link>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;
