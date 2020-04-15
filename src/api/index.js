import axios from 'axios'
import { addQueryParamReturnUrl } from '../util'

const BASE_URL = 'https://covid-193.p.rapidapi.com/'
const STATISTICS = 'statistics'
const COUNTRIES = 'countries'

export function ErrStr(error) {
    if (error.response && error.response.data.status) {
        return error.response.data.status
    }
    return 'Something went wrong - please try again.'
}

export class CoronaAPI {
    ax
    constructor() {

        this.ax = axios.create({
            baseURL: BASE_URL,
            headers: {
                'x-rapidapi-host': 'covid-193.p.rapidapi.com',
                'x-rapidapi-key': 'c76ff93115msh327b239986bf6a2p1531d0jsn4c8c855301ec',
            },
        })

        this.ax.interceptors.response.use(res => res, error => {
            if (error.response && error.response.status > 400 && error.response.status < 500) {
                console.warn(ErrStr(error))
            }
            return Promise.reject(error)
        })
    }

    statistics() {
        return this.ax.get(`${BASE_URL}${STATISTICS}`)
    }
    countries() {
        return this.ax.get(`${BASE_URL}${COUNTRIES}`)
    }
    history(countryName = '') {
        const url = `${BASE_URL}${COUNTRIES}`
        if(countryName !== '') return this.ax.get(`${addQueryParamReturnUrl(url, countryName)}`)
        else return this.ax.get(url)
    }
}

export default CoronaAPI
