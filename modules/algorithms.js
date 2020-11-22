import { wait } from './controller.js'
import { rearrange_blocks } from './block_functions.js'

async function bubbleSort(blocks) {

    let swap_counter = -1
    let length = blocks.length

    while (swap_counter != 0) {

        swap_counter = 0
        let count = 0

        while (count < length - 1) {

            blocks[count].selected = true
            blocks[count + 1].selected = true

            rearrange_blocks(blocks)
            await wait(200)

            if (blocks[count].pos_no > blocks[count + 1].pos_no) {

                let temp = blocks[count + 1].pos_no
                blocks[count + 1].pos_no = blocks[count].pos_no
                blocks[count].pos_no = temp
                swap_counter++
            }

            rearrange_blocks(blocks)
            await wait(200)
            blocks[count].selected = false
            blocks[count + 1].selected = false
            count++

        }

        length -= 1
    }

    rearrange_blocks(blocks)

}


async function selectionSort(blocks) {

    let start = 0
    let min = null;
    let min_index = null

    while (start < blocks.length - 1) {
        blocks[start].selected = true

        min = blocks[start].pos_no
        min_index = start

        rearrange_blocks(blocks)
        await wait(200)

        for (let i = start + 1; i < blocks.length; i++) {

            if (min > blocks[i].pos_no) {
                blocks[min_index].selected = false
                min = blocks[i].pos_no
                min_index = i
                blocks[min_index].selected = true
                rearrange_blocks(blocks)
                await wait(200)
            }
        }


        blocks[start].selected = true
        rearrange_blocks(blocks)
        await wait(200)

        let temp = blocks[min_index].pos_no
        blocks[min_index].pos_no = blocks[start].pos_no
        blocks[start].pos_no = temp

        rearrange_blocks(blocks)
        await wait(200)
        blocks[start].selected = false
        blocks[min_index].selected = false
        start += 1

    }

    rearrange_blocks(blocks)
}



async function insertionSort(blocks) {
    let count = 1

    while (count < blocks.length) {
        let back = count - 1
        let shift = 0

        blocks[count].selected = true
        rearrange_blocks(blocks)
        await wait(200)

        while (back > -1) {
            
            blocks[back].selected = true
            rearrange_blocks(blocks)
            await wait(200)

            if (blocks[back].pos_no > blocks[count].pos_no) {
                
                blocks[back].selected = false
                rearrange_blocks(blocks)
                await wait(200)

                shift++
                back--
            }
            else{
                blocks[back].selected = false 
                break
            }
        }


        let val = blocks[count]
        let start = blocks.slice(0, count - shift)
        val.selected = true 

        rearrange_blocks(blocks)
        await wait(200)

        blocks.splice(count, 1)
        let end = blocks.slice(count - shift)

        blocks = [...start, val, ...end]
        rearrange_blocks(blocks)
        await wait(200)

        val.selected = false 
        count++

    }

    rearrange_blocks(blocks)

}


export { bubbleSort, selectionSort, insertionSort }