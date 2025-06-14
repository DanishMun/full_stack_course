const Persons = ({ persons, deletePerson }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        {person.name} {person.phoneNumber}
        <button
          onClick={() => deletePerson(person.id, person.name)}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default Persons;
