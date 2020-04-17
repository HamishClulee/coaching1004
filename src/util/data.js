import { squashFalseyToZero, createNumericFromString } from './index'

export const CASES = 'Cases'
export const DEATHS = 'Deaths'
export const RECOVERED = 'Recovered'
export const TESTED = 'Tested'
export const CRITICAL = 'Critical'
export const NEW_TODAY = 'New Today'

export const buildTileData = (data = []) => {
    let result = {
        [CASES]: 0,
        [DEATHS]: 0,
        [RECOVERED]: 0,
        [TESTED]: 0,
        [CRITICAL]: 0,
        [NEW_TODAY]: 0,
    }
    let exclude = ['North-America', 'Europe', 'Asia', 'South-America', 'Oceania', 'Africa', 'All']
    let index = 0
    let bounds = data.length - 1
    for (index; index < bounds; index++) {
        let item = data[index]
        if (exclude.indexOf(item.country) === -1) {
            result[CASES] += squashFalseyToZero(item.cases.active)
            result[DEATHS] += squashFalseyToZero(item.deaths.total)
            result[RECOVERED] += squashFalseyToZero(item.cases.recovered)
            result[TESTED] += squashFalseyToZero(item.tests.total)
            result[CRITICAL] += squashFalseyToZero(item.cases.critical)
            result[NEW_TODAY] += squashFalseyToZero(createNumericFromString(item.cases.new))
        }
    }

    return result
}