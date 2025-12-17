import { atom, selector } from "recoil";

export const networkAtom = atom({
  key: "network",
  default: 104,
});
export const jobAtom = atom({
  key: "job",
  default: 0,
});
export const notificationAtom = atom({
  key: "notification",
  default: 75,
});
export const messageAtom = atom({
  key: "message",
  default: 12,
});

export const profileSelector = selector({
  key: "profile",
  get: ({ get }) => {
    const totalCount =
      get(networkAtom) +
      get(jobAtom) +
      get(notificationAtom) +
      get(messageAtom);
    return totalCount;
  },
});
