class Recipe {
  constructor(
    id,
    name,
    description,
    n_steps,
    minutes,
    steps,
    calories,
    fat,
    sugar,
    sodium,
    protein,
    sat_fat,
    carbs
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._n_steps = n_steps;
    this._minutes = minutes;
    this._steps = steps;
    this._calories = calories;
    this._fat = fat;
    this._sugar = sugar;
    this._sodium = sodium;
    this._protein = protein;
    this._sat_fat = sat_fat;
    this._carbs = carbs;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get n_steps() {
    return this._n_steps;
  }

  set n_steps(value) {
    this._n_steps = value;
  }

  get minutes() {
    return this._minutes;
  }

  set minutes(value) {
    this._minutes = value;
  }

  get steps() {
    return this._steps;
  }

  set steps(value) {
    this._steps = value;
  }

  get calories() {
    return this._calories;
  }

  set calories(value) {
    this._calories = value;
  }

  get fat() {
    return this._fat;
  }

  set fat(value) {
    this._fat = value;
  }

  get sugar() {
    return this._sugar;
  }

  set sugar(value) {
    this._sugar = value;
  }

  get sodium() {
    return this._sodium;
  }

  set sodium(value) {
    this._sodium = value;
  }

  get protein() {
    return this._protein;
  }

  set protein(value) {
    this._protein = value;
  }

  get sat_fat() {
    return this._sat_fat;
  }

  set sat_fat(value) {
    this._sat_fat = value;
  }

  get carbs() {
    return this._carbs;
  }

  set carbs(value) {
    this._carbs = value;
  }
}

module.exports = Recipe;
