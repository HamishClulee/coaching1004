export const isFirstQueryParam = (url = '') => {
    return url.indexOf('?') === -1
}

export const addQueryParamReturnUrl = (url = '', param = '', value = '') => {
    return `${url}${isFirstQueryParam() ? '?' : '&'}${param}${value !== '' ? '='+value : '' }`
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

export const debounce = (func, wait, immediate = false) => {

    let timeout

    return () => {
        
        // Explain: arguments is a javascript keyword, eslint is wrong, Blame: Hamish
        // eslint-disable-next-line no-undef
        const context = this, args = arguments

        const later = () => {

            timeout = null
            if (!immediate) func.apply(context, args)
            
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
        
    }

}
