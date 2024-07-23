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

export type CheckItem = {
  content?: string;
  limit?: {
    min?: number;
    max?: number;
  };
}

export type SubRadioItem = {
  title?: string;
  content?: string;
  value?: string;
}

export type RadioItem = {
  MarketCap: string;
  InTheMoney: string;
  LargeTxs: string;
  DailyActive: string;
  Ownership: string;
  Hodlers: string;
  Twitter: string;
  Exchanges: string;
  Signals: string;
}

export type FilterItem = {
  CheckFilter: CheckItem[];
  RadioFilter: {
    MarketCap: SubRadioItem[];
    InTheMoney: SubRadioItem[];
    LargeTxs: SubRadioItem[];
    DailyActive: SubRadioItem[];
    Ownership: SubRadioItem[];
    Hodlers: SubRadioItem[];
    Twitter: SubRadioItem[];
    Exchanges: SubRadioItem[];
    Signals: SubRadioItem[];
  };
}