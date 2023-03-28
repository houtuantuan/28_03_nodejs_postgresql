const app=require("./server")
const port = 5000;
require("dotenv").config();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });