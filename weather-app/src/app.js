const express = require("express");
const { getWeather } = require("./utils/getWeather");
const bodyPaeser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

// setup template engine
app.set("view engine", "hbs");

app.use(bodyPaeser.urlencoded({ extended: false }));
app.use(bodyPaeser.json());

app.use(express.json());
// setup static
const pathPublic = path.join(__dirname, "../public");
app.use(express.static(pathPublic));

app.get("/", async (req, res) => {
  const { address } = req.query;
  if (address) {
    const {
      success,
      temperature,
      wind_speed,
      precip,
      cloudcover,
      country,
      region,
    } = await getWeather(address);
    res.render("weather", {
      isSearch: true,
      success,
      temperature: temperature,
      wind_speed,
      precip,
      cloudcover,
      country,
      region,
    });
  } else {
    res.render("weather", {
      isSearch: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Weahter app listening at http://localhost:${port}`);
});

// =================================================================
