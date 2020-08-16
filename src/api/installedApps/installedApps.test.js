jest.mock('../../loaders/logger')
jest.mock('./installedAppsDAL')

const dal = require('./installedAppsDAL')
const logger = require('../../loaders/logger')
const service = require('./installedAppsService')

describe('Installed Apps', () => {
  describe('Service', () => {
    it('should log a warning and return null if app was not found', async () => {
      dal.findAppByName.mockResolvedValue(null)
      const appName = 'non-existing-app'

      const res = await service.fetchInstalledApp(appName)

      expect(res).toBe(null)
      expect(dal.findAppByName).toHaveBeenCalledWith(appName)
      expect(logger.warn).toHaveBeenCalled()
    })

    it('shuold correctly calculate new avarage age and send it to DAL', async () => {
      dal.updateAvgAge = jest.fn()
      const app = { avgAge: 20, installCount: 2 }
      const newAge = 50
      const appAfterCalc = { avgAge: 30, installCount: 3 }

      service.calcAndSendNewAvgAge(app, newAge)

      expect(dal.updateAvgAge).toHaveBeenCalledWith(appAfterCalc)
    })
  })
})
