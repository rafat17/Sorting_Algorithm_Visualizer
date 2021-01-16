import { wait } from './controller.js'
import { rearrange_blocks } from './block_functions.js'
import { partition, build_max_heap, max_heapify, merge_arr } from './sortSubFuncs.js'

import { getWait } from './waitConfig.js'

export async function bubbleSort(blocks) {

    let swap_counter = -1
    let length = blocks.length

    while (swap_counter != 0) {

        swap_counter = 0
        let count = 0

        while (count < length - 1) {

            blocks[count].selected = true
            blocks[count + 1].selected = true

            rearrange_blocks(blocks)
            await wait(getWait())

            if (blocks[count].pos_no > blocks[count + 1].pos_no) {

                let temp = blocks[count + 1].pos_no
                blocks[count + 1].pos_no = blocks[count].pos_no
                blocks[count].pos_no = temp
                swap_counter++
            }

            rearrange_blocks(blocks)
            await wait(getWait())
            blocks[count].selected = false
            blocks[count + 1].selected = false
            count++

        }

        length -= 1
    }

    rearrange_blocks(blocks)

}


export async function selectionSort(blocks) {

    let start = 0
    let min = null;
    let min_index = null

    while (start < blocks.length - 1) {
        blocks[start].selected = true

        min = blocks[start].pos_no
        min_index = start

        rearrange_blocks(blocks)
        await wait(getWait())

        // blocks[start].selected = false

        for (let i = start + 1; i < blocks.length; i++) {

            blocks[i].selected = true
            rearrange_blocks(blocks)
            await wait(getWait()) 

            blocks[i].selected = false

            if (min > blocks[i].pos_no) {
                // blocks[min_index].selected = false
                min = blocks[i].pos_no
                min_index = i
                // blocks[min_index].selected = true
                // rearrange_blocks(blocks)
                // await wait(getWait())
            }
        }


        // blocks[start].selected = true
        blocks[min_index].selected = true 
        rearrange_blocks(blocks)
        await wait(getWait())

        let temp = blocks[min_index].pos_no
        blocks[min_index].pos_no = blocks[start].pos_no
        blocks[start].pos_no = temp

        rearrange_blocks(blocks)
        await wait(getWait())
        blocks[start].selected = false
        blocks[min_index].selected = false
        start += 1

    }

    rearrange_blocks(blocks)
}



export async function insertionSort(blocks) {
    let count = 1

    while (count < blocks.length) {
        let back = count - 1
        let shift = 0

        blocks[count].selected = true
        rearrange_blocks(blocks)
        await wait(getWait())

        while (back > -1) {

            blocks[back].selected = true
            rearrange_blocks(blocks)
            await wait(getWait())

            if (blocks[back].pos_no > blocks[count].pos_no) {

                blocks[back].selected = false
                rearrange_blocks(blocks)
                await wait(getWait())

                shift++
                back--
            }
            else {
                blocks[back].selected = false
                break
            }
        }


        let val = blocks[count]
        let start = blocks.slice(0, count - shift)
        val.selected = true

        rearrange_blocks(blocks)
        await wait(getWait())

        blocks.splice(count, 1)
        let end = blocks.slice(count - shift)

        blocks = [...start, val, ...end]
        rearrange_blocks(blocks)
        await wait(getWait())

        val.selected = false
        count++

    }

    rearrange_blocks(blocks)

}


export async function quickSort(blocks, low, high) {
    if (low < high) {
        partition(blocks, low, high).then(res => {
            let loc = res
            quickSort(blocks, low, loc - 1)
            quickSort(blocks, loc + 1, high)
        })
    }
}


export async function heapSort(arr) {
    await build_max_heap(arr)
    var heap_size = arr.length - 1 

    for(let i= arr.length - 1; i > -1; i--){
        
        arr[i].selected = true
        arr[0].selected = true
        rearrange_blocks(arr)
        await wait(getWait())
        
        let temp = arr[i].pos_no
        arr[i].pos_no = arr[0].pos_no
        arr[0].pos_no = temp
        rearrange_blocks(arr)
        await wait(getWait())

        arr[i].selected = false
        arr[0].selected = false
        rearrange_blocks(arr)
        await wait(getWait())

        await max_heapify(arr, 0, heap_size)
        heap_size--        
        
    }
}


export async function mergeSort(arr, start, end){

    if(start < end){
        let mid = Math.floor((start + end)/2)
        await mergeSort(arr, start, mid)
        await mergeSort(arr, mid + 1, end)
        await merge_arr(arr, start, mid, end)
    }

}



