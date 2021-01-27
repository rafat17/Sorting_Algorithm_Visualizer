import * as selector from './modules/selectors.js'
import { get_blocks, make_blocks, remod_blocks, rearrange_blocks, randomize } from './modules/block_functions.js'
import { handle_controllers, handle_slideStyle } from './modules/controller.js'
import * as algorithm_type from './modules/algorithms.js'
import { non_re_arrs } from './modules/arrays.js'
import { setWait } from './modules/waitConfig.js'


//IIFE code to initialize default input setup !
(() => {
    handle_slideStyle(selector.ranger)
    handle_slideStyle(selector.speed)
    make_blocks(20)
})()


//object to hold the current sorting state true/false
//sets the selected algorithm that the user decides as input !
var p_objs = {
    sorted: false,
    selected_algorithm: 'Bubble Sort'
}


//function to select the appropriate main function
//according to the selected algorithm input !
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


//this function start sort the blocks once the "Sort" button get clicked !
//temporarily disables the inputs while the sorting process goes on !
async function sort_blocks(selected_algorithm) {

    var blocks = get_blocks()

    handle_controllers(true)

    if (p_objs.sorted) await randomize()

    if (non_re_arrs.includes(selected_algorithm)) {

        algorithm_selected_fn(selected_algorithm)
            .then(() => {

                blocks.map(curr => curr.sorted = false)
                if (selected_algorithm !== 'Insertion Sort') rearrange_blocks(blocks)

                handle_controllers(false)
                p_objs.sorted = true
            })
    }

    else {

        let timer
        algorithm_selected_fn(selected_algorithm)


        if (selected_algorithm == "Quick Sort") {
            timer = setInterval(function () {
                if (blocks.every(curr => curr.sorted == true)) {
                    blocks.map(curr => curr.sorted = false)
                    p_objs.sorted = true

                    rearrange_blocks(blocks)
                    handle_controllers(false)
                    clearInterval(timer)
                }
            }, 1200);
        }

        if (selected_algorithm == "Merge Sort") {
            timer = setInterval(function () {
                if (blocks.every(curr => curr.sorted == true)) {
                    blocks.map(curr => curr.sorted = false)
                    p_objs.sorted = true

                    rearrange_blocks(blocks)
                    handle_controllers(false)
                    clearInterval(timer)
                }
            }, 1200);
        }

    }

}



// WINDOW EVENT

//resets inputs on browser back press to this page !
window.addEventListener('pageshow', function () {
    selector.ranger.value = '20'
    selector.speed.value = '-50'
    p_objs.selected_algorithm = 'Bubble Sort'
    selector.selected.innerHTML = p_objs.selected_algorithm
})


//checks whether we trigger the input container display from the hamburger menu button !
window.addEventListener('click', e => {
    if (selector.inputs_container.classList.contains('show')) {
        if (e.target.parentElement.classList.contains('inputs_container')) return
        else if (e.target.classList.contains('inputs_container')) return
        else {
            selector.inputs_container.style.transition = '0.4s'
            selector.inputs_container.classList.remove('show')
            setTimeout(() => selector.inputs_container.style.transition = 'none', 400)
        }
    }

    if (e.target.id == 'hbg-btn') {
        selector.inputs_container.style.transition = '0.4s'
        selector.inputs_container.classList.add('show')
    }
})


// INPUT EVENTS

//determines the number of blocks to appear on the DOM !
selector.ranger.addEventListener('change', function () {

    handle_slideStyle(this)
    p_objs.sorted = false

    var blocks_num = parseInt(this.value)
    make_blocks(blocks_num)
    remod_blocks()

    var blocks = get_blocks()
    rearrange_blocks(blocks)
})


//determines the speed of the sorting animation !
selector.speed.addEventListener('change', function () {

    handle_slideStyle(this)
    var time = Math.abs(parseInt(this.value))
    setWait(time)
})


//the sort button that starts sorting on click
//temporarily gets disabled while the sorting goes on !
selector.button.addEventListener('click', () => {

    selector.options_container.classList.remove('active')
    selector.inputs_container.classList.remove('show')
    sort_blocks(p_objs.selected_algorithm)
})


//expands the select algorithm section on clicking over it !
selector.selected.addEventListener('mouseover', () => selector.options_container.classList.add('active'))
selector.selected.addEventListener('mouseout', () => selector.options_container.classList.remove('active'))


//adds event listener of click to each option inside the select algorithm section
//on clicking any option the select algorithm section collapses !
selector.options.forEach(opt => {
    opt.addEventListener('click', () => {
        selector.selected.innerHTML = opt.querySelector('label').innerHTML
        selector.options_container.classList.remove('active')
        p_objs.selected_algorithm = selector.selected.innerHTML
    })

    opt.addEventListener('mouseover', () => selector.options_container.classList.add('active'))
    opt.addEventListener('mouseout', () => selector.options_container.classList.remove('active'))
})


//closes the input container menu on clicking the close icon button !
selector.cross_btn.addEventListener('click', () => {
    selector.inputs_container.style.transition = '0.4s'
    selector.inputs_container.classList.remove('show')
    setTimeout(() => selector.inputs_container.style.transition = 'none', 400)
})









