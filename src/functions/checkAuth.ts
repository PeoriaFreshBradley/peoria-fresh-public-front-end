import { useAppDispatch, useAppSelector } from "state/hooks";
import { store } from "../state/store";
import { saveState } from "localStorage";
import { instance as axios } from 'axios-instance';
import APIURL from "APIURL";
import { setAuth } from "state/slices/user-slice";

export const useRedirectAfterExpiry = () => {

    const dispatch = useAppDispatch();

    const signOutAndRedirect = () =>{
        localStorage.clear();
        dispatch(
            setAuth({ authToken: "", gardenAuthorized: false, foodBankAuthorized: false, userObj: {id: null, email: "" } })
        );
        localStorage.setItem('expiry', '0');
        window.location.href = '/sign-in';
    }

    let tmp = localStorage.getItem('expiry');
    if (tmp !== null && tmp !== undefined) {
        let time = parseInt(tmp);
        let now = new Date().getTime();

        if (time === 0){ return; }

        if (time < now) {
            signOutAndRedirect(); 
        }
        else {
            setTimeout(() => {
                signOutAndRedirect();
            }, (time-now));
        }
    }
}