# World Cities

A convenient wrapper for the [GeoNames](https://www.geonames.org/) database of world cities data.

The data from the GeoNames tab seperated values files are parsed and normalized into a JSON object for quick lookup and distance calculations. The data for each city's country is also normalized, indexed by [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code, paired with the country's flag's SVG, [GeoJSON](https://geojson.org/) of its boundaries, and relative URL to Wikipedia page.

## Folder Structure

| Folder | Description |
| --- | --- |
| `./bin` | Shell scripts to pull and convert the datasets to update for republishing. |
| `./converters` | Scripts to convert source TSV files into JSON. |
| `./data` | Source TSV data files. |
| `./dist` | "Compiled" output for creating [the npm package](https://www.npmjs.com/package/worldcities). |
| `./dist/data` | The converted and formatted JSON. |
| `./dist/flags` | SVG files of the flags of each country. |
| `./dist/geojson` | The GeoJSON of the shape of each country. |

## Usage and Tools

### Timezones

The city data includes the IANA timezone ID in string format; ie. "America/Los_Angeles". To use these to localize dates and times to the city, it's highly recommended to use the [Moment Timezone library](https://momentjs.com/timezone/).

For example, to convert a UNIX timestamp to a localized date time string:

```javascript
const moment = require('moment-timezone');

moment(Math.floor(Date.now() / 1000), 'X')
  .tz('America/Los_Angeles')
  .format('dddd, MMMM Do YYYY, h:mm:ss a z');

// "Friday, May 1st 2020, 5:52:11 am PDT"
```

### GeoJSON

GeoJSON objects can be visualized nicely in the [http://geojson.io/](http://geojson.io/) UI.

Google Maps also supports using [GeoJSON as a "Data Layer"](https://developers.google.com/maps/documentation/javascript/datalayer) via the API.

## Data Sources

City and country data:

[GeoNames](https://download.geonames.org/export/dump/)

Flag SVG data

[flag-icon-css](https://github.com/lipis/flag-icon-css)

