/// <reference types="jest" />
import { City } from './city';


test('.getAllByName returns the correct number of matches', () => {
  expect(City.getAllByName('lOn').length).toBe(122);
  expect(City.getAllByName('nEw YoRk', 'US').length).toBe(2);
});


test('.getByName ignores case', () => {
  expect(City.getByName('zAgReB')).not.toBeUndefined();
});


test('.getByName returns nothing for an unknown city', () => {
  expect(City.getByName('Nowheresville')).toBeUndefined();
});


test('.getByName returns the first city by name', () => {
  const city = City.getByName('London');
  expect(city).not.toBeUndefined();
  expect(city?.country?.name).toBe('Canada');
});


test('.getByName with country code returns the correct city', () => {
  const city = City.getByName('London', 'GB');
  expect(city).not.toBeUndefined();
  expect(city?.country?.name).toBe('United Kingdom');
});


test('.getCountry returns the full country data', () => {
  const city = City.getByName('London', 'GB');
  const country = city?.getCountry();
  expect(typeof country?.geoJSON).toBe('object');
  expect(country?.flagSVG?.length).toBeGreaterThan(100);
});

test('.getLargestCities finds the correct largest cities', () => {
  expect(City.getLargestCities()[8].name).toBe('Guangzhou');
  expect(City.getLargestCities('NA')[2].name).toBe('Los Angeles');
  expect(City.getLargestCities('SA', 20)[18].name).toBe('Asuncion');
});

test('.getNearest finds the correct closest cities', () => {
  expect(City.getNearest(12.05288, -61.75226).name).toBe("Saint George's");
  expect(City.getNearest(51.507351, -0.127758).country.name).toBe('United Kingdom');
  expect(City.getNearest(40.712776, -74.005974).country.continent).toBe('NA');
  expect(City.getNearest(-34.566950, -58.258640).country.currencyName).toBe('Peso');
  expect(City.getNearest(37.774929, -122.419418).country.languages).toContain('es-US');
});


test('.getNearestCountry finds the correct countries', () => {
  expect(City.getNearestCountry(50.4727969, -0.0509147645).name).toBe('United Kingdom');
  expect(City.getNearestCountry(16.540405, -114.39702284).currencyName).toBe('Peso');
});


test('.getNearestLargeCity finds the correct cities', () => {
  const lat = 17.076480407330514;
  const lng = -101.3674415353851;
  const city = City.getNearest(lat, lng);
  const largeCity = City.getNearestLargeCity(lat, lng);
  expect(city.name).toBe('Petatlan');
  expect(largeCity.name).toBe('Acapulco de Juarez');
});


test('City schema exported', () => {
  const schema = City.schema;
  expect(Object.keys(schema.properties).length).toBe(6);
  expect(Object.keys(schema.required).length).toBe(6);
});
