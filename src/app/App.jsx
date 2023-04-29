import _ from "lodash";
import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./AppRouters";

export default function App() {
  return useMemo(() => {
    return (
      <Routes>
        {_.map(routes, (route, index) => {
          const Component = route.component;
          if (route.layout) {
            const Layout = route.layout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            );
          } else {
            return (
              <Route key={index} path={route.path} element={<Component />} />
            );
          }
        })}
      </Routes>
    );
  });
}
