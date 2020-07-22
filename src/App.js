import React, { useEffect } from "react";
const App = () => {
  const [staff, setstaff] = React.useState([]);
  const [student, setstudent] = React.useState([]);
  const [name, setname] = React.useState("");
  const [id, setid] = React.useState("");
  const [staffid, setstaffid] = React.useState("");
  const [email, setemail] = React.useState("");
  const [staffname, setstaffname] = React.useState("");
  const [staffId, setstaffId] = React.useState("");
  const [staffemail, setstaffemail] = React.useState("");
  const getValue = () => {
    
    fetch("https://student-staff-backend.herokuapp.com/allStudents")
      .then((response) => response.json())
      .then((data) => setstudent(data));
    console.log("student", student);
    fetch("https://student-staff-backend.herokuapp.com/allStaff")
      .then((response) => response.json())
      .then((data) => setstaff(data));
    
  };
  useEffect(() => {
    getValue();
  }, []);
  function add() {
    fetch("https://student-staff-backend.herokuapp.com/studentCreation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, id, staffid, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setname("");
        setstaffid("");
        setid("");
        setemail("");
        getValue();
      });
  }
  function addstaff() {
    fetch("https://student-staff-backend.herokuapp.com/staffCreation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ staffname, staffId, staffemail }),
    })
      .then((res) => res.json())
      .then((data) => {
        setstaffname("");
        setstaffId("");
        setstaffemail("");
        getValue();
      });
  }


  function update(index) {
    setname(student.filter((d, i) => index === i)[0].name);
    setstaffid(student.filter((d, i) => index === i)[0].staffid);
    setemail(student.filter((d, i) => index === i)[0].email);
    setid(student.filter((d, i) => index === i)[0].id);
  }
  function updatedata(index) {
    fetch("https://student-staff-backend.herokuapp.com/editStudent/{index}", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, id, staffid, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchdata();
        setname("");
        setstaffid("");
        setid("");
        setemail("");
        fetchdata();
      });
  }
  function deletedata(index) {
    console.log("new", student.filter((d, i) => index === i)[0]);
    fetch("https://student-staff-backend.herokuapp.com/deleteStudent/{index}", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student.filter((d, i) => index === i)[0]),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchdata();
      });
  }
  return (
    <div>
      <div>
      <h1>Students Details</h1>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      ></input>
      <br />
      <label>Id</label>
      <input
        type="text"
        value={id}
        onChange={(e) => setid(e.target.value)}
      ></input>
      <br />
      <label>Staff-Id</label>
      <input
        type="text"
        value={staffid}
        onChange={(e) => setstaffid(e.target.value)}
      ></input>
      <br />
      <label>E-mail</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      ></input></div>
      <br />
      <br />

      <button onClick={() => add()}>Addme</button>
      <br />
      <br />
      <div>
      <h1>Staff Details</h1>
      <label>Name</label>
      <input
        type="text"
        value={staffname}
        onChange={(e) => setstaffname(e.target.value)}
      ></input>
      <br />
      <label>staffId</label>
      <input
        type="text"
        value={staffId}
        onChange={(e) => setstaffId(e.target.value)}
      ></input>
      <br />
      <label>E-mail</label>
      <input
        type="text"
        value={staffemail}
        onChange={(e) => setstaffemail(e.target.value)}
      ></input></div>
      <br />
      <br />

      <button onClick={() => addstaff()}>Addme</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>E-mail</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((a, index) => (
            <tr key={index}>
              <td>{a.name}</td>
              <td>{a.id}</td>
              <td>{a.email}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>Staff-Id</th>
            <th>E-mail</th>
          </tr>
        </thead>

        <tbody>
          {student.map((a, index) => (
            <tr key={index}>
              <td>{a.name}</td>
              <td>{a.id}</td>
              <td>{a.staffid}</td>
              <td>{a.email}</td>
              <td>
                <button onClick={() => update(index)}>Edit</button>
                <button onClick={() => deletedata(index)}>Delete</button>
                <button onClick={() => updatedata(index)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default App;
