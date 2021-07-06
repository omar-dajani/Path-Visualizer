import React, { useEffect } from 'react';
import { useState, useRef } from 'react';

import Animation from '../animations/animation';

function AStar(props) {
    const visitedOrder = useRef([]);
    const path = useRef([]);
    const pathCost = useRef(0);
    const [done, setDone] = useState(false);

    const CalculateDistance = (row1, col1, row2, col2) => {
        let row = Math.abs(row1 - row2);
        let col = Math.abs(col1 - col2);

        return (row + col);
    }

    useEffect(() => {
        if (!done) {
            let found = false;
            let nodes = props.nodes;
            let startIndex = props.startIndex;
            let targetIndex = props.targetIndex;

            let startIdCoordinates = nodes[startIndex].id.split('-');
            let startRow = parseInt(startIdCoordinates[0], 10);
            let startCol = parseInt(startIdCoordinates[1], 10);

            let targetIdCoordinates = nodes[targetIndex].id.split('-');
            let targetRow = parseInt(targetIdCoordinates[0], 10);
            let targetCol = parseInt(targetIdCoordinates[1], 10);

            let openedList = [];
            let closedList = [];

            let parent = []; parent[startIndex] = -1;

            let minIndex = 0;
            let minValue = Infinity;

            openedList.push(startIndex);
            nodes[startIndex].f = CalculateDistance(startRow, startCol, targetRow, targetCol);

            while (openedList.length > 0 && !found) {
                minValue = Infinity;
                for (let j = 0; j < openedList.length; j++) {
                    if (nodes[openedList[j]].f < minValue) {
                        minValue = nodes[openedList[j]].f;
                        minIndex = openedList[j];
                    } else if (nodes[openedList[j]].f === minValue) {
                        if (nodes[openedList[j]].h < nodes[minIndex].h) {
                            minValue = nodes[openedList[j]].f;
                            minIndex = openedList[j];
                        }
                    }
                }

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

                // validating neighbors and choosing shortest based on manhattan distance
                for (let k = 0; k < 4; k++) {
                    if (neighborId[k][0] >= 0 && neighborId[k][0] < 26 && neighborId[k][1] >= 0 && neighborId[k][1] < 50 && `${neighborId[k][0]}-${neighborId[k][1]}` !== nodes[minIndex].id) {
                        let adjacentNodeIndex = props.CalculateIndex(neighborId[k][0], neighborId[k][1]);
                        let weight = nodes[adjacentNodeIndex].className === "weight" ? 15 : 1;
                        if (adjacentNodeIndex !== startIndex && nodes[adjacentNodeIndex].className !== "wall" && !closedList.includes(adjacentNodeIndex) && !openedList.includes(adjacentNodeIndex)) {
                            nodes[adjacentNodeIndex].g = weight + nodes[minIndex].g;
                            nodes[adjacentNodeIndex].h = CalculateDistance(neighborId[k][0], neighborId[k][1], targetRow, targetCol);
                            nodes[adjacentNodeIndex].f = nodes[adjacentNodeIndex].g + nodes[adjacentNodeIndex].h;
                            openedList.push(adjacentNodeIndex);
                            parent[adjacentNodeIndex] = minIndex;
                        }
                    }
                }
                closedList.push(minIndex);
                let index = openedList.indexOf(minIndex);
                openedList.splice(index, 1);
                if (minIndex === targetIndex) {
                    found = true;
                }
            }

            if (found) {
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
                console.log(closedList)
                visitedOrder.current = closedList;
                setDone(true);
            } else {
                alert("No path exists");
            }
        }
    })


    return (
        <div>
            { done && <Animation pathCost={pathCost.current} Nodes={props.nodes} StartIndex={props.startIndex} TargetIndex={props.targetIndex} path={path.current} VisitedOrder={visitedOrder.current} UpdateNode={props.UpdateNode} speed={props.speed} />}
        </div>
    );
}

export default AStar;

