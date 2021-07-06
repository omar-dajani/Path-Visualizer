import React, { useEffect } from 'react';
import { useState, useRef } from 'react';

import Animation from '../animations/animation';

function DFS(props) {
    const path = useRef([]);
    const visitedOrder = useRef([]);
    const pathCost = useRef(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        let found = false;
        if (!done) {
            let parent = [];
            let nodes = props.nodes;
            let visited = [];
            
            for (let i = 0; i < nodes.length; i++) {
                visited[i] = false;
                parent[i] = -1;
            }

            let stack = [];
            stack.push(props.startIndex);
            let temp = 0;
            while (stack.length > 0) {
                temp = stack.pop();
                if (temp === props.targetIndex) {
                    found = true; break;
                }
                if (visited[temp] === false) {
                    visitedOrder.current.push(temp);
                    visited[temp] = true;

                    // finding neighbors
                    let currentNodeIdCoordinates = nodes[temp].id.split('-');
                    let currentRow = parseInt(currentNodeIdCoordinates[0], 10);
                    let currentCol = parseInt(currentNodeIdCoordinates[1], 10);
                    let neighborId = [
                        [currentRow, currentCol - 1], // (4) left
                        [currentRow + 1, currentCol], // (3) down
                        [currentRow, currentCol + 1], // (2) right
                        [currentRow - 1, currentCol], // (1) up
                    ];

                    // validate neighbors and not choosing shortest
                    for (let k = 0; k < 4; k++) {
                        if (neighborId[k][0] >= 0 && neighborId[k][0] < 26 && neighborId[k][1] >= 0 && neighborId[k][1] < 50 && `${neighborId[k][0]}-${neighborId[k][1]}` !== nodes[temp].id) {
                            let adjacentNodeIndex = props.CalculateIndex(neighborId[k][0], neighborId[k][1]);
                            if (adjacentNodeIndex !== props.startIndex && visited[adjacentNodeIndex] === false && nodes[adjacentNodeIndex].className !== "wall") {
                                parent[adjacentNodeIndex] = temp;
                                stack.push(adjacentNodeIndex);
                            }
                        }
                    }
                }
            }
            if (!found) {
                alert("No path exists");
                visitedOrder.current=[];
            } else {
                visitedOrder.current.push(props.targetIndex);
                let i = props.targetIndex;
                while (i !== -1) {
                    if (nodes[i].className === "weight") {
                        pathCost.current = pathCost.current + 15;
                    } else {
                        pathCost.current = pathCost.current + 1;
                    }
                    path.current.push(i);
                    i = parent[i];
                }
                path.current.reverse();
                setDone(true);
                props.updateCanGoRef(false);
                props.setCanGo(false);
            }
        }
    })

    return (
        <div>
            { done && <Animation pathCost={pathCost.current} Nodes={props.nodes} StartIndex={props.startIndex} TargetIndex={props.targetIndex} path={path.current} VisitedOrder={visitedOrder.current} UpdateNode={props.UpdateNode} speed={props.speed}></Animation> }
        </div>
    );
}

export default DFS;
