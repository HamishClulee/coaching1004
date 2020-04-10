import axios from 'axios'

const BASE_URL = 'http://localhost:5001/'
const SUMMARY = 'fakeapi'

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
        })

        this.ax.interceptors.response.use(res => res, (error) => {
            if (
                error.response
                && error.response.status > 400
                && error.response.status < 500
            ) 
            {
                // TODO implement error behaviour
            }
            return Promise.reject(error)
        })
    }

    summary() {
        return this.ax.get(`${BASE_URL}${SUMMARY}`)
    }
}

export default CoronaAPI
