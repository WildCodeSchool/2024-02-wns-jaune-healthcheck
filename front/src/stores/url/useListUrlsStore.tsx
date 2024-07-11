import { create } from "zustand";

type FilterUrlsQueryStore = {
    queryFilter: string;
    setQueryFilter: (searchText: string) => void;
};

const useListUrlsStore = create<FilterUrlsQueryStore>((set) => ({
    queryFilter: "",
    setQueryFilter: (searchText) => set(() => ({ queryFilter: searchText })),
}));

export default useListUrlsStore;
