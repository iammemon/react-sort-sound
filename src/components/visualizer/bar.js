import React from 'react';

function Bar({
    color = "white",
    height,
    is_comparing = false,
    is_boundary = false,
    is_pivot = false,
    is_sorted = false
}) {

    const finalcolor = is_sorted && "green" ||
        is_boundary && 'lawngreen' ||
        is_comparing && "red" ||
        is_pivot && 'cyan' ||
        color

    const style = {
        flex:'1',
        alignSelf:'flex-end',
        height:`${height}%`,
        backgroundColor: finalcolor
    }

    return (
        <span style={style}></span>
    )
}

export default Bar;