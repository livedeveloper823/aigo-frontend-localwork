import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type ContentItemType = {
    title: string,
    text: string,
}


export type CoinsItem = {
    icon: React.FC<IconSvgProps>,
    name: string,
}

export type FeaturesCardContentType = {
    icon: React.FC<IconSvgProps>,
    title: string,
    text: string,
}

export type LinkItemType = {
    href: string,
    text: string,
}

export type FilterItemType = {
    text: string,
    value: string,
}

export type PriceAllDropdown = {
    text:string,
    value:string,
}