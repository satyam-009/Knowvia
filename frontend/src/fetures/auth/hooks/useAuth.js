
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../auth.slice.js"
import { register, login, getMe } from "../services/Auth.api";

export function useAuth() {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(
        (state) => state.auth
    );

    const registerUser = async (username, email, password) => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await register(username, email, password);
            return data;
        } catch (err) {
            const message =
                err.response?.data?.message || "Registration failed";

            dispatch(setError(message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const loginUser = async (email, password) => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const data = await login(email, password);
            dispatch(setUser(data.user ?? data));
            return data;
        } catch (err) {
            const message =
                err.response?.data?.message || "Login failed";
            dispatch(setError(message));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    
const fetchCurrentUser = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
        const data = await getMe();
        dispatch(setUser(data.user ?? data));
        return data;
    } catch (err) {
        const status = err.response?.status;

        if (status === 401 || status === 403) {
            dispatch(setUser(null));
        }

        dispatch(
            setError(
                err.response?.data?.message ||
                "Could not fetch user"
            )
        );

        return null;
    } finally {
        dispatch(setLoading(false));
    }
};


    const logoutUser = async () => {
        dispatch(setError(null));

        try {
            await logout();
        } finally {
            dispatch(setUser(null));
        }
    };

    return {
        user,
        loading,
        error,
        registerUser,
        loginUser,
        fetchCurrentUser,
        logoutUser,
    };
}
