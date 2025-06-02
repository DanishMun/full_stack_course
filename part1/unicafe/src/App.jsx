import { useState } from "react";

const Statistics = ({ good, neutral, bad, all, average, percentage }) => {
  if (all === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h2>statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={percentage + " %"} />
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td> {value}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodHandler = () => {
    const totalGood = good + 1;
    setGood(totalGood);
  };

  const neutralHandler = () => {
    const totalNeutral = neutral + 1;

    setNeutral(totalNeutral);
  };
  const badHandler = () => {
    const totalBad = bad + 1;
    setBad(totalBad);
  };

  const all = good + neutral + bad;
  const average =
    all > 0
      ? Math.floor(((good * 1 + neutral * 0 + bad * -1) / all) * 10) / 10
      : 0;

  const percentage = all > 0 ? Math.floor((good / all) * 1000) / 10 : 0;
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={goodHandler} text="good" />
      <Button onClick={neutralHandler} text="neutral" />
      <Button onClick={badHandler} text="bad" />

      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        average={average}
        percentage={percentage}
      />
    </div>
  );
};

export default App;
