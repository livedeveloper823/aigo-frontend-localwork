import { siteContents } from "@/config/contents";
import { ContentItemType } from "@/types";
import Accordion from "../accordion";

export function FAQs() {
  return (
    <div className="flex justify-center mt-16">
      <div className="flex flex-col justify-center w-[1000px]">
        {siteContents.faqs.map((item: ContentItemType, index: number) => <Accordion key={index} title={item.title} text={item.text} />)}
      </div>
    </div>
  )
}
