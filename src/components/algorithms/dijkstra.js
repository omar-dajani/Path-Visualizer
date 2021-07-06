import React, { useEffect } from 'react';
import { useState, useRef } from 'react';

import Animation from '../animations/animation';

function Dijkstra(props) {
    const visitedOrder = useRef([]);
    const path = useRef([]);
    const pathCost = useRef(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!done) {
            let nodes = props.nodes;
            const startIndex = props.startIndex;
            const targetIndex = props.targetIndex;

            let value = [];
            let parent = [];
            let processed = [];
            let found = false;
            
            for (let i = 0; i < nodes.length; i++) {
                parent[i] = -1;
                value[i] = Infinity;
                processed[i] = false;
            }

            value[startIndex] = 0;
            let minValue = Infinity;
            let minIndex = 0;

            for (let i = 0; i < nodes.length; i++) {
                if (!found) {
                    minValue = Infinity;
                    minIndex = 0;
                    for (let j = 0; j < value.length; j++) {
                        if (value[j] < minValue && processed[j] === false) {
                            minIndex = j;
                            minValue = value[j];
                        }
                    }

                    processed[minIndex] = true;
                    visitedOrder.current[i] = minIndex;

                    // finding neighbors
                    let currentNodeIdCoordinates = nodes[minIndex].id.split('-');
                    let currentRow = parseInt(currentNodeIdCoordinates[0], 10);
                    let currentCol = parseInt(currentNodeIdCoordinates[1], 10);
                    let neighborId = [
                        [currentRow + 1, currentCol],
                        [currentRow - 1, currentCol],
                        [currentRow, currentCol + 1],
                        [currentRow, currentCol - 1]
                    ];

                    // validate neighbors and choose shortest
                    for (let k = 0; k < 4; k++) {
                        if (neighborId[k][0] >= 0 && neighborId[k][0] < 26 && neighborId[k][1] >= 0 && neighborId[k][1] < 50 && `${neighborId[k][0]}-${neighborId[k][1]}` !== nodes[minIndex].id) {
                            let adjacentNodeIndex = props.CalculateIndex(neighborId[k][0], neighborId[k][1]);
                            let weight = 0;
                            if (props.algorithm === "BFS") {
                                weight = 1;
                            } else {
                                weight = nodes[adjacentNodeIndex].className === "weight" ? 15 : 1;
                            }
                            if (adjacentNodeIndex !== startIndex && processed[adjacentNodeIndex] === false && nodes[adjacentNodeIndex].className !== "wall") {
                                if (weight + value[minIndex] < value[adjacentNodeIndex]) {
                                    parent[adjacentNodeIndex] = minIndex;
                                    value[adjacentNodeIndex] = weight + value[minIndex];
                                }
                                if (adjacentNodeIndex === targetIndex) {
                                    found = true;
                                }
                            }
                        }
                    }
                } else {
                    let i = targetIndex;
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
                    break;
                }
            }
            if (!found) {
                alert("No path exists");
                visitedOrder.current=[];
                path.current=[];
            }
        }
    })


    return (
        <div>
            { done && <Animation pathCost={pathCost.current} Nodes={props.nodes} StartIndex={props.startIndex} TargetIndex={props.targetIndex} path={path.current} VisitedOrder={visitedOrder.current} UpdateNode={props.UpdateNode} speed={props.speed}></Animation> }
        </div>
    );
}

export default Dijkstra;
