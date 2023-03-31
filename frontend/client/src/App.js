import React, {useState, useEffect} from 'react'

function App() {
  // already discussed. This creates a state variable called data
  // and a function called setData to update it.
  const [data, setData] = useState([{}]);

  // useEffect is a hook that runs after the component is rendered.
  // it grabs the data from the backend (members api defined earlier) 
  // and sets it to the data state variable.
  useEffect(() => {
    fetch("/members").then(
      res => res.json() // check for response
    ).then(
      data => {
        setData(data); // set data to the resposne
        console.log(data); // log the response in console which can be seen in browser
      }
    )
  }, []);

  // defines what is seen on webpage
  // first checks if data is undefined, if so, it displays "Loading..."
  // basically if the api created in the backend is fetched or not
  // if so, display the members Uses ? : instead of if else
  return (
    <div>
        {(typeof data.members === "undefined") ? (
          <p>Loading...</p>
        ) : (
          data.members.map((member, index) => (
            <p key={index}>{index} {member}</p>
          ))
        )}
    </div>
  );
}

export default App;