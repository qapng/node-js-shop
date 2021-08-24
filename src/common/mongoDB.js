const mongoose = require("mongoose");
const config = require("config");

require("../apps/models/users");
require("../apps/models/product");
require("../apps/models/categories");
require("../apps/models/comment");

const uris = config.get("databases.mongo");

mongoose.connect(uris, { useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on("connected", function () {
  console.log(`MongoDB connect successfully!`);
});
