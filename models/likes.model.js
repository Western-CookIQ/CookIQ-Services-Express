class Likes {
  constructor(user_id, post_id) {
    this._user_id = user_id;
    this._post_id = post_id;
  }

  get user_id() {
    return this._user_id;
  }

  set user_id(user_id) {
    this._user_id = user_id;
  }

  get post_id() {
    return this._post_id;
  }

  set post_id(post_id) {
    this._post_id = post_id;
  }
}

module.exports = Likes;
