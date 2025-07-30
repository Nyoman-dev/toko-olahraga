import { Home } from "@/lib/types";

type Action =
    | { type: "LOAD_FROM_STORAGE"; payload: Home[] }
    | { type: "REMOVE_ITEM"; payload: number };

function cartReducer(state: Home[], action: Action): Home[] {
    switch (action.type) {
        case "LOAD_FROM_STORAGE":
            return action.payload;
        case "REMOVE_ITEM":
            return state.filter((item) => item.id_produk !== action.payload);
        default:
            return state;
    }
}
