import { ReactNode } from "react";


interface HintProps{
    children:ReactNode,
    description:string,
    side?: 'left' | 'right' | 'top' | 'bottom'
    sideOffset?:number
}

import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const Hint = ({children,description,side='bottom',sideOffset=0}:HintProps) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={0}>
            <TooltipTrigger>
                {children}
            </TooltipTrigger>
            <TooltipContent
            sideOffset={sideOffset}
            side={side}
            className=" text-xs max-w-[220px] break-words"
            >
                {description}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default Hint