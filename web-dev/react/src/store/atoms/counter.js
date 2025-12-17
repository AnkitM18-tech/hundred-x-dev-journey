import { atom, selector } from "recoil";

// can be stored in a separate folder like store/atoms
export const counterAtom = atom({
  key: "counter",
  default: 0,
});

export const evenSelector = selector({
  key: "isEven",
  get: ({ get }) => {
    const count = get(counterAtom);
    return count % 2;
  },
});
