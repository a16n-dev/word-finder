import {createBrowserRouter} from "react-router-dom";
import WordPatternPage from "./pages/WordPatternPage.tsx";
import PermutatePage from "./pages/PermutatePage.tsx";

export const router = createBrowserRouter([{
  path: '/words',
  element: <WordPatternPage />,
},{
  path: 'perm',
  element: <PermutatePage/>
}])