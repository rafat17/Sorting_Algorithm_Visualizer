import { speed } from './selectors.js'

var wait = Math.abs(parseInt(speed.value))

export function getWait(){
    return wait 
}

export function setWait(waitTime){
    wait = waitTime
}

