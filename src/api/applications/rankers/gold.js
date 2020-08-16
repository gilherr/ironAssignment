const logger = require('../../../loaders/logger')

function goldRanker (apps, customer) {
  logger.info('goldRanker: start', { apps: apps.map(app => app.name), customer })
  const NUM_APPS_TO_RECOMMEND = 2

  if (apps.length <= NUM_APPS_TO_RECOMMEND) {
    return apps
  }

  const primaryIdx = customBinarySearch(apps, customer.age)
  const secondIdx = findSecondaryIndex(apps, primaryIdx, customer.age)
  const recommendedApps = [apps[primaryIdx], apps[secondIdx]]

  return recommendedApps
}

function customBinarySearch (apps, age) {
  const len = apps.length

  if (age < apps[0].avgAge) return 0
  if (age > apps[len - 1].avgAge) return len - 1

  let lo = 0
  let mid
  let hi = len - 1

  while (lo <= hi) {
    mid = Math.floor((hi + lo) / 2)

    if (age < apps[mid].avgAge) {
      hi = mid - 1
    } else if (age > apps[mid].avgAge) {
      lo = mid + 1
    } else {
      return mid
    }
  }

  // if we got this far, it means lo and hi have switched places
  const absDistFromPrev = Math.abs(age - apps[hi].avgAge)
  const absDistFromNext = Math.abs(age - apps[lo].avgAge)

  return absDistFromNext < absDistFromPrev ? lo : hi
}

function findSecondaryIndex (apps, firstIdx, age) {
  if (firstIdx === 0) return 1
  if (firstIdx === apps.length - 1) return apps.length - 2

  const higherIdxAgeDist = apps[firstIdx + 1].avgAge - age
  const lowerIdxAgeDist = age - apps[firstIdx - 1].avgAge
  return higherIdxAgeDist < lowerIdxAgeDist ? firstIdx + 1 : firstIdx - 1
}

module.exports = goldRanker
