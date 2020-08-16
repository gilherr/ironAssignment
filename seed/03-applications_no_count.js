/* global db */

db.createCollection('applications')

db.applications.createIndex(
  { category: 1, avgAge: 1 },
  { name: 'category_avgAge' }
)

db.applications.insertMany(
  [
    {
      name: 'Kanlam',
      avgAge: 0,
      category: 'music',
      installCount: 0
    },
    {
      name: 'Opela',
      avgAge: 0,
      category: 'social',
      installCount: 0
    },
    {
      name: 'Regrant',
      avgAge: 0,
      category: 'travel',
      installCount: 0
    },
    {
      name: 'Greenlam',
      avgAge: 0,
      category: 'music',
      installCount: 0
    },
    {
      name: 'Tempsoft',
      avgAge: 0,
      category: 'social',
      installCount: 0
    },
    {
      name: 'Bitwolf',
      avgAge: 0,
      category: 'music',
      installCount: 0
    },
    {
      name: 'Aerified',
      avgAge: 0,
      category: 'travel',
      installCount: 0
    },
    {
      name: 'Asoka',
      avgAge: 0,
      category: 'travel',
      installCount: 0
    },
    {
      name: 'Sub-Ex',
      avgAge: 0,
      category: 'travel',
      installCount: 0
    },
    {
      name: 'Subin',
      avgAge: 0,
      category: 'music',
      installCount: 0
    },
    {
      name: 'Fixflex',
      avgAge: 0,
      category: 'music',
      installCount: 0
    },
    {
      name: 'Trippledex',
      avgAge: 0,
      category: 'travel',
      installCount: 0
    },
    {
      name: 'Stronghold',
      avgAge: 0,
      category: 'travel',
      installCount: 0
    },
    {
      name: 'Tres-Zap',
      avgAge: 0,
      category: 'social',
      installCount: 0
    },
    {
      name: 'Tin',
      avgAge: 0,
      category: 'social',
      installCount: 0
    }
  ]
)
