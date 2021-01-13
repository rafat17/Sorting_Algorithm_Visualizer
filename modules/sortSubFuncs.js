import { wait } from "./controller.js"
import { rearrange_blocks } from './block_functions.js'
import { getWait } from './waitConfig.js'

var time = getWait()


//HeapSort sub functions !
//sub function for quicksort algorithm !
export async function partition(arr, low, high) {
    var pivot = arr[low].pos_no
    var start = low
    var end = high

    while (start < end) {

        arr[start].selected = true
        arr[end].selected = true

        rearrange_blocks(arr)
        await wait(200)

        while (arr[start].pos_no <= pivot) {

            arr[start].selected = false
            rearrange_blocks(arr)
            await wait(200)
            start++

            if (start > arr.length - 1) break

            else {
                arr[start].selected = true
                rearrange_blocks(arr)
                await wait(200)
                // arr[start].selected = false
            }
        }

        while (arr[end].pos_no > pivot) {

            arr[end].selected = false
            rearrange_blocks(arr)
            await wait(200)
            end--

            if (end < 0) break

            else {
                arr[end].selected = true
                rearrange_blocks(arr)
                await wait(200)
                // arr[end].selected = false
            }
        }

        if (start < end) {

            arr[start].selected = true
            arr[end].selected = true

            let temp = arr[end].pos_no
            arr[end].pos_no = arr[start].pos_no
            arr[start].pos_no = temp

            rearrange_blocks(arr)
            await wait(200)

            arr[start].selected = false
            arr[end].selected = false

            rearrange_blocks(arr)
            await wait(200)
        }

        else {
            if (start <= arr.length - 1) arr[start].selected = false
            if (end >= 0) arr[end].selected = false
        }
    }


    arr[low].selected = true
    arr[end].selected = true
    rearrange_blocks(arr)
    await wait(200)

    var temp = arr[end].pos_no
    arr[end].pos_no = arr[low].pos_no
    arr[low].pos_no = temp

    rearrange_blocks(arr)
    await wait(200)

    arr[low].selected = false
    arr[end].selected = false

    rearrange_blocks(arr)
    await wait(200)

    arr[end].pivoted = true
    return end

}



//HeapSort sub functions !
//sub function 1 for the heapsort algorithm
//max heapify function
export async function max_heapify(arr, idx, heap_s = arr.length) {

    if (heap_s == 1 || heap_s == 0) return


    var [left, right, largest, heap_size] = [2 * idx + 1, 2 * idx + 2, idx, heap_s]

    arr[idx].selected = true

    rearrange_blocks(arr)
    await wait(200)

    if (left < heap_size) {

        if (arr[left].pos_no > arr[largest].pos_no) largest = left

    }

    if (right < heap_size) {

        if (arr[right].pos_no > arr[largest].pos_no) largest = right
    }

    if (largest !== idx) {

        arr[largest].selected = true

        rearrange_blocks(arr)
        await wait(200)

        let temp = arr[largest].pos_no
        arr[largest].pos_no = arr[idx].pos_no
        arr[idx].pos_no = temp

        rearrange_blocks(arr)
        await wait(200)

        arr[idx].selected = false
        arr[largest].selected = false

        rearrange_blocks(arr)
        await wait(200)
        await max_heapify(arr, largest, heap_s)
    }

    else {
        arr[idx].selected = false

        rearrange_blocks(arr)
        await wait(200)
    }


}


//sub function 2 for heapifying an unordered block list
export async function build_max_heap(arr) {

    var start = Math.floor(arr.length / 2)

    for (var i = start; i > -1; i--) {
        rearrange_blocks(arr)
        await wait(200)
        await max_heapify(arr, i)
    }

    rearrange_blocks(arr)
    await wait(200)
}



//MergeSort sub functions ! 
//sub function for the merge_arr algorithm
export async function merge_arr(arr, start, mid, end) {
    var new_arr = []
    var i = start
    var j = mid + 1



    while (i <= mid && j <= end) {

        arr[i].selected = true
        arr[j].selected = true
        rearrange_blocks(arr)
        await wait(200)

        if (arr[i].pos_no <= arr[j].pos_no) {

            new_arr.push(arr[i].pos_no)

            arr[i].selected = false
            rearrange_blocks(arr)
            await wait(200)
            i++


        }

        else {

            new_arr.push(arr[j].pos_no)

            arr[j].selected = false
            rearrange_blocks(arr)
            await wait(200)
            j++
        }

    }

    if (i > mid) {

        arr[i].selected = false

        while (j <= end) {

            arr[j].selected = true
            rearrange_blocks(arr)
            await wait(1000)
            new_arr.push(arr[j].pos_no)

            arr[j].selected = false
            rearrange_blocks(arr)
            await wait(200)
            j++
        }
    }

    else {
        while (i <= mid) {

            arr[i].selected = true
            rearrange_blocks(arr)
            await wait(200)
            new_arr.push(arr[i].pos_no)

            arr[i].selected = false
            rearrange_blocks(arr)
            await wait(200)
            i++
        }
    }

    for (let m = 0; m < new_arr.length; m++) {

        arr[start + m].selected = true
        rearrange_blocks(arr)
        await wait(200)

        arr[start + m].pos_no = new_arr[m]
        rearrange_blocks(arr)
        await wait(200)

        arr[start + m].selected = false
        rearrange_blocks(arr)
        await wait(200)

    }

    rearrange_blocks(arr)
    await wait(200)

}




