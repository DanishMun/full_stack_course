import { useState } from "react";
import { useEffect } from "react";

import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import personService from "./services/persons";
import Persons from "./components/persons";
import "./index.css";

import Notification from "./components/notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ text: null, type: null });
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onChangeNameHandler = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };
  const onChangePhoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const notificationHandler = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: null, type: null });
    }, 5000);
  };
  const submitHandler = (event) => {
    console.log("i came at handler");
    event.preventDefault();
    const newPersonObject = { name: newName, phoneNumber: phoneNumber };
    const found = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    console.log(found);

    if (found) {
      const confirmState = window.confirm(
        `${newName} already exist in the phonebook do you want to replace old number with new one?`
      );
      const updatedPerson = { ...found, phoneNumber: phoneNumber };

      console.log(updatedPerson);
      if (!confirmState) return;
      personService
        .update(found.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === found.id ? response.data : person
            )
          );
          setNewName("");
          setPhoneNumber("");
          notificationHandler(
            `information of ${found.name} is updated`,
            "success"
          );
        })
        .catch((error) => {
          notificationHandler(
            `Note this person was already removed from the server`,
            "error"
          );
        });
    } else {
      personService.create(newPersonObject).then((response) => {
        setPersons([...persons, response.data]);
        setNewName("");
        setPhoneNumber("");
        notificationHandler(`added ${newName}`, "success");
      });
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      personService.deleteSinglePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        phoneNumber={phoneNumber}
        onChangeNameHandler={onChangeNameHandler}
        onChangePhoneNumberHandler={onChangePhoneNumberHandler}
        submitHandler={submitHandler}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
