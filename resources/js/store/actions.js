import axios from "axios";

let actions = {
    async expected({ commit }, payload) {
        commit("SET_EXPECTED_STATUS", {
            status: payload.status,
            result: payload.result,
            related: payload.related
        });
    },





    //* Fetch one or multiple records
    async fetchData({ dispatch, commit }, payload) {
        //? Init action status.
        dispatch("expected", {
            status: "busy",
            result: [],
            related: payload.related
        });
        //? Communicate with the server.
        // Second request

        axios
            .get(payload.path, {
                headers: {
                    Accept: "application/json",
                },
                params: {
                    data: payload.data
                }
            })
            .then(response => {
                dispatch("expected", {
                    status: "success",
                    result: [],
                    related: payload.related
                });
                // Sometime we don't need to asign incoming data (ex: verification email). so we don't this line
                if (payload.mutation != false)
                    commit(payload.mutation, response.data);
            })
            .catch(err => {
                dispatch("expected", {
                    status: "error",
                    result: err.response.data,
                    related: payload.related
                });

                if (payload.mutation == "FETCH_GUARD")
                    commit(payload.mutation, err.response.data);
            });
    },


    //* This add records or trigger something
    async postData({ dispatch }, payload) {
        //? Init action status.
        dispatch("expected", {
            status: "busy",
            result: [],
            related: payload.related
        });

        return await axios
            .post(payload.path, payload.data, {

                headers: {
                    // Accept: "application/json",
                    "content-type": "multipart/form-data",
                    // 'Content-Type': 'image/*'

                }
            })
            .then(response => {
                dispatch("expected", {
                    status: "success",
                    result: response.data,
                    related: payload.related
                });

                if (payload.returned) return true;
            })
            .catch(err => {
                dispatch("expected", {
                    status: "error",
                    result: err.response.data,
                    related: payload.related
                });
                if (payload.returned) return false;
            });
    },

    //* Delete Data
    async deleteData({ dispatch }, payload) {
        dispatch("expected", {
            status: "busy",
            result: [],
            related: payload.related
        });

        await axios
            .delete(payload.path, {
                headers: {
                    Accept: "application/json",
                },
                data: payload.data
            })
            .then(response => {
                dispatch("expected", {
                    status: "success",
                    result: response.data,
                    related: payload.related
                });
            })
            .catch(err => {
                dispatch("expected", {
                    status: "error",
                    result: err.response.data,
                    related: payload.related
                });
            });
    },


    async uploadFile({ dispatch }, payload) {
        //TODO 1 : Set the status progress, until axios finish
        //? Init action status.
        dispatch("expected", {
            status: "busy",
            result: [],
            related: payload.related
        });

        //TODO 2 : Get Data from server.
        return await axios
            .post(payload.path, payload.data, {
                headers: {
                    // Accept: "application/json",
                    "content-type": "multipart/form-data",
                }
            })
            .then(response => {
                dispatch("expected", {
                    status: "success",
                    result: response.data,
                    related: payload.related
                });
                //Used in modal
                if (payload.returned) return true;
            })
            .catch(err => {
                dispatch("expected", {
                    status: "error",
                    result: err.response.data,
                    related: payload.related
                });
                //Used in modal
                if (payload.returned) return false;
            });
    }
    //End of file
};

export default actions;
