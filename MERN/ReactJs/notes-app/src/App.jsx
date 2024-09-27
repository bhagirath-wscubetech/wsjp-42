import { useState } from "react";

function App() {
  const [notes, setNote] = useState([]);
  //   { title: "Testing title", detail: "Testing details" }
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const detail = e.target.detail.value;

    if (title != "" && detail != "") {
      // console.log(title, detail);
      const newNotes = [
        ...notes,
        {
          title, detail, timestamp: new Date().getTime()
        }
      ];
      setNote(newNotes);
      e.target.reset();
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-3">
          <form onSubmit={formSubmitHandler}>
            <div className="mb-3">
              <label className="form-label">
                Title
              </label>
              <input name="title" type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Details
              </label>
              <textarea name="detail" required className="form-control"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        </div>
        <div className="col-9">
          <div className="row">
            {
              [...notes].reverse().map(
                (n, i) => {
                  return <div key={i} className="col-4 mt-2">
                    <div className="card p-3 position-relative" style={{ height: 300 }}>
                      <h4>{n.title}</h4>
                      <hr />
                      <p>
                        {n.detail}
                      </p>
                      <i className="pb-2 position-absolute bottom-0 end-0 pe-2">
                        {timeAgo(n.timestamp)}
                      </i>
                    </div>
                  </div>
                }
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

function timeAgo(timestamp) {
  // Get the current timestamp in milliseconds
  const now = Date.now();

  // Calculate the difference in milliseconds
  const diff = now - timestamp;

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Construct the return string
  let result = '';
  if (days > 0) result += `${days} days `;
  result += `${hours} hrs ${minutes} mins ${seconds} secs`;

  return result.trim();
}