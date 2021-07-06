import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

import './grid.css'
import start from '../../images/rocket.png'
import target from '../../images/target.png'
import weight from '../../images/weight.png'

import Dijkstra from '../algorithms/dijkstra';
import DFS from '../algorithms/dfs';
import AStar from '../algorithms/astar';
import UpdateWeight from './updateweights'

const Node = require('../node.js');

const MAX_ROWS = 26; // 26
const MAX_COLS = 50; // 50

const CalculateIndex = (row, col) => {
    return (row === 0 ? col : 50 * row + col);
}

function Grid(props) {
    const firstTimeRender = useRef(false);
    const secondTimeRender = useRef(false);

    const grid = useRef([]);
    const nodes = useRef([]);
    const [helper, setHelper] = useState(false);

    const startIndex = useRef(0);
    const targetIndex = useRef(MAX_ROWS * MAX_COLS - 1);

    const GetSpeed = () => {
        if (props.speed === "Fast") {
            return [3, 10];
        } else if (props.speed === "Normal") {
            return [30, 100];
        } else {
            return [100, 200];
        }
    }

    // updates both node and node DOM
    const UpdateNode = (index, className, color) => {
        nodes.current[index].className = className;
        nodes.current[index].element.className = className;
        if (className === "reset-start-target") {
            nodes.current[startIndex.current].element.style.backgroundColor = "none";
            nodes.current[targetIndex.current].element.style.backgroundColor = "none";
        } else if (className === "visited-weight") {
            nodes.current[index].element.style.backgroundColor = color;
        } else {
            if (className !== "start" && className !== "target" && className !== "path" && className !== "weight") {
                nodes.current[index].element.style.backgroundColor = color;
                nodes.current[index].element.style.backgroundImage = "none";
            }
            else if (className === "path") {
                nodes.current[index].element.style.backgroundColor = color;
            } else if (className === "start") {
                nodes.current[index].element.style.backgroundImage = `url(${start})`;
            } else if (className === "target") {
                nodes.current[index].element.style.backgroundImage = `url(${target})`;
            } else if (className === "weight") {
                nodes.current[index].element.style.backgroundImage = `url(${weight})`;
            }
        }
    }

    // only called once on initial render
    const Initialize = () => {
        let tempRow = [];
        let tempGrid = [];
        let tempNodes = [];

        let tempNode = null;
        let tempId = "";
        let indexCount = 0;

        let row = 0;
        let col = 0;

        for (row = 0; row < MAX_ROWS; row++) {
            tempRow = [];
            for (col = 0; col < MAX_COLS; col++) {
                tempId = `${row}-${col}`;

                // creating node
                tempNode = new Node(
                    tempId,
                    "unvisited",
                    indexCount
                );
                indexCount++;
                tempNodes.push(tempNode);

                // creating DOM node
                tempRow.push(
                    <td key={tempId} index={indexCount - 1} id={tempId} className={"unvisited"} tabIndex={-1} onKeyDown={(e) => {
                        if (e.target.className !== "start" && e.target.className !== "target" && props.canGoRef && props.canGoRef.current) {
                            if (e.key === "s" && e.target.className !== "wall") {
                                UpdateNode(parseInt(startIndex.current, 10), "unvisited", "rgba(17, 34, 64, 1)");
                                UpdateNode(parseInt(e.target.getAttribute("index"), 10), "start", "green");
                                startIndex.current = parseInt(e.target.getAttribute("index"), 10);
                            } else if (e.key === "t" && e.target.className !== "wall") {
                                UpdateNode(parseInt(targetIndex.current, 10), "unvisited", "rgba(17, 34, 64, 1)");
                                UpdateNode(parseInt(e.target.getAttribute("index"), 10), "target", "red");
                                targetIndex.current = parseInt(e.target.getAttribute("index"), 10);
                            } else if (e.key === "w") {
                                if (e.target.className === "unvisited") {
                                    UpdateNode(parseInt(e.target.getAttribute("index"), 10), "wall", "rgb(191, 64, 191, 0.4)");
                                } else {
                                    UpdateNode(parseInt(e.target.getAttribute("index"), 10), "unvisited", "rgba(17, 34, 64, 1)");
                                }
                            } else if (e.key === "z" && (document.getElementById("algorithm-label").innerHTML !== "Algorithm" && document.getElementById("algorithm-label").innerHTML !== "DFS" && document.getElementById("algorithm-label").innerHTML !== "BFS")) {
                                if (e.target.className === "unvisited") {
                                    UpdateNode(parseInt(e.target.getAttribute("index"), 10), "weight", "black");
                                } else {
                                    UpdateNode(parseInt(e.target.getAttribute("index"), 10), "unvisited", "rgba(17, 34, 64, 1)");
                                }
                            }
                        }
                    }}></td>
                );
            }
            tempGrid.push(tempRow);
        }

        firstTimeRender.current = true;
        grid.current = tempGrid;
        nodes.current = tempNodes;
        setHelper(!helper);
    }

    // only called on second render, used to add node DOM to nodes and add event listeners
    const FinalizeNode = () => {
        let i = 0;
        for (i = 0; i < nodes.current.length; i++) {
            nodes.current[i].element = document.getElementById(nodes.current[i].id);
        }

        UpdateNode(0, "start", "red");
        UpdateNode(MAX_ROWS * MAX_COLS - 1, "target", "red");
        secondTimeRender.current = true;
    }

    // useEffect to initialize grid and nodes
    useEffect(() => {
        if (!firstTimeRender.current) {
            Initialize();
        } else if (firstTimeRender.current && !secondTimeRender.current) {
            FinalizeNode();
            setHelper(!helper);
        } else if (props.state[1]) { // reset grid
            document.getElementById("path-cost").innerHTML = "N/A";
            for (let i = 0; i < nodes.current.length; i++) {
                UpdateNode(i, "unvisited", "rgba(17, 34, 64, 1)");
            }

            UpdateNode(startIndex.current, "start", "green");
            UpdateNode(targetIndex.current, "target", "red");
            props.updateCanGoRef(true);
            props.setCanGo(true);
        } else if (props.state[2]) { // reset path
            document.getElementById("path-cost").innerHTML = "N/A";
            for (let i = 0; i < nodes.current.length; i++) {
                if (nodes.current[i].className !== "wall" && nodes.current[i].className !== "weight") {
                    UpdateNode(i, "unvisited", "rgba(17, 34, 64, 1)");
                }
            }
            UpdateNode(startIndex.current, "start", "green");
            UpdateNode(targetIndex.current, "target", "red");
            props.updateCanGoRef(true);
            props.setCanGo(true);
        }
    });

    return (
        <React.Fragment>
            <Container fluid className="d-flex justify-content-center">
                <Table>
                    <tbody>
                        {
                            firstTimeRender.current && grid.current.map((row, rowIndex) => {
                                return (
                                    <tr key={rowIndex} id={`row-${rowIndex}`}>{row}</tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                {((props.state[0] === "DFS" || props.state[0] === "BFS") && <UpdateWeight nodes={nodes.current} UpdateNode={UpdateNode} />)}
                {
                    (((secondTimeRender.current && props.state[0] === "Dijkstra") || (secondTimeRender.current && props.state[0] === "BFS")) && <Dijkstra speed={GetSpeed()} algorithm={props.state[0]} nodes={nodes.current} startIndex={startIndex.current} targetIndex={targetIndex.current} CalculateIndex={CalculateIndex} UpdateNode={UpdateNode} setCanGo={props.setCanGo} updateCanGoRef={props.updateCanGoRef} />) ||

                    ((secondTimeRender.current && props.state[0] === "A*") && <AStar speed={GetSpeed()} algorithm={props.state[0]} nodes={nodes.current} startIndex={startIndex.current} targetIndex={targetIndex.current} CalculateIndex={CalculateIndex} UpdateNode={UpdateNode} setCanGo={props.setCanGo} updateCanGoRef={props.updateCanGoRef} />) ||

                    ((secondTimeRender.current && props.state[0] === "DFS") && <DFS speed={GetSpeed()} nodes={nodes.current} startIndex={startIndex.current} targetIndex={targetIndex.current} CalculateIndex={CalculateIndex} UpdateNode={UpdateNode} setCanGo={props.setCanGo} updateCanGoRef={props.updateCanGoRef} />)
                }
            </Container>
        </React.Fragment>
    );
}

export default Grid;