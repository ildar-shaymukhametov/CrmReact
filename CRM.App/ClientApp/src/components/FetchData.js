import React from "react";
import { useQuery } from "react-query";
import { useClient } from "../context/AuthContext";

function useWeatherData() {
  const client = useClient();
  return useQuery("weather", () =>
    client("weatherforecast").then(data => data)
  );
}

function renderForecastsTable(forecasts) {
  return (
    <table className="table table-striped" aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map(forecast => (
          <tr key={forecast.date}>
            <td>{forecast.date}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function FetchData() {
  const { data, isLoading, isError } = useWeatherData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div role="alert">Failed to fetch forecasts</div>;
  }

  return (
    <div>
      <h1 id="tabelLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {renderForecastsTable(data)}
    </div>
  );
}
