import React from 'react'
import Bar from './bar'
import './visualizer.css'


const Visualizer = ({ delay, algo, nums, comparingNodes, boundaryNodes, pivotNode, sorted, compCount }) => {

    const generateBars = _ => {
        const mapBars = (num, idx) => (
            <Bar key={idx}
                height={(num / nums.length) * 100}
                is_sorted={sorted}
                is_comparing={comparingNodes.includes(idx)}
                is_boundary={boundaryNodes.includes(idx)}
                is_pivot={idx == pivotNode}
            />
        )
        return nums.map(mapBars)
    }

    return (
        <div className="visualContainer">
            <div className="infoSection">
                <code>{algo} sort - {compCount} comparisons - {delay} ms delay</code>
            </div>
            <div className="barSection">
                {generateBars()}
            </div>
        </div>
    )

}

export default Visualizer