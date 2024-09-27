import { useState } from "react";

function App() {
  const [names, setNames] = useState([]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const user_name = event.target.name.value;

    const newNames = [...names,user_name];
    setNames(newNames);

    // console.log(event.target.name.value);
    // console.log(event.target.email.value);
    // console.log(event.target.contact.value);
    // console.log(event.target.favoriteColor.value);
    event.target.reset();
  }

  const tableRows = names.map(
    (n, i) => <tr key={i}>
      <td  className="demo">{n}</td>
    </tr>
  )

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2>User Registration Form</h2>
          <form onSubmit={formSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
              />
            </div>
            
            {/* <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Contact Number
              </label>
              <input
                type="tel"
                className="form-control"
                name="contact"
                placeholder="Enter your contact number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="favoriteColor" className="form-label">
                Favorite Color
              </label>
              <input
                type="text"
                className="form-control"
                id="favoriteColor"
                placeholder="Enter your favorite color"
              />
            </div> */}
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
        <div className="col-12">
          <>
            <h2>Names Table</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Names</th>
                </tr>
              </thead>
              <tbody>
                {
                  tableRows
                }
              </tbody>
            </table>
          </>
        </div>
      </div>
    </div>
  )
}

export default App
