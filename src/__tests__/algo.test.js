import { mergeSort, insertionSort, quickSort, heapSort, bubbleSort } from '../helpers/algorithms'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateRandomArray = () => {
    const nums = [];
    for (let i = 0; i < 5; i++) {
        nums.push(getRandomInt(1, 100))
    }
    return nums
}

describe("Sorting algorithms sorts array as expected", () => {

    test("test merge sort algo", () => {
        const randomArray = generateRandomArray()
        const sortedArray = randomArray.slice().sort((a, b) => a - b)

        mergeSort(randomArray, randomArray.slice(), 0, randomArray.length - 1, [])
        expect(randomArray).toEqual(sortedArray)
    })

    test("test quick sort algo", () => {
        const randomArray = generateRandomArray()
        const sortedArray = randomArray.slice().sort((a, b) => a - b)

        quickSort(randomArray, 0, randomArray.length - 1, [])

        expect(randomArray).toEqual(sortedArray)
    })

    test("test insertion sort algo", () => {
        const randomArray = generateRandomArray()
        const sortedArray = randomArray.slice().sort((a, b) => a - b)

        insertionSort(randomArray,[])

        expect(randomArray).toEqual(sortedArray)
    })

    test("test heap sort algo", () => {
        const randomArray = generateRandomArray()
        const sortedArray = randomArray.slice().sort((a, b) => a - b)

        heapSort(randomArray,[])

        expect(randomArray).toEqual(sortedArray)
    })

    test("test bubble sort algo", () => {
        const randomArray = generateRandomArray()
        const sortedArray = randomArray.slice().sort((a, b) => a - b)

        bubbleSort(randomArray,[])

        expect(randomArray).toEqual(sortedArray)
    })


})
