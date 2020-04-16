import Vue from 'vue'

export const EventBus = new Vue()

export const MESSAGES = 'usermessages'
export const FIVE_SECONDS = 5000

export const setUpMessages = (payload = { showToast: false }, ctx) => {
    ctx.showToast = payload.showToast
    ctx.text = payload.text
    ctx.bgColor = payload.bgColor
    ctx.textColor = payload.textColor
    ctx.timeToLive = payload.timeToLive
}