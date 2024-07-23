import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import { CheckItem, RadioItem, FilterItem } from "@/types";
import { FilterItems } from "@/content/FilterItems";

interface FilterSidebarProps {
  checkedItems: CheckItem[];
  setCheckedItems: React.Dispatch<React.SetStateAction<CheckItem[]>>;
  radioItem: RadioItem;
  setRadioItem: React.Dispatch<React.SetStateAction<RadioItem>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  checkedItems,
  setCheckedItems,
  radioItem,
  setRadioItem,
}) => {
  const handleCheck = (item: CheckItem) => {
    if (checkedItems.some((i) => i.content === item.content)) {
      console.log("remove: ", item.content);
      setCheckedItems(checkedItems.filter((i) => i.content !== item.content));
    } else {
      console.log("adding: ", item.content);
      setCheckedItems([...checkedItems, item]);
    }
  };

  const handleRadio = (
    value: string | undefined,
    catagory: keyof RadioItem
  ) => {
    setRadioItem({
      ...radioItem,
      [catagory]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
    localStorage.setItem("radioItem", JSON.stringify(radioItem));
  }, [checkedItems, radioItem]);

  return (
    <div className="flex flex-col gap-6 p-5 w-72 text-white">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Price Change</p>
        {FilterItems.CheckFilter.map((item, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <Checkbox
              id={`check${index}`}
              name={item.content}
              checked={checkedItems.some((i) => i.content === item.content)}
              onClick={() => handleCheck(item)}
            />
            <label htmlFor={`check${index}`}>{item.content}</label>
          </div>
        ))}
      </div>

      {Object.entries(FilterItems.RadioFilter).map(([key, items]) => (
        <div key={key}>
          <p className="font-semibold">{items[0].title}</p>
          <RadioGroup>
            {items.slice(1).map((item, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem
                  value={item.value || ""}
                  id={`${key}${index}`}
                  checked={radioItem[key as keyof RadioItem] === item.value}
                  onClick={() =>
                    handleRadio(item.value, key as keyof RadioItem)
                  }
                />
                <label htmlFor={`${key}${index}`}>{item.content}</label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
