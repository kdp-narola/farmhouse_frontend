import { Route, Routes } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import NotFound from "@/pages/NotFound";
import { AUTH_ROUTES, DASHBOARD_ROUTES, PROPERTY_ROUTES } from "./appRoutes";
import { useAuth } from "@/contexts/AuthContext";

const MainRoutes = () => {
  const { authUser } = useAuth()
  console.log('authUser.role', authUser?.role)

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {
          AUTH_ROUTES?.map((route, index)=>{
            return <Route key={index} path={route.path} element={route.element}/>
          })
        }
        {
          PROPERTY_ROUTES?.map((route, index) => {
             if (route.isRouteAccessible === false) {
              if(route?.accessBy?.includes(authUser?.role)) {
              // if(route?.accessBy === authUser?.role) {
                return <Route key={index} path={route.path} element={route.element}/>
              }
               else return null;
             }
            return <Route key={index} path={route.path} element={route.element}/>
          })
        }
        {
          DASHBOARD_ROUTES?.map((route, index)=>{
            if (route.isRouteAccessible === false) {
              if(route?.accessBy === authUser?.role) {
                return <Route key={index} path={route.path} element={route.element}/>
              }
              else return null;
            }
            return <Route key={index} path={route.path} element={route.element}/>
          })
        }
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
