const bronze = require('./bronze')

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
})
