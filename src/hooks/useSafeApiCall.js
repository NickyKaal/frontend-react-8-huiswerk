import {useEffect} from "react";

export default function useSafeApiCall(apiCall, dependencies = []) {

    useEffect(()=>{
        const controller = new AbortController();

        apiCall(controller);

        return function cleanup() {
            controller.abort();
        }
    },dependencies);
}