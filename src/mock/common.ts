import { cloneDeep } from 'lodash'
import { mock, Random } from 'mockjs'
import Moment from 'moment'

export const mockMobile = () => mock('@integer(10000000000, 19999999999)') + ''

export const mockName = () => mock('@cname()')

export const mockWords = (min = 1, max = 10) => mock(`@cword(${min},${max})`)

export const mockBoolean = () => mock('@boolean()')

export const mockImg = (size = '200x200') => Random.image(size)

export const mockIntString = (length = 10) =>
  mock(`@string('number',${length})`)

export const mockInt = (min = 0, max = 10) => mock(`@integer(${min}, ${max})`)

export const mockTimestamp = (
  startTime = '2021-01-01 00:00:00',
  endTime = '2021-12-31 00:00:00'
) => {
  const min = Moment(startTime).valueOf()
  const max = Moment(endTime).valueOf()
  return mock(`@integer(${min}, ${max})`)
}

export const mockFormatTime = (format = 'yyyy-MM-dd HH:mm:ss') => {
  return mock(`@datetime(${format})`)
}

export const log = (params: { body: string }) => {
  params = cloneDeep(params)
  console.log(
    '************************************************************** mock **************************************************************'
  )
  if (params.body) {
    // 尝试解析请求body
    try {
      params.body = JSON.parse(params.body)
    } catch (e) {
      console.log(e)
    }
  }
  console.log(params)
  console.log(
    '**********************************************************************************************************************************'
  )
}

/**
 * 模拟浮点数
 * @param number min 最小值
 * @param number max 最大值
 * @param number fixNum 保留小数位
 * @returns string
 */
export const mockFloatString = (min = 2, max = 2, fixNum = 2) => {
  const _min = min * 10 ** fixNum
  const _max = max * 10 ** fixNum
  return (mockInt(_min, _max) / 10 ** fixNum).toFixed(fixNum)
}

/**
 * 从数组中任选一项
 * @param Array array
 */
export const pickOne = (array = []) => {
  return Random.pick(array)
}
