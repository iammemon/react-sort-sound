import React, { forwardRef } from 'react';
import './control.css'

const Controls = ({
    delay,
    onDelayChange,
    algoSelection,
    onAlgoChange,
    delayRef,
    onSizeChange,
    onVolumeChange,
    onSort,
    onStop,
    isSorting,
    isSorted
}) => {


    const doToggle = _ => {
        isSorting ? onStop() : onSort()
    }

    return (
        <div className="controlsContainer">

            <h2>React Sort Sound</h2>

            <div className="controlsSection">
                <span className="control">
                    <label htmlFor="algo">Algorithm</label>
                    <select disabled={isSorting && !isSorted} value={algoSelection} onChange={e => onAlgoChange(e.target.value)}>
                        <option value="merge">Merge Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="quick">Quick Sort</option>
                        <option value="heap">Heap Sort</option>
                        <option value="bubble">Bubble Sort</option>
                    </select>
                </span>
                <span className="control">
                    <label htmlFor="size">Size</label>
                    <input id="size" type="number" disabled={isSorting && !isSorted} defaultValue={20} max="1000" onChange={e => onSizeChange(e.target.value)} />
                </span>
                <span className="control">
                    <label htmlFor="delay">Delay</label>
                    <input id="delay" type="range" value={delay} min="1" max="1000" ref={delayRef} onChange={e => onDelayChange(e.target.value)} />
                </span>
                <span className="control">
                    <label htmlFor="volume">Volume</label>
                    <input id="volume" type="range" min="0" max="100" onChange={e => onVolumeChange(e.target.value)} />
                </span>
                <span className="control">
                    <button style={{
                        backgroundColor: isSorting ? "grey" : "#0a73fa"
                    }}
                        onClick={doToggle}>{isSorting ? "Stop" : "Sort"}</button>
                </span>
            </div>
        </div>

    )

}

export default forwardRef((props, ref) => {
    return <Controls {...props} delayRef={ref} />

})