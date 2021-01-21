import Block from './block.js'
import { container } from './selectors.js'
import { handle_controllers } from './controller.js'

var block_arr = []

//for making the blocks and displaying on DOM
//each time the blocks slider is moved
export function make_blocks(end) {
    block_arr = []
    container.innerHTML = ""
    var start = 0
    while (start < end) {
        block_arr.push(new Block())
        container.insertAdjacentHTML('beforeend', 
        `<div class="block${block_arr[start].selected ? ' selected_block': ''}${block_arr[start].pivoted ? ' pivoted': ''}${block_arr[start].sorted ? ' sorted': ''}${!block_arr[start].num_disp ? ' remove_text': ''}"id="${start}" style="height: ${block_arr[start].pos_no}%;">${block_arr[start].pos_no}</div>`)
        start++
    }
}


//rearranges the blocks on every step of the chosen algorithm
export function rearrange_blocks(arr) {
    container.innerHTML = ""
    let count = 0

    while (count < arr.length) {
        container.insertAdjacentHTML('beforeend', 
        `<div class="block${arr[count].selected ? ' selected_block' : ''}${arr[count].pivoted ? ' pivoted': ''}${arr[count].sorted ? ' sorted': ''}${!arr[count].num_disp ? ' remove_text' : ''}" id="${count}" style="height: ${arr[count].pos_no}%;">${arr[count].pos_no}</div>`)
        count++
    }

}


export function get_blocks() {
    return block_arr
}


// shuffles the existing set of blocks on re sorting them !
export async function randomize(loop = Math.floor(2 + Math.random() * 4)) {

    handle_controllers(true)
    const wait = time => new Promise((resolve) => setTimeout(resolve, time));

    let count = 0
    while (count < loop) {
        block_arr = block_arr.sort(() => Math.random() - 0.5)
        rearrange_blocks(block_arr)
        count++
        await wait(400)

    }

}


// associated with blocks resizing and formatting !
export function remod_blocks(){

    if(block_arr.length > 30) { block_arr.forEach(curr => curr.num_disp = false) }
    else{ block_arr.forEach(curr => curr.num_disp = true) }
}


export function resize_blocks(blocks_num){
    var blocks = document.querySelectorAll('.block')

    if(blocks_num > 20){
        blocks.forEach(curr => curr.classList.toggle('remove_text'))
    }

    else{
        if(blocks[0].classList.value.includes('remove_text')){
            blocks.forEach(curr => curr.classList.toggle('remove_text'))
        }
    }
   
}

