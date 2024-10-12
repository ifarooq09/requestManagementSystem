import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./components/auth/SignIn"
import Error from "./components/auth/Error"
import Dashboard from "./components/pages/Dashboard"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <SignIn /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="*" element={ <Error/> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
