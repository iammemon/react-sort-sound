const _heapify = (mainArray, n, i, actionCollection) => {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    actionCollection.push({
        type: "boundary",
        payload: [i, n]
    })


    if (left < n) {

        actionCollection.push({
            type: "compare",
            payload: [left, largest]
        })

        if (mainArray[left] > mainArray[largest])
            largest = left
    }


    if (right < n) {
        actionCollection.push({
            type: "compare",
            payload: [right, largest]
        })

        if (mainArray[right] > mainArray[largest])
            largest = right;

    }

    if (largest != i) {

        actionCollection.push({
            type: "swapped",
            payload: [i, largest]
        })

        const temp = mainArray[largest]
        mainArray[largest] = mainArray[i]
        mainArray[i] = temp;
        _heapify(mainArray, n, largest, actionCollection);
    }
}

const heapSort = (mainArray, actionCollection) => {
    const n = mainArray.length

    // Build max heap
    for (let i = (parseInt(n / 2) - 1); i >= 0; i--) {
        _heapify(mainArray, n, i, actionCollection)
    }

    for (let i = n - 1; i >= 0; i--) {

        actionCollection.push({
            type: "swapped",
            payload: [0, i]
        })

        const temp = mainArray[0]
        mainArray[0] = mainArray[i]
        mainArray[i] = temp
        _heapify(mainArray, i, 0, actionCollection)
    }

}


const insertionSort = (mainArray, actionCollection) => {
    for (let i = 1; i < mainArray.length; i++) {
        const val = mainArray[i]
        let j = i - 1

        actionCollection.push({
            type: "boundary",
            payload: [i]
        })

        while (j >= 0 && val < mainArray[j]) {

            actionCollection.push({
                type: "compare",
                payload: [i, j]
            })


            actionCollection.push({
                type: "overwrite",
                payload: [j + 1, mainArray[j]]
            })

            mainArray[j + 1] = mainArray[j]
            --j
        }

        actionCollection.push({
            type: "overwrite",
            payload: [j + 1, val]
        })

        mainArray[j + 1] = val
    }
}

const _partition = (mainArray, start, end, actionCollection) => {
    const pivot = mainArray[end]
    let partitionIndex = start
    for (let i = start; i < end; i++) {

        actionCollection.push({
            type: "compare",
            payload: [start, i, end, partitionIndex]
        })

        if (mainArray[i] <= pivot) {

            actionCollection.push({
                type: "swapped",
                payload: [i, partitionIndex]
            })

            const temp = mainArray[partitionIndex]
            mainArray[partitionIndex++] = mainArray[i]
            mainArray[i] = temp
        }
    }
    actionCollection.push({
        type: "swapped",
        payload: [end, partitionIndex]
    })
    const temp = mainArray[partitionIndex]
    mainArray[partitionIndex] = mainArray[end]
    mainArray[end] = temp

    return partitionIndex;
}



const quickSort = (mainArray, start, end, actionCollection) => {
    if (start < end) {
        const partitionIndex = _partition(mainArray, start, end, actionCollection)
        quickSort(mainArray, start, partitionIndex - 1, actionCollection)
        quickSort(mainArray, partitionIndex + 1, end, actionCollection)

    }
}



const _merge = (mainArray, auxArray, start, middle, end, actionCollection) => {
    let k = start
    let i = start
    let j = middle + 1

    actionCollection.push({
        type: "boundary",
        payload: [start, end]
    })

    actionCollection.push({
        type: "pivot",
        payload: middle
    })


    while (i <= middle && j <= end) {

        actionCollection.push({
            type: "compare",
            payload: [start, i, j, end]
        })

        if (auxArray[i] <= auxArray[j]) {

            actionCollection.push({
                type: "overwrite",
                payload: [k, auxArray[i]]
            })

            mainArray[k++] = auxArray[i++]

        } else {

            actionCollection.push({
                type: "overwrite",
                payload: [k, auxArray[j]]
            })

            mainArray[k++] = auxArray[j++]
        }
    }

    while (i <= middle) {

        actionCollection.push({
            type: "overwrite",
            payload: [k, auxArray[i]]
        })


        mainArray[k++] = auxArray[i++]

    }
    while (j <= end) {

        actionCollection.push({
            type: "overwrite",
            payload: [k, auxArray[j]]
        })

        mainArray[k++] = auxArray[j++]

    }
}

const mergeSort = (mainArray, auxArray, start, end, actionCollection) => {
    if (start == end) return;

    const middle = parseInt((start + end) / 2)

    mergeSort(auxArray, mainArray, start, middle, actionCollection)
    mergeSort(auxArray, mainArray, middle + 1, end, actionCollection)
    _merge(mainArray, auxArray, start, middle, end, actionCollection)
}


const bubbleSort = (mainArray, actionCollection) => {
    const n = mainArray.length

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            actionCollection.push({
                type: "compare",
                payload: [j, j + 1]
            })

            if (mainArray[j] > mainArray[j + 1]) {

                actionCollection.push({
                    type: "swapped",
                    payload: [j, j + 1]
                })


                const temp = mainArray[j]
                mainArray[j] = mainArray[j + 1]
                mainArray[j + 1] = temp
                swapped = true

            }
        }
        if (!swapped) {
            break;
        }
    }
}

export { bubbleSort, mergeSort, quickSort, insertionSort, heapSort }