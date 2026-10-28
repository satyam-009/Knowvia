
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../../../app/componets/LoadingScreen";

const Protected = ({ children }) => {
    const { user, loading } = useSelector(
        (state) => state.auth
    );

    if (loading) {
        return <LoadingScreen message="Signing you in..." />;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default Protected;
