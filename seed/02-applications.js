/* global db */

db.createCollection('applications')

db.applications.createIndex(
  { category: 1, avgAge: 1 },
  { name: 'category_avgAge' }
)

db.applications.insertMany(
  [
    {
      name: 'Voyatouch',
      avgAge: 13,
      category: 'music'
    },
    {
      name: 'Temp',
      avgAge: 26,
      category: 'music'
    },
    {
      name: 'Domainer',
      avgAge: 14,
      category: 'music'
    },
    {
      name: 'Voyatouch',
      avgAge: 14,
      category: 'music'
    },
    {
      name: 'Solarbreeze',
      avgAge: 53,
      category: 'music'
    },
    {
      name: 'Job',
      avgAge: 35,
      category: 'social'
    },
    {
      name: 'Hatity',
      avgAge: 34,
      category: 'social'
    },
    {
      name: 'Stringtough',
      avgAge: 17,
      category: 'social'
    },
    {
      name: 'Regrant',
      avgAge: 98,
      category: 'social'
    },
    {
      name: 'Stronghold',
      avgAge: 11,
      category: 'social'
    },
    {
      name: 'Biodex',
      avgAge: 18,
      category: 'sport'
    },
    {
      name: 'Voyatouch',
      avgAge: 56,
      category: 'sport'
    },
    {
      name: 'Lotstring',
      avgAge: 67,
      category: 'sport'
    },
    {
      name: 'Regrant',
      avgAge: 40,
      category: 'sport'
    },
    {
      name: 'Andalax',
      avgAge: 100,
      category: 'sport'
    }
  ]
)
