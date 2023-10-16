import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthCallbackView } from "./views/AuthCallbackView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world! Env: {import.meta.env.DEV ? 'dev': 'prod'} <a href="/api/login">login</a></div>,
  },
  {
    path: "/auth-callback",
    element: <AuthCallbackView />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
