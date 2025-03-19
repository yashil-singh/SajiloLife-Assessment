import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import LocationProvider from "./context/LocationContext";
import { Toaster } from "sonner";
import Search from "./pages/Search";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "articles",
          element: <Articles />,
        },
        {
          path: "articles/:category",
          element: <Articles />,
        },
        { path: "search", element: <Search /> },
      ],
    },
  ]);

  return (
    <>
      <LocationProvider>
        <RouterProvider router={router} />
        <Toaster
          closeButton
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                "flex bg-background min-h-14! px-4 rounded-xl max-w-lg w-full gap-2 items-center shadow-sm relative",
              title: "font-semibold text-sm text-foreground!",
              description: "text-sm text-muted-foreground",
              success: "text-green-500",
              info: "text-blue-500",
              error: "text-destructive",
              warning: "text-orange-500",
              closeButton:
                "absolute -top-1 -right-1 text-foreground bg-background border rounded-full cursor-pointer p-1",
            },
          }}
        />
      </LocationProvider>
    </>
  );
}

export default App;
