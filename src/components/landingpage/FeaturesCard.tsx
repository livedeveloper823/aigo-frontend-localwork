import React from "react";

interface FeaturesCardType {
    icon: any,
    title: string,
    text: string,
}

const FeaturesCard: React.FC<FeaturesCardType> = ({ icon: Icon, title, text }) => {
    return (
        <div className="flex justify-center gap-9 flex-col items-center text-center lg:w-[375px]">
            <div className="p-3 border-2 border-[#333741] rounded-xl">{<Icon />}</div>
            <div>
                <p className="text-white md:text-xl text-md font-semibold">{title}</p>
                <p className="text-[#94969C] md:text-sm text-xs">{text}</p>
            </div>
        </div>
    )
}

export default FeaturesCard;