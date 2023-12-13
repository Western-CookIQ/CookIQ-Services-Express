class Client {
  constructor(id, is_first_login, is_public) {
    this._id = id;
    this._is_first_login = is_first_login;
    this._is_public = is_public;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get is_first_login() {
    return this._is_first_login;
  }

  set is_first_login(value) {
    this._is_first_login = value;
  }

  get is_public() {
    return this._is_public;
  }

  set is_public(value) {
    this._is_public = value;
  }
}

module.exports = Client;
