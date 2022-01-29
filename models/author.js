const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const authorSchema = new Schema({
  first_name: { type: String, maxlength: 100, required: true },
  family_name: { type: String, maxlength: 100, required: true },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

//virtual for author's full name
authorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  if (!this.first_name || !this.family_name) {
    fullname = "";
  }

  return fullname;
});

//virtual for author's lifespan
authorSchema.virtual("lifespan").get(function () {
  let lifespan_string = "";
  if (this.date_of_birth) {
    lifespan_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }

  lifespan_string += " - ";

  if (this.date_of_death) {
    lifespan_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }

  return lifespan_string;
});

//virtual for author's URL
authorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model("Author", authorSchema);
