import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { userSelector, isAuthSelector } from "../../services/selectors";

const ProtectedRoute = ({
    onlyUnAuth = false,
    element
  }) => {
    const user = useSelector(userSelector);
    //const location = useLocation<{ from: Location}>();
    const location = useLocation();
  
    if (onlyUnAuth && (user.name !== "")) {
      const { from } = location.state || { from: { pathname: "/" } };
      return <Navigate to={from} />;
    }
  
    if (!onlyUnAuth && (user.name == "")) {
      return (
        <Navigate to={{ pathname: "/login", state: { from: location } }} />
      );
    }
  
    return element;
  };

  export default ProtectedRoute;