import { control_inputs } from './selectors.js'


function handle_controllers(disable_it) {
    disable_it ? control_inputs.forEach(curr => curr.setAttribute('disabled', disable_it))
        : control_inputs.forEach(curr => curr.removeAttribute('disabled'))
}

function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


export { wait, handle_controllers }