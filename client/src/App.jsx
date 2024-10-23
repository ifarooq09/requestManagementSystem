import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./components/auth/SignIn"
import Error from "./components/auth/Error"
import Dashboard from "./components/pages/Dashboard"
import Profile from "../src/components/pages/Profile"
import UserLayout from "./components/layout/UserLayout"
import DirectorateLayout from "./components/layout/DirectorateLayout"
import DocumentLayout from "./components/layout/DocumentLayout"
import AllUsers from "./components/pages/AllUsers"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <SignIn /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/users" element={ <UserLayout /> }>
            <Route index element={<AllUsers />} />
          </Route>
          <Route path="/directorates" element={ <DirectorateLayout/> } />
          <Route path="/documents" element={ <DocumentLayout /> } />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={ <Error/> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
