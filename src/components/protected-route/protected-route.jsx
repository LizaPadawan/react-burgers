import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { userSelector, isAuthSelector } from "../../services/selectors";
import PropTypes from 'prop-types';

const ProtectedRoute = ({
    onlyUnAuth = false,
    element
  }) => {
    const user = useSelector(userSelector);
    //const location = useLocation<{ from: Location}>();
    const location = useLocation();
    //console.log("in protected route location", location);
  
    if (onlyUnAuth && (user.name !== "")) {
      //const { from } = location.state || { from: { pathname: "/" } };
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

  ProtectedRoute.propTypes = {
    onlyUnAuth: PropTypes.bool,
    children: PropTypes.element
  }; 

  export default ProtectedRoute;