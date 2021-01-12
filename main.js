let p_objs = { selected_algorithm: algorithm_selected.value }

import { algorithm_selected } from './modules/selectors.js'
import { get_blocks, make_blocks } from './modules/block_functions.js'
import { handle_controllers } from './modules/controller.js'
import * as algorithm_type from './modules/algorithms.js'
import { non_re_arrs } from './modules/arrays.js'
import { getWait } from './modules/waitConfig.js'


(() => {
    make_blocks(0, 5)
})()


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
            await algorithm_type.quickSortFunc(blocks, 0, blocks.length - 1)
            break;
    }

}


async function sort_blocks(selected_algorithm) {

    var blocks = get_blocks()

    handle_controllers(true)

    if (non_re_arrs.includes(selected_algorithm)) {

        algorithm_selected_fn(selected_algorithm)
            .then(() => handle_controllers(false))
    }

    else {

        handle_controllers(true)
        algorithm_selected_fn(selected_algorithm)
        setTimeout(() => { handle_controllers(false) }, blocks.length * Math.log(blocks.length) * 750)
    }

}



document.getElementById('ranger').addEventListener('change', function () {
    make_blocks(0, parseInt(this.value))
})

document.querySelector('.btn-primary').addEventListener('click', () => {
    sort_blocks(p_objs.selected_algorithm)
})

algorithm_selected.addEventListener('change', function () {
    p_objs.selected_algorithm = this.value
})








