import React from 'react';
import { Button } from 'react-bootstrap';
import './button.css'

function NormalButton(props) {
    /*
        type key:
            (1) = instruction panel
            (2) = navigation panel
    */
    return (
        <React.Fragment>
            {
                (props.type === 1 && <Button id="button-1" onClick={props.action}>
                    {props.text}
                </Button>) ||
                (props.type === 2 && <Button id="button-2" disabled={props.disabled} onClick={props.action}>
                    <span className="green-text">
                        {props.number}&nbsp;
                    </span>
                    {props.text}
                </Button>)
            }
        </React.Fragment>
    );
}

export default NormalButton;