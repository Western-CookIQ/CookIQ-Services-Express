class Follower {
  constructor(follower_user_id, followed_user_id) {
    this._follower_user_id = follower_user_id;
    this._followed_user_id = followed_user_id;
  }

  get follower_user_id() {
    return this._follower_user_id;
  }

  set follower_user_id(id) {
    this._follower_user_id = id;
  }

  get followed_user_id() {
    return this._followed_user_id;
  }

  set followed_user_id(id) {
    this._followed_user_id = id;
  }
}

module.exports = Follower;
