class Meal {
  constructor(
    recipe_id,
    user_id,
    is_bookmarked = null,
    rating = null,
    is_cooked = null
  ) {
    this._recipe_id = recipe_id;
    this._user_id = user_id;
    this._is_bookmarked = is_bookmarked;
    this._rating = rating;
    this._is_cooked = is_cooked;
  }

  get recipe_id() {
    return this._recipe_id;
  }

  set recipe_id(value) {
    this._recipe_id = value;
  }

  get user_id() {
    return this._user_id;
  }

  set user_id(value) {
    this._user_id = value;
  }

  get is_bookmarked() {
    return this._is_bookmarked;
  }

  set is_bookmarked(value) {
    this._is_bookmarked = value;
  }

  get rating() {
    return this._rating;
  }

  set rating(value) {
    this._rating = value;
  }

  get is_cooked() {
    return this._is_cooked;
  }

  set is_cooked(value) {
    this._is_cooked = value;
  }
}

module.exports = Meal;
