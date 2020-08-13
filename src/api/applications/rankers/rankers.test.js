const bronze = require('./bronze')
const silver = require('./silver')

jest.mock('../../../loaders/logger')
jest.mock('../applicationDAL')
const { fetchThirdPartyNumbers } = require('../applicationDAL')

describe('Rankers', () => {
  const NUM_APPS_TO_RECOMMEND = 2
  let apps = []

  beforeEach(() => {
    apps = _apps()
  })

  describe('Bronze', () => {
    it('should return 2 random elements from an array', () => {
      const res = bronze(apps)
      expect(res.length).toBe(NUM_APPS_TO_RECOMMEND)
      res.forEach(app => { expect(apps).toContain(app) })
      })

    it('should return an empty array when recieving an empty array', () => {
      const res = bronze([])
      expect(res.length).toBe(0)
      expect(res).toEqual([])
    })
  })

  describe('Silver', () => {
    it('should return 2 random elements selecet by external API', async () => {
      fetchThirdPartyNumbers.mockResolvedValueOnce(1)
      fetchThirdPartyNumbers.mockResolvedValueOnce(3)

      const res = await silver(apps)

      expect(res.length).toBe(NUM_APPS_TO_RECOMMEND)
      res.forEach(app => { expect(apps).toContain(app) })
      })

    it('should return an empty array when recieving an empty array', async () => {
      const res = await silver([])
      expect(res.length).toBe(0)
      expect(res).toEqual([])
    })

    it('should return the first two apps if http call fails', async () => {
      fetchThirdPartyNumbers.mockRejectedValue(new Error('mock http failed'))

      const res = await silver(apps)

      expect(res.length).toBe(NUM_APPS_TO_RECOMMEND)
      expect(res[0]).toEqual(apps[0])
      expect(res[1]).toEqual(apps[1])
    })
  })
})

const _apps = () => [
  {
    _id: '5f32413c95b85a6a22e32589',
    name: 'Voyatouch',
    avgAge: 13,
    category: 'music'
  },
  {
    _id: '5f32413c95b85a6a22e3258b',
    name: 'Domainer',
    avgAge: 14,
    category: 'music'
  },
  {
    _id: '5f32413c95b85a6a22e3258c',
    name: 'Voyatouch',
    avgAge: 14,
    category: 'music'
  },
  {
    _id: '5f32413c95b85a6a22e3258a',
    name: 'Temp',
    avgAge: 26,
    category: 'music'
  }
]
