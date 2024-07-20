import { useTranslations } from "next-intl";
import React from "react";

interface FeatureTabsProps {
    title: string;
    text: string;
}

const FeaturedTabs: React.FC<FeatureTabsProps> = ({ title, text }) => {
    const t = useTranslations('')
    return (
        <div className="text-center lg:w-[410px] px-5 py-10 hover:border-t-4 border-t-4 border-[#0C111D] hover:border-[#078DEE]">
            <p className="text-white text-xl font-semibold">{title}</p>
            <p className="text-[#94969C] lg:text-sm text-xs">{text}</p>
        </div>
    )
};

export default FeaturedTabs;