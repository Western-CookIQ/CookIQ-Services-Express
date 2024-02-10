class Post {
  constructor(id, user_id, upload_date_in_utc, recipe_id) {
    this._id = id;
    this._user_id = user_id;
    this._upload_date_in_utc = upload_date_in_utc;
    this._recipe_id = recipe_id;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get user_id() {
    return this._user_id;
  }

  set user_id(user_id) {
    this._user_id = user_id;
  }

  get upload_date_in_utc() {
    return this._upload_date_in_utc;
  }

  set upload_date_in_utc(date) {
    this._upload_date_in_utc = date;
  }

  get recipe_id() {
    return this._recipe_id;
  }

  set recipe_id(recipe_id) {
    this._recipe_id = recipe_id;
  }
}

module.exports = Post;
