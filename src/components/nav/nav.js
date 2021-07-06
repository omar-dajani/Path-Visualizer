import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

import './nav.css'

import Grid from '../grid/grid.js';
import Modal from '../modal/modal.js';

import NormalButton from '../ui/button/button';

function Navigation() {
    const [algoResetState, setAlgoResetState] = useState(["", false, false]); // [algo, reset, clear path]
    const algoReset = useRef(["", false]);
    const [canGo, setCanGo] = useState(true);
    const canGoRef = useRef(canGo);
    const algorithmDropdown = useRef("");
    const speedDropdown = useRef("");

    // modal
    const [isOpen, setIsOpen] = useState(true);
    const modalRef = useRef();

    const firstRender = useRef(false);

    const UpdateCanGoRef = (newValue) => {
        canGoRef.current = newValue;
    }

    useEffect(() => {
        firstRender.current = true;
    }, [])

    return (
        <React.Fragment>
            <Navbar id="nav" expand="lg" style={{ backgroundColor: "rgba(17, 34, 64, 1)" }}>
                <Nav className="mr-auto">
                    <Navbar.Brand id="nav-title"><b>Path Visualizer</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <NormalButton type={2} number={"01."} disabled={!canGo} text={canGoRef.current ? "Go" : "Please reset grid"} action={() => {
                        if (algorithmDropdown.current !== "" && speedDropdown.current !== "") {
                            algoReset.current = [algorithmDropdown.current, false];
                            setAlgoResetState(algoReset.current);
                        } else if (algorithmDropdown.current === "") {
                            alert("Please select an algorithm");
                        } else {
                            alert("Please select a speed");
                        }
                    }} />

                    <NormalButton type={2} number={"02."} disabled={false} text={"Reset Grid"} action={
                        () => {
                            algoReset.current = ["", true, false];
                            setAlgoResetState(algoReset.current);
                        }}
                    />

                    <NormalButton type={2} number={"03."} disabled={false} text={"Clear Path"} action={
                        () => {
                            algoReset.current = ["", false, true];
                            setAlgoResetState(algoReset.current);
                        }}
                    />

                    <Nav.Item className="dropdown">
                        <Dropdown class="dropdown" onSelect={(e) => {
                            algorithmDropdown.current = e;
                            document.getElementById("algorithm-label").innerHTML = e;
                        }}>
                            <Dropdown.Toggle className="nav-dropdown" id="dropdown-basic">
                                <span className="nav-text-green">04. <span id="algorithm-label">Algorithm</span></span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ background: "#0a192f" }}>
                                <Dropdown.Item className="nav-text-green" eventKey="Dijkstra">Dijkstra</Dropdown.Item>
                                <Dropdown.Item className="nav-text-green" eventKey="DFS">DFS</Dropdown.Item>
                                <Dropdown.Item className="nav-text-green" eventKey="BFS">BFS</Dropdown.Item>
                                <Dropdown.Item className="nav-text-green" eventKey="A*">A*</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Item>

                    <Nav.Item className="dropdown">
                        <Dropdown class="dropdown" onSelect={(e) => {
                            document.getElementById("speed-label").innerHTML = e;
                            speedDropdown.current = e;
                        }}>
                            <Dropdown.Toggle className="nav-dropdown" id="dropdown-basic">
                                <span className="nav-text-green"><span className="nav-text-green">05. </span><span id="speed-label">Speed</span></span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ background: "#0a192f" }}>
                                <Dropdown.Item className="nav-text-green" eventKey="Fast">Fast</Dropdown.Item>
                                <Dropdown.Item className="nav-text-green" eventKey="Normal">Normal</Dropdown.Item>
                                <Dropdown.Item className="nav-text-green" eventKey="Slow">Slow</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav.Item>

                    <NormalButton type={2} number={"06."} disabled={false} text={"Instructions"} action={
                        () => {
                            modalRef.current.isOpen(true);
                        }}
                    />

                    <p className="stats" style={{ marginTop: "22px" }}><span style={{ color: "#64ffda" }}>Path Cost: </span><span id="path-cost">N/A</span></p>

                    <Modal ref={modalRef} open={isOpen} closeModal={() => { setIsOpen(false); }} />
                </Nav>
            </Navbar>
            { <Grid speed={speedDropdown.current} state={algoResetState} setAlgoResetState={setAlgoResetState} setCanGo={setCanGo} canGoRef={canGoRef} updateCanGoRef={UpdateCanGoRef} /> }
            <div>
            </div>
            <div className="d-flex flex-column text-center" id="footer">
                <footer className="footer">
                    <a href="http://omardajani.com" id="ne-resize">
                        <div>
                            Designed &#38; Built by Omar Dajani
                        </div>
                        <div className="ml-auto">
                            omardajani.com
                        </div>
                    </a>
                </footer>
            </div>

        </React.Fragment>
    );
}

export default Navigation;