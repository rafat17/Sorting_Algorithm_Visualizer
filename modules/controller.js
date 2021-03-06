import { control_inputs } from './selectors.js'


//styles the range inputs according to the new value on the input slider !
export function handle_slideStyle(el){


    if(el.id == 'ranger') el.style.background = `linear-gradient(90deg, #A846A0 ${el.value - 5}%, #226ce0 ${el.value}%)`

    
    else{

        let denom = Math.abs(parseInt(el.max) - parseInt(el.min))
        let value = Math.abs(parseInt(el.value) - parseInt(el.min))
        let percent = Math.floor((value/denom)*100)

        el.style.background = `linear-gradient(90deg, #A846A0 ${percent}%, #226ce0 ${percent}%)`
    }
}


//enables/disables the inputs based on the event whether or not the sorting is going on !
export function handle_controllers(disable_it) {
    if(disable_it){ 
        control_inputs.forEach(curr => { 
            curr.setAttribute('disabled', disable_it)
            curr.classList.add('blur')
        })
    }

    else{ 
            control_inputs.forEach(curr => { 
                curr.removeAttribute('disabled')
                curr.classList.remove('blur')
            })    
    }
}

export function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
