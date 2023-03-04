const asyncRequest = require("async-request");

const getWeather = async (address) => {
  const token = "20d207ae1281f443c23f0a602608254c";
  const url = `http://api.weatherstack.com/current?access_key=${token}&query=${address}`;
  try {
    const response = await asyncRequest(url);
    const data = JSON.parse(response.body);
    return {
      success: true,
      temperature: data.current.temperature,
      wind_speed: data.current.wind_speed,
      precip: data.current.precip,
      cloudcover: data.current.cloudcover,
      country: data.location.country,
      region: data.location.region,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

module.exports = {
  getWeather,
};
