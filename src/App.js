import React, { useState, useEffect, useRef } from 'react';
import Visualizer from './components/visualizer/visualizer'
import Controls from './components/control/controls';
import { bubbleSort, mergeSort, quickSort, insertionSort, heapSort } from './helpers/algorithms'
import { playSound, stopSound, changeVolume } from './helpers/audio'
import './App.css';


function AppSecond() {

    const [comparingNodes, setComparingNodes] = useState([])
    const [boundaryNodes, setBoundaryNodes] = useState([])
    const [compCount, setCompCount] = useState(0)
    const [pivot, setPivot] = useState(-1)
    const [nums, setNums] = useState([])
    const [isSorting, setIsSorting] = useState(false)
    const [sorted, setSorted] = useState(false)
    const [selectedAlgo,setSelectedAlgo] = useState('merge')
    const [delay,setDelay] = useState(200)
    const delayRef = useRef();
    const requestIdRef = useRef()


    useEffect(() => {
        generateArray(20)
    }, []);

    const _shuffleArray = (array) => {
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const generateArray = (size) => {
        const nums = [];
        for (let i = 1; i < size; i++) {
            nums.push(i)
        }

        _shuffleArray(nums);
        setSorted(false)
        setComparingNodes([])
        setNums(nums)
    }

    const _swap = (idx1, idx2) => {
        const temp = nums[idx1]
        nums[idx1] = nums[idx2]
        nums[idx2] = temp;

        setNums([...nums])
    }

    const _overwrite = (idx, num) => {
        nums[idx] = num;
        setNums([...nums])
    }

    const _reset = _ => {
        stopSound()
        setCompCount(0)
        setSorted(false)
        setIsSorting(false)
        setComparingNodes([])
        setBoundaryNodes([])
        setPivot(-1)
    }

    const _complete = _ => {
        stopSound()
        setSorted(true)
        setIsSorting(false)
        setComparingNodes([])
        setBoundaryNodes([])
        setPivot(-1)
    }

    const _calculateFreq = (num1, num2, high = true) => {
        const n = nums.length
        const freq = 440;
        const factor = ((num1 / n) + (num2 / n) / 2) * freq;
        return high ? freq + factor : freq - factor
    }

    const _takeAction = (action) => {
        const delay = Number(delayRef.current.value)

        switch (action.type) {
            case "compare": {
                let [i, j] = action.payload
                setComparingNodes(action.payload)
                setCompCount(count => count + 1)
                playSound(_calculateFreq(nums[i], nums[j]), delay, 1)
                break;
            }
            case "swapped": {
                let [i, j] = action.payload;
                _swap(...action.payload)
                playSound(_calculateFreq(nums[i], nums[j], false), delay, 0.75)
                break;
            }
            case "overwrite": {
                let [i, num] = action.payload
                _overwrite(...action.payload)
                playSound(_calculateFreq(nums[i], num, false), delay, 0.75)
                break;
            }
            case "boundary":
                setBoundaryNodes(action.payload)
                break;
            case "pivot":
                setPivot(action.payload)
                break;
        }
    }


    const animate = (actionCollection) => {
        let start = performance.now()
        const step = (now) => {
            const elapsed = now - start
            const delay = Number(delayRef.current.value)
            if (elapsed > delay) {
                const action = actionCollection.shift()
                if (action) {
                    _takeAction(action)
                }
                start = now
            }

            if (!actionCollection.length) {
                _complete()

            } else {
                requestIdRef.current = requestAnimationFrame(step)
            }
        }

        requestIdRef.current = requestAnimationFrame(step)
    }



    const doSort = _ => {
        _reset()
        const actionCollection = [];

        switch (selectedAlgo) {
            case "bubble":
                bubbleSort(nums.slice(), actionCollection)
                break
            case "merge":
                mergeSort(nums.slice(), nums.slice(), 0, nums.length - 1, actionCollection)
                break;
            case "insertion":
                insertionSort(nums.slice(), actionCollection)
                break;
            case "quick":
                quickSort(nums.slice(), 0, nums.length - 1, actionCollection)
                break;
            case "heap":
                heapSort(nums.slice(), actionCollection)
                break;
        }
        setIsSorting(true)
        animate(actionCollection)
    }


    const _onStop = () => {
        cancelAnimationFrame(requestIdRef.current)
        _reset()
    }

    return (
        <div className="appContainer">

            <Visualizer
                nums={nums}
                delay={delay}
                algo={selectedAlgo}
                comparingNodes={comparingNodes}
                sorted={sorted}
                boundaryNodes={boundaryNodes}
                pivotNode={pivot}
                compCount={compCount}
            />

            <Controls
                ref={delayRef}
                delay={delay}
                algoSelection={selectedAlgo}
                onDelayChange={setDelay}
                onAlgoChange={setSelectedAlgo}
                onSizeChange={generateArray}
                onVolumeChange={changeVolume}
                isSorting={isSorting}
                isSorted={sorted}
                onStop={_onStop}
                onSort={doSort} />

        </div>
    );
}


export default AppSecond;
