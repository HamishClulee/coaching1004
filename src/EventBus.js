import Vue from 'vue'
export const EventBus = new Vue()

// Event names
export const MESSAGES = 'usermessages'
export const GLOBAL_SPINNER = 'globalspinner'

// usage helpers
export const FIVE_SECONDS = 5000

// Bus set up functions
export const setUpMessages = (payload = { showToast: false }, ctx) => {
    ctx.showToast = payload.showToast
    ctx.text = payload.text
    ctx.bgColor = payload.bgColor
    ctx.textColor = payload.textColor
    ctx.timeToLive = payload.timeToLive
}