export const joinparams = () => {
    // TODO if needed
}

export const isFirstQueryParam = (url = '') => {
    return url.indexOf('?') === -1
}

export const addQueryParamReturnUrl = (url = '', param = '') => {
    // TODO add param value if needed
    return `${url}${isFirstQueryParam() ? '?' : '&'}${param}`
}

export const squashFalseyToZero = (squash) => {
    return squash || 0
}

export const formatNumberWithCommas = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'
}

export const createNumericFromString = (str = '') => {
    return str ? Number(str.replace(/\D/g,'')) : 0
}

