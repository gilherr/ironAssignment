const dal = require('../applicationDAL')

function filteredFetcherFactory (filter) {
  switch (filter) {
    case 'category':
      return dal.fetchAppsByCategory
    default:
      return dal.fetchAll
  }
}

async function fetchAppsFilteredBy (filterName, filterValue) {
  const fecther = filteredFetcherFactory(filterName)
  const apps = await fecther(filterValue)
  return apps
}

module.exports = fetchAppsFilteredBy
