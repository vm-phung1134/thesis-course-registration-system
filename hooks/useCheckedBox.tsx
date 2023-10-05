import { useState } from "react";

interface Item {
  id: string;
}

interface UseCheckedItemsResult<T> {
  checkedItems: T[];
  handleCheckAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckItem: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: T
  ) => void;
}

const useCheckedBox = <T extends Item>(
  initialItems: T[] = []
): UseCheckedItemsResult<T> => {
  const [checkedItems, setCheckedItems] = useState<T[]>([]);

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedItems(initialItems);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: T
  ) => {
    if (event.target.checked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem.id !== item.id)
      );
    }
  };

  return {
    checkedItems,
    handleCheckAll,
    handleCheckItem,
  };
};

export default useCheckedBox;