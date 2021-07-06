import React from 'react';
import ReactDom from 'react-dom';
import { useState, forwardRef, useImperativeHandle, useRef } from 'react';

import start from '../../images/rocket.png'
import target from '../../images/target.png'
import weight from '../../images/weight.png'

import NormalButton from '../ui/button/button';

import './modal.css';

const Modal = forwardRef((props, ref) => {
  const [helper, setHelper] = useState(false);
  const slideCounter = useRef(1);
  const [isOpen, setIsOpen] = useState(true);

  let slideOne = <div className="modalwindow">
    <h1>Welcome!</h1>
    <h4>Path Visualizer</h4>
    <p>This short tutorial will walk you through everything about this application. Feel free to skip this tutorial by pressing "close".</p>
    <NormalButton type={1} text={"Close"} action={
      () => {
        slideCounter.current = 1; setIsOpen(false);
      }} />
    <NormalButton type={1} text={"Next"} action={
      () => {
        slideCounter.current++; setHelper(!helper);
      }} />
  </div>

  let slideTwo = <div className="modalwindow">
    <h4>Pathfinding Algorithms</h4>
    <p>A pathfinding algorithm looks for the shortest route between two points and is a more practical variant of solving mazes. This application consists of algorithms which have been modified to fit a 2D grid. The cost of visiting another node (cell) is "1" unless a weight node is present. The cost of a weight node is 15.</p>
    <NormalButton type={1} text={"Previous"} action={
      () => {
        slideCounter.current--; setHelper(!helper);
      }} />
    <NormalButton type={1} text={"Close"} action={
      () => {
        slideCounter.current = 1; setIsOpen(false);
      }} />
    <NormalButton type={1} text={"Next"} action={
      () => {
        slideCounter.current++; setHelper(!helper);
      }} />
  </div>

  let slideThree = <div className="modalwindow">
    <h4>Meet the Algorithms!</h4>
    <ul className="list-group list-group-flush">
      <li className="list-group-item"><u>Dijkstra:</u> a great, weighted algorithm for pathfinding. Always guarantees the shortest path!</li>
      <li className="list-group-item"><u>Depth First Search (DFS):</u> a bad, unweighted algorithm for pathfinding. Does not guarantee the shortest path!</li>
      <li className="list-group-item"><u>Breadth First Search (BFS):</u> a good, unweighted algorithm for pathfinding. Always guarantees the shortest path! Similar to Dijkstra's algorithm except it is unweighted.</li>
      <li className="list-group-item"><u>A*:</u> The best, weighted algorithm for pathfinding. Always guarantees the shortest path! Utilizes manhattan distance for heuristics which makes it much faster than Dijkstra's algorithm. </li>
    </ul>
    <NormalButton type={1} text={"Previous"} action={
      () => {
        slideCounter.current--; setHelper(!helper);
      }} />
    <NormalButton type={1} text={"Close"} action={
      () => {
        slideCounter.current = 1; setIsOpen(false);
      }} />
    <NormalButton type={1} text={"Next"} action={
      () => {
        slideCounter.current++; setHelper(!helper);
      }} />
  </div>

  let slideFour = <div className="modalwindow">
    <h4>Commands</h4>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">Select a cell and press <b>"s"</b> to change the starting point <img alt="start" src={start} width="20px" height="20px"></img></li>
      <li className="list-group-item">Select a cell and press <b>"t"</b> to change the target point <img alt="target" src={target} width="20px" height="20px"></img></li>
      <li className="list-group-item">Select a cell and press <b>"z"</b> to add a weight node <img alt="weight" src={weight} width="20px" height="20px"></img></li>
      <li className="list-group-item">Select a cell and press <b>"w"</b> to add a wall</li>
    </ul>
    <NormalButton type={1} text={"Previous"} action={
      () => {
        slideCounter.current--; setHelper(!helper);
      }} />
    <NormalButton type={1} text={"Close"} action={
      () => {
        slideCounter.current = 1; setIsOpen(false);
      }} />
    <NormalButton type={1} text={"Next"} action={
      () => {
        slideCounter.current++; setHelper(!helper);
      }} />
  </div>

  let slideFive = <div className="modalwindow">
    <h4>Path Cost</h4>
    <p>You can check out the path cost after running the algorithm on the top right!</p>
    <NormalButton type={1} text={"Previous"} action={
      () => {
        slideCounter.current--; setHelper(!helper);
      }} />
    <NormalButton type={1} text={"Close"} action={
      () => {
        slideCounter.current = 1; setIsOpen(false);
      }} />
    <NormalButton type={1} text={"Next"} action={
      () => {
        slideCounter.current++; setHelper(!helper);
      }} />
  </div>

  let slideSix = <div className="modalwindow">
    <h4>Thank you!</h4>
    <p>Thank you for taking the time to have a look at my project! Feel free to checkout the source code of the project <a href="http://github.com" id="git-link">here</a></p>
    <NormalButton type={1} text={"Previous"} action={
      () => {
        slideCounter.current--; setHelper(!helper);
      }} />
    <NormalButton type={1} text={"Close"} action={
      () => {
        slideCounter.current = 1; setIsOpen(false);
      }} />
  </div>

  useImperativeHandle(ref, () => ({
    isOpen(isOpen) {
      setIsOpen(isOpen);
    }
  }));

  if (!isOpen) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="modalbackwindow" />
      {
        ReactDom.createPortal(
          (slideCounter.current === 1 && slideOne) ||
          (slideCounter.current === 2 && slideTwo) ||
          (slideCounter.current === 3 && slideThree) ||
          (slideCounter.current === 4 && slideFour) ||
          (slideCounter.current === 5 && slideFive) ||
          (slideCounter.current === 6 && slideSix),
          document.getElementById("portal")
        )
      }
    </React.Fragment>
  )
})

export default Modal;
