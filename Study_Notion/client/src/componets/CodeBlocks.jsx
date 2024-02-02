import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function CodeBlocks({codeblock}) {
  return (
    <div>
        <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                    overflowX:"hidden",
                    fontSize:"16px",
                }
            }
            omitDeletionAnimation={true}
           />

    </div>
  )
}
