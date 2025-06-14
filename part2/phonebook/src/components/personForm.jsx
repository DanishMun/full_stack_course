const PersonForm = ({
  newName,
  phoneNumber,
  onChangeNameHandler,
  onChangePhoneNumberHandler,
  submitHandler,
}) => (
  <form onSubmit={submitHandler}>
    <div>
      Name: <input value={newName} onChange={onChangeNameHandler} />
      Number:{" "}
      <input
        type="tel"
        value={phoneNumber}
        onChange={onChangePhoneNumberHandler}
        placeholder="+358401234567"
      />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

export default PersonForm;
