import React, { useEffect, useState } from "react";

export default function GymTracker() {
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const [workout, setWorkout] = useState("");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const [workouts, setWorkouts] = useState(() => {
    return JSON.parse(localStorage.getItem("workouts")) || [];
  });

  const [height, setHeight] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addWorkout = () => {
    if (!workout || !exercise || !sets || !reps || !weight) {
      alert("Please fill all fields");
      return;
    }

    const newWorkout = {
      id: Date.now(),
      workout,
      exercise,
      sets,
      reps,
      weight,
    };

    setWorkouts([...workouts, newWorkout]);

    setWorkout("");
    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
  };

  const deleteWorkout = (id) => {
    const updated = workouts.filter((item) => item.id !== id);
    setWorkouts(updated);
  };

  const calculateBMI = () => {
    if (!height || !bodyWeight) {
      alert("Please enter height and weight");
      return;
    }

    const heightInMeters = height / 100;

    const bmiValue = (
      bodyWeight /
      (heightInMeters * heightInMeters)
    ).toFixed(1);

    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setStatus("Underweight");
    } else if (bmiValue < 25) {
      setStatus("Normal");
    } else if (bmiValue < 30) {
      setStatus("Overweight");
    } else {
      setStatus("Obese");
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        <div className="header">
          <h1 className="title">Gym Workout Tracker</h1>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="card">
          <h2 className="section-title">Add Workout</h2>

          <input
            type="text"
            placeholder="Workout Day"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
          />

          <input
            type="text"
            placeholder="Exercise Name"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />

          <input
            type="number"
            placeholder="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />

          <input
            type="number"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />

          <input
            type="number"
            placeholder="Weight (KG)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <button onClick={addWorkout}>Add Workout</button>
        </div>

        <div className="card">
          <h2 className="section-title">Workout History</h2>

          {workouts.length === 0 ? (
            <p>No workouts added yet.</p>
          ) : (
            workouts.map((item) => (
              <div key={item.id} className="workout-item">
                <div>
                  <h3>{item.workout}</h3>
                  <p>{item.exercise}</p>

                  <p>
                    {item.sets} Sets | {item.reps} Reps |{" "}
                    {item.weight} KG
                  </p>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteWorkout(item.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <h2 className="section-title">BMI Calculator</h2>

          <input
            type="number"
            placeholder="Height (CM)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <input
            type="number"
            placeholder="Weight (KG)"
            value={bodyWeight}
            onChange={(e) => setBodyWeight(e.target.value)}
          />

          <button onClick={calculateBMI}>Calculate BMI</button>

          {bmi && (
            <div className="bmi-result">
              <p>BMI: {bmi}</p>
              <p>Status: {status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}