import "./App.css";
import allContacts from "./contacts.json" 
import { useState } from "react";
import oscar from "../public/oscar.jpeg"
import emmy from "../public/emmy.jpeg"

function App() {
  const [contacts, setContacts] = useState (allContacts.slice (0,5))
  const [remainingContacts, setRemainingContacts] = useState(
    allContacts.slice(5, allContacts.length)
  )

  function addRandomContact(){
    const copyContacts = [...contacts];
    const copyRemainingContacts = [...remainingContacts]
    // First, randomly select a contact from the array of remaining contacts.
    let randomNumber= Math.floor(Math.random()*remainingContacts.length)
    let randomContact = copyRemainingContacts[randomNumber]
    //Then add that contact to the array that lives in your state (that's the previously created array of 5 contacts). 
    copyContacts.push(randomContact);
    // Do not modify the state directly. Instead, use the state updater function returned from the useState().
    setContacts(copyContacts);
    const updatedRemainingContacts = copyRemainingContacts.filter(contact => contact.id !== randomContact.id);
    setRemainingContacts(updatedRemainingContacts);
  }

  function sortByName(){
    const copyContacts = [...contacts];
    const sortedByName = copyContacts.sort ((a,b) =>
    a.name.localeCompare(b.name))
    setContacts(sortedByName)
  }

  function sortByPopularity(){
    const copyContacts = [...contacts];
    const sortedByPopularity = copyContacts.sort ((a,b) =>
    b.popularity - a.popularity)
    setContacts(sortedByPopularity)
  }

  function removeContact (id){
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  }


  return (
    <div className="App">
    <h1>IronContacts</h1>
    <button onClick={() => addRandomContact()}>Add Random Contact</button>
    <button onClick={() => sortByName()}>Sort by Name</button>
    <button onClick={() => sortByPopularity()}>Sort by Popularity</button>
      <table>
       <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
        </tr>
       </thead>
       <tbody>
        {contacts.map (eachContact =>{
          return (
          <tr key={eachContact.id}>
          <td>
            <img src={eachContact.pictureUrl} className='cardPicture' alt='card picture' />
          </td>
          <td>{eachContact.name}</td>
          <td>{eachContact.popularity.toFixed(2)}</td>
          {eachContact.wonOscar?<td>
            <img src={oscar} className="icon" alt= "oscar"/>
          </td> : <td></td>}
          {eachContact.wonEmmy?<td>
          <img src={emmy} className="icon" alt= "emmy"/>
          </td> : <td></td>}
          <td>
            <button onClick={()=> removeContact(eachContact.id)}>Remove</button>
          </td>
          </tr>)
        })}
        
       </tbody>
      </table>
    </div>
  );
}

export default App;
