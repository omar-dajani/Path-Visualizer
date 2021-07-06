import React from 'react';
import { useEffect } from 'react';

function Animation(props) {
    useEffect(() => {
        const DrawVisited = () => {
            return new Promise((resolve, reject) => {
                for (let i = 0; i < props.VisitedOrder.length; i++) {
                    setTimeout(() => {
                        if (i === props.VisitedOrder.length - 1) {
                            props.UpdateNode(props.VisitedOrder[i], props.Nodes[props.VisitedOrder[i]].className = "weight" ? "visited-weight" : "visited", "rgba(100, 255, 218, 0.4)");
                            resolve();
                        } else {
                            props.UpdateNode(props.VisitedOrder[i], props.Nodes[props.VisitedOrder[i]].className = "weight" ? "visited-weight" : "visited", "rgba(100, 255, 218, 0.4)");
                        }
                    }, i * props.speed[0]);
                }
            })
        }

        DrawVisited()
            .then(() => {
                props.UpdateNode(props.TargetIndex, "visited-weight", "rgba(100, 255, 218, 0.4)");
                document.getElementById("path-cost").innerHTML = props.pathCost;
                for (let i = 0; i < props.path.length; i++) {
                    ((index) => {
                        setTimeout(function () { props.UpdateNode(props.path[i], "path", "rgba(255, 255, 106, 0.7)"); }, i * props.speed[1]);
                    })(i);
                }
            })
            .catch(() => {
                alert("No path!");
            })
    })

    return (
        <React.Fragment />
    );
}

export default Animation;
