'use client'

import React, { useState } from "react";
import { CircleMinus } from "lucide-react";
interface AccordionInterface {
  title: string;
  text: string;
}

const Accordion = ({ title, text }: AccordionInterface) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="text-start">
      <div
        className="flex justify-between py-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-white lg:text-2xl sm:text-lg text-sm">{title}</p>
        <span className="relative">
          <CircleMinus className="absolute left-[-10px] sm:w-10 w-5 text-description" />
          <CircleMinus
            className={`absolute left-[-10px] sm:w-10 w-5 text-description transition-transform duration-200 ${!isOpen ? "rotate-90" : ""
              }`}
          />
        </span>
      </div>
      <div
        className={`px-4 transition-max-height text-description lg:text-xl sm:text-md text-xs mr-6 duration-200  transition-transform ${isOpen ? "max-h-auto" : "!h-0 overflow-hidden"
          }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Accordion;