const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  tableName: String,    // match the 'table' key from frontend (string)
  note: String      // match the 'note' content from frontend (string)
});

module.exports = mongoose.model('Note', noteSchema);