class Recipetag {
  constructor(recipe_id, tag_id) {
    this._recipe_id = recipe_id;
    this._tag_id = tag_id;
  }

  get recipe_id() {
    return this._recipe_id;
  }

  set recipe_id(value) {
    this._recipe_id = value;
  }

  get tag_id() {
    return this._tag_id;
  }

  set tag_id(value) {
    this._tag_id = value;
  }
}

module.exports = Recipetag;
