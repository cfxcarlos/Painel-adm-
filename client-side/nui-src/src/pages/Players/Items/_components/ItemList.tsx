import { ItemCell } from "./ItemCell";
import { useFilter } from "../_stores/useFilter";
import { useItems } from "../_stores/useItems";

export const ItemList = () => {
  const items = useItems();
  const filter = useFilter();
  const renderedItems = items.list.filter((e) =>
    e.name.toLowerCase().startsWith(filter.value.toLowerCase())
  );
  return (
    <div className="w-full h-full bg-white/2 rounded-[5px] py-[25px] pl-[25px] pr-[14px]">
      <ul className="grid w-full h-full grid-cols-5 overflow-y-scroll scroll-visible gap-[25px] pr-[8px]">
        {renderedItems.map((item, index) => (
          <ItemCell item={item} key={index} />
        ))}
      </ul>
    </div>
  );
};
