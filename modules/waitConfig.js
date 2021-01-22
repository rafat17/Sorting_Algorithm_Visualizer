import { speed } from './selectors.js'

//sets the value of the animation speed !
var wait = Math.abs(parseInt(speed.value))

export function getWait(){
    return wait 
}

export function setWait(waitTime){
    wait = waitTime
}

