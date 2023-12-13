class Tag {
  constructor(id, description) {
    this._id = id;
    this._description = description;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }
}

module.exports = Tag;
