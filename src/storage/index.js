export const TILE_STORE = 'Tiles'
export const GLOBAL_STORE = 'Global'

export const saveData = (storeName, data) => {
    localStorage.setItem(storeName, JSON.stringify(data))
    return this
}

export const doesDataExist = (storeName) => {
    return !!localStorage.getItem(storeName)
}

export const getData = (storeName) => {
    return JSON.parse(localStorage.getItem(storeName))
}
