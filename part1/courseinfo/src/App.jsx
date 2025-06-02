import { Fragment } from "react";
import { useState } from "react";
const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
    setTotal(left + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);

    setTotal(left + right);
  };

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>

      {right}
      <p>{allClicks.join(" ")}</p>
      <p>total {total}</p>
    </div>
  );
};

export default App;

// const Header = (props) => {
//   return <h1>{props.course.name}</h1>;
// };

// const Content = (props) => {
//   return (
//     <Fragment>
//       <Part
//         part={props.course.parts[0].name}
//         exercises={props.course.parts[0].exercises}
//       />
//       <Part
//         part={props.course.parts[1].name}
//         exercises={props.course.parts[1].exercises}
//       />
//       <Part
//         part={props.course.parts[2].name}
//         exercises={props.course.parts[2].exercises}
//       />
//     </Fragment>
//   );
// };
// const Total = (props) => {
//   return (
//     <h1>
//       Number of exercises{" "}
//       {props.course.parts[0].exercises +
//         props.course.parts[1].exercises +
//         props.course.parts[2].exercises}
//     </h1>
//   );
// };

// const Part = (props) => {
//   return (
//     <h1>
//       {props.part} {props.exercises}
//     </h1>
//   );
// };

// const App = () => {
//   const course = {
//     name: "Half Stack application development",
//     parts: [
//       {
//         name: "Fundamentals of React",
//         exercises: 10,
//       },
//       {
//         name: "Using props to pass data",
//         exercises: 7,
//       },
//       {
//         name: "State of a component",
//         exercises: 14,
//       },
//     ],
//   };
//   return (
//     <div>
//       <Header course={course} />
//       <Content course={course} />
//       <Total course={course} />
//     </div>
//   );
// };

// export default App;
