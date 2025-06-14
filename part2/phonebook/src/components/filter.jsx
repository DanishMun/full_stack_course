const Filter = ({ searchTerm, onSearchChange }) => (
  <div>
    Search:{" "}
    <input
      type="text"
      value={searchTerm}
      onChange={onSearchChange}
      placeholder="Search by name"
    />
  </div>
);

export default Filter;
