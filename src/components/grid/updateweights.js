import React from 'react';
import { useEffect } from 'react';

// called if algorithm is unweighted
function UpdateWeight(props) {
    useEffect(() => {
        for (let i = 0; i < props.nodes.length; i++) {
            if (props.nodes[i].className === "weight") {
                props.UpdateNode(i, "unvisited", "rgba(17, 34, 64, 1)");
            }
        }
    });
    
    return(
        <React.Fragment />
    )
}

export default UpdateWeight;