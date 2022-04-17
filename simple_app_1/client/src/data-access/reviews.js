import baseProvider from "./baseProvider";
import api from "@src/utils/api";

export default {
    ...baseProvider({url: api.reviews})
}