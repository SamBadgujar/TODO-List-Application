
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import User from './components/getuser/User';
import Adds from './components/adduser/Adds';
import Edit from './components/updateuser/Edit';





function App() {

  const route = createBrowserRouter([
    {
    path:"/",
    element:<User/>,
    },
  {
    path:"/add",
    element: <Adds/>,
  },
  {
    path:"/edit/:id",
    element:<Edit/>,
  },
])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
