const form = document.getElementById("calorieForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const age = Number(document.getElementById("age").value);
  const weight = Number(document.getElementById("weight").value);
  const height = Number(document.getElementById("height").value);
  const gender = document.getElementById("gender").value;
  const activity = Number(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;

  let calories = 10 * weight + 6.25 * height - 5 * age;

  if (gender === "male") {
    calories += 5;
  } else {
    calories -= 161;
  }

  calories *= activity;

  if (goal === "lose") {
    calories -= 500;
  } else if (goal === "gain") {
    calories += 300;
  }

  result.textContent =
    "Estimated daily calories: " + Math.round(calories) + " kcal/day";
});