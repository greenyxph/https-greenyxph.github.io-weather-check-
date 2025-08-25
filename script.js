const windyKey = 'Bc6YzH3nlT2owltexLYG9FBpQ0NOS9ss'; // Your Windy API key

const requestBody = {
  lat: 15.0,
  lon: 120.9,
  model: 'gfs',
  parameters: ['temp', 'wind', 'rain'],
  key: windyKey
};

fetch('https://api.windy.com/api/point-forecast/v2', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(requestBody)
})
.then(res => res.json())
.then(data => {
  const output = document.getElementById('forecast');
  const timestamps = data?.forecast?.temp?.['2m']?.timestamps || [];

  if (timestamps.length === 0) {
    output.innerHTML = 'No forecast data available.';
    return;
  }

  let html = '<table><tr><th>Time</th><th>Temp (°C)</th><th>Wind (m/s)</th><th>Rain (mm)</th></tr>';
  timestamps.forEach((time, i) => {
    const temp = data.forecast.temp['2m'].values[i];
    const wind = data.forecast.wind['10m'].values[i];
    const rain = data.forecast.rain['surface'].values[i];
    html += `<tr><td>${new Date(time).toLocaleString()}</td><td>${temp}</td><td>${wind}</td><td>${rain}</td></tr>`;
  });
  html += '</table>';
  output.innerHTML = html;
})
.catch(err => {
  console.error('Windy API error:', err);
  document.getElementById('forecast').innerHTML = 'Error loading forecast.';
});
