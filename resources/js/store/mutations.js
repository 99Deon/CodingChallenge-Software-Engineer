import getters from "./getters";

let mutations = {

    /************** ACTIONS ************* */
    async SET_EXPECTED_STATUS(state, { status, result, related }) {
        //Get the index of exsiting mExpected status.
        let index = await state.expected.indexOf(
            state.expected.find(expected => expected.related == related)
        );
        //Delete it.
        if (~index) state.expected.splice(index, 1);

        //Push it to the mExpected.
        return state.expected.push({ status, result, related });
    },
    //*
    DELETE_EXPECTED_STATUS(state, related) {
        state.expected.splice(
            state.expected.indexOf(
                state.expected.find(expected => expected.related == related)
            ),
            1
        );
    },
    CLEAR_EXPECTED(state) {
        state.expected = [];
    },
    // Categories
    FETCH_CATEGORIES(state, categories) {
        return (state.categories = categories);
    },
    // Products
    FETCH_PRODUCTS(state, products) {
        return (state.products = products)
    },
    FETCH_ADD_PRODUCT(state, products) {
        state.products.push(products);
    }

};
export default mutations;
