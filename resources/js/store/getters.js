import state from "./state";

let getters = {

    /************** expected getter ************* */
    expected: state => related => {
        try {
            return state.expected.find(expected => {
                if (expected.related == related) return expected;
            });
        } catch (error) {
            return undefined;
        }
    },
    categories: state => {
        return state.categories;
    },
    products: state => {
        return state.products;
    }
};
export default getters;
