import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { userSelector, isAuthSelector } from "../../services/selectors";
import PropTypes from 'prop-types';
import { ReactNode, FC, ReactElement } from "react";
import { useAppSelector } from "../../utils/hooks";

type TProtectedRouteProps = {
  onlyUnAuth: boolean,
  element: ReactElement
}; 

const ProtectedRoute : FC<TProtectedRouteProps>= ({
    onlyUnAuth = false,
    element
  }) => {
    const user = useAppSelector(userSelector);
    const location = useLocation();
  
    if (onlyUnAuth && (user.name !== "")) {
      const from = location.state?.from || '/';
      return <Navigate to={from} />;
    }
  
    if (!onlyUnAuth && (user.name == "")) {
      return (
        <Navigate to="/login" state={{ from: location.pathname } }/>
      );
    }
  
    return element;
  };
  
  export default ProtectedRoute;