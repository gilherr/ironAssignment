const rewire = require('rewire')
jest.mock('../../../loaders/logger')
jest.mock('../applicationDAL')

const bronze = require('./bronze')
const silver = require('./silver')
const gold = require('./gold')

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

  describe('Gold', () => {
    it.each`
      customer       | primaryIdx | secondaryIdx
      ${{ age: 1 }}  | ${0}       | ${1}
      ${{ age: 20 }} | ${2}       | ${1}
      ${{ age: 28 }} | ${4}       | ${3}
      ${{ age: 200 }}| ${7}       | ${6}
    `('should return apps at index: [$primaryIdx. $secondaryIdx] for customer: $customer',
      ({ customer, primaryIdx, secondaryIdx }) => {
        expect(gold(apps, customer)).toEqual([apps[primaryIdx], apps[secondaryIdx]])
      })

    it('should return empty array when apps array is empty', () => {
      expect(gold([], { age: 25 })).toEqual([])
    })

    describe('Custom Binary Search', () => {
      let binarySearch

      beforeEach(() => {
        binarySearch = rewire('./gold').__get__('customBinarySearch')
      })

      it('should return the first item if age is less than the lowest item', async () => {
        const foundIdx = binarySearch(apps, 10)
        expect(foundIdx).toBe(0)
      })

      it('should return the last item if age is greater than the highest item', async () => {
        const ret = binarySearch(apps, 200)
        expect(ret).toBe(apps.length - 1)
      })

      it('should find an item that match', async () => {
        const findings0 = binarySearch(apps, 13)
        const findings1 = binarySearch(apps, 26)
        const findings3 = binarySearch(apps, 100)

        expect(findings0).toEqual(0)
        expect(findings1).toEqual(3)
        expect(findings3).toEqual(7)
      })

      it('should return closest item to requested age', async () => {
        const findings1 = binarySearch(apps, 15)
        const findings2 = binarySearch(apps, 30)
        const findings3 = binarySearch(apps, 17)
        const findings4 = binarySearch(apps, 90)

        expect(findings1).toBe(1)
        expect(findings2).toBe(4)
        expect(findings3).toBe(2)
        expect(findings4).toBe(7)
      })
    })

    describe('Find Secondary Index', () => {
      let findSecondary

      beforeEach(() => {
        findSecondary = rewire('./gold').__get__('findSecondaryIndex')
      })

      it('shuold find the nearest match', () => {
        const ret1 = findSecondary(apps, 4, 30)
        const ret2 = findSecondary(apps, 0, 13)
        const ret3 = findSecondary(apps, 6, 67)

        expect(ret1).toBe(3)
        expect(ret2).toBe(1)
        expect(ret3).toBe(5)
      })
    })
  })
})

const _apps = () => [
  {
    _id: '0',
    name: 'Voyatouch',
    avgAge: 13,
    category: 'music'
  },
  {
    _id: '1',
    name: 'Domainer',
    avgAge: 14,
    category: 'music'
  },
  {
    _id: '2',
    name: 'Biodex',
    avgAge: 18,
    category: 'sport'
  },
  {
    _id: '3',
    name: 'Temp',
    avgAge: 26,
    category: 'music'
  },
  {
    _id: '4',
    name: 'Regrant',
    avgAge: 26,
    category: 'sport'
  },
  {
    _id: '5',
    name: 'Hatity',
    avgAge: 56,
    category: 'sport'
  },
  {
    _id: '6',
    name: 'Lotstring',
    avgAge: 67,
    category: 'sport'
  },

  {
    _id: '7',
    name: 'Andalax',
    avgAge: 100,
    category: 'sport'
  }
]
