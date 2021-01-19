var p_objs = {
    sorted: false, 
    selected_algorithm: 'Bubble Sort'
}

import { ranger, options_container, options, selected, speed } from './modules/selectors.js'
import { get_blocks, make_blocks, rearrange_blocks, randomize } from './modules/block_functions.js'
import { remod_blocks } from './modules/block_functions.js'
import { handle_controllers, handle_slideStyle } from './modules/controller.js'
import * as algorithm_type from './modules/algorithms.js'
import { non_re_arrs } from './modules/arrays.js'
import { setWait, getWait } from './modules/waitConfig.js'


(() =>  make_blocks(20) )()


async function algorithm_selected_fn(algorithm) {

    var blocks = get_blocks()

    switch (algorithm) {
        case 'Bubble Sort':
            await algorithm_type.bubbleSort(blocks)
            break;
        case 'Selection Sort':
            await algorithm_type.selectionSort(blocks)
            break;
        case 'Insertion Sort':
            await algorithm_type.insertionSort(blocks)
            break;
        case 'Heap Sort':
            await algorithm_type.heapSort(blocks)
            break;
        case 'Quick Sort':
            await algorithm_type.quickSort(blocks, 0, blocks.length - 1)
            break;
        case 'Merge Sort':
            await algorithm_type.mergeSort(blocks, 0, blocks.length - 1)
            break;
    }

}





async function sort_blocks(selected_algorithm) {

    var blocks = get_blocks()
    var reload_page = () => location.reload()

    handle_controllers(true)

    if(p_objs.sorted) await randomize()

    window.addEventListener('blur', reload_page)

    if (non_re_arrs.includes(selected_algorithm)) {

        algorithm_selected_fn(selected_algorithm)
            .then(() => {
                handle_controllers(false)
                p_objs.sorted = true
                window.removeEventListener('blur', reload_page) 
            })
    }

    else {

        handle_controllers(true)
        algorithm_selected_fn(selected_algorithm)
        p_objs.sorted = true
        
        let waitTime 

        if (selected_algorithm == "Quick Sort") waitTime = blocks.length * Math.log(blocks.length) * getWait() * 3.1
        if (selected_algorithm == "Merge Sort") waitTime = blocks.length * Math.log(blocks.length) * getWait() * 4.4
        
        setTimeout(() => { 
            handle_controllers(false)
            window.removeEventListener('blur', reload_page)
        }, waitTime)
    }

}



window.addEventListener('pageshow', function () {
    ranger.value = '20'
    speed.value = '-100'
    p_objs.selected_algorithm = 'Bubble Sort'
    selected.innerHTML = p_objs.selected_algorithm
})


ranger.addEventListener('change', function () {

    handle_slideStyle(this)
    p_objs.sorted = false

    var blocks_num = parseInt(this.value)
    make_blocks(blocks_num)
    remod_blocks()

    var blocks = get_blocks()
    rearrange_blocks(blocks)
})



speed.addEventListener('change', function () {

    handle_slideStyle(this)
    var time = Math.abs(parseInt(this.value))
    setWait(time)
})

document.querySelector('.custom_btn').addEventListener('click', () => { 

    options_container.classList.remove('active')
    sort_blocks(p_objs.selected_algorithm) 
})


selected.addEventListener('click', () => options_container.classList.toggle('active'))


options.forEach(opt => {
    opt.addEventListener('click', () => {
        selected.innerHTML = opt.querySelector('label').innerHTML
        options_container.classList.remove('active')
        p_objs.selected_algorithm = selected.innerHTML
    })
})
