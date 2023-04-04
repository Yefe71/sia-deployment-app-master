import react, { useState } from "react";
import "./App.css";
import StudentDeployment from "../Pages/StudentDeployment/StudentDeployment";
import Admin from "../Pages/Admin/Admin";
import Navbar from "../components/Navbar/Navbar";
import FacultyDeployment from "../Pages/FacultyDeployment/FacultyDeployment";
function App() {
  const [access, setAccess] = useState(false);
  const [page, setPage] = useState("roomplot");
  const [currentApp, setCurrentApp] = useState("student");

  return (
    <div className="App">
      <Navbar
        currentApp={currentApp}
        access={access}
        page={page}
        setAccess={setAccess}
        setPage={setPage}
        setCurrentApp = {setCurrentApp}
      />

    {
      currentApp === "student" ?

      <>
        {access ? (
          <StudentDeployment
            pageSent={page}
            setAccess={setAccess}
            access={access}
          />
        ) : (
          <Admin currentApp = {currentApp} setAccess={setAccess} setPage={setPage} access={access} />
        )}
      </>
    :
      <>
        {access ? (
          <FacultyDeployment
            pageSent={page}
            setAccess={setAccess}
            access={access}
          />
        ) : (
          <Admin currentApp = {currentApp} setAccess={setAccess} setPage={setPage} access={access} />
        )}
      </>
  }

    </div>
  );
}

export default App;
