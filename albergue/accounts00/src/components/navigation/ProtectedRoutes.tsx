import {Navigate, Outlet} from "react-router-dom"
import {useAuth} from "../../hooks/useAuth";

const ProtectedRoutes = () => {
  const { user_id } = useAuth()

  return (
    user_id ?
      <Outlet /> :
      <Navigate to='/users/sign_in?msg=You need to Login or Register before continuing.' />
  )
}

export default ProtectedRoutes