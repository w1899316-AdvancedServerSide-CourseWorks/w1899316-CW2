function filterInfo(country) {
    return {
      name: country.name && country.name.common ? country.name.common : null,
      currencies: country.currencies ? country.currencies : null,
      capital: country.capital && country.capital.length > 0 ? country.capital[0] : null,
      languages: country.languages ? country.languages : null,
      flag: country.flags && country.flags.png ? country.flags.png : null
    };
  }
  
  module.exports = { filterInfo };
  