import React from 'react';
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