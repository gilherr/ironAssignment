const bronze = require('./bronze')
const silver = require('./silver')

jest.mock('../applicationDAL')
const { fetchThirdPartyNumbers } = require('../applicationDAL')

describe('Rankers', () => {
  const NUM_APPS_TO_RECOMMEND = 2

  describe('Bronze', () => {
    it('should return 2 random elements from an array', () => {
      const apps = [1, 2, 3, 4, 5]
      const res = bronze(apps)
      expect(res.length).toBe(NUM_APPS_TO_RECOMMEND)
      res.forEach(app => {
        expect(apps).toContain(app)
      })
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
      const apps = [1, 2, 3, 4, 5]
      const res = await silver(apps)
      expect(res.length).toBe(NUM_APPS_TO_RECOMMEND)
      res.forEach(app => {
        expect(apps).toContain(app)
      })
    })

    it('should return an empty array when recieving an empty array', async () => {
      const res = await silver([])
      expect(res.length).toBe(0)
      expect(res).toEqual([])
    })

    it('should return the first two apps if http call fails', async () => {
      fetchThirdPartyNumbers.mockRejectedValue(new Error('mock http failed'))
      const apps = [1, 2, 3, 4, 5]
      const res = await silver(apps)
      expect(res.length).toBe(NUM_APPS_TO_RECOMMEND)
      expect(res).toEqual([1, 2])
    })
  })
})
