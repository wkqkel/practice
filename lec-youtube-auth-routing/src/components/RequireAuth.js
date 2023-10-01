import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  // 로그인했을 경우만 접근 가능
  // auth?.user은 사용자가 로그인했는지 알려줌   // replace없으면 페이지 뒤로가기시 안돌아가짐, 히스토리 X // state는 props전달가능
  // find 만족하는 첫번째 요소를 반환

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace /> //로그인은했지만 승인되지않은사람
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
