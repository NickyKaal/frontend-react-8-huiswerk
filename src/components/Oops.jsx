import React from 'react';
import './Oops.css';
import {SmileyXEyes} from "@phosphor-icons/react";

function Oops({msg}) {
    return (
        <div className="oops">
            <p>{msg}</p>
            <SmileyXEyes size={128} />
        </div>
    );
}

export default Oops;