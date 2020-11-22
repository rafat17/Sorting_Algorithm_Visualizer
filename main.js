let p_objs = { selected_algorithm: algorithm_selected.value }

import { algorithm_selected } from './modules/selectors.js'
import { get_blocks, loadBlocks, make_blocks, randomize } from './modules/block_functions.js'
import { handle_controllers } from './modules/controller.js'
import { bubbleSort, selectionSort, insertionSort } from './modules/algorithms.js'


(() => {
    loadBlocks()
})()


async function algorithm_selected_fn(algorithm){

    let blocks = get_blocks()

    switch(algorithm){
        case 'Bubble Sort':
            await bubbleSort(blocks)
            break;
        case 'Selection Sort':
            await selectionSort(blocks)
            break;
        case 'Insertion Sort':
            await insertionSort(blocks)
            break;
        default:
            console.log('Irrelevant choice !')
            break
    }


}


function sort_blocks(selected_algorithm) {

    handle_controllers(true)

    algorithm_selected_fn(selected_algorithm)
    .then(() => handle_controllers(false))

}



document.getElementById('ranger').addEventListener('change', function () {
    make_blocks(0, parseInt(this.value))
})

document.querySelector('.btn-primary').addEventListener('click', () => {
    sort_blocks(p_objs.selected_algorithm)
})

document.getElementById('algorithms').addEventListener('change', function () {
    p_objs.selected_algorithm = this.value
})








