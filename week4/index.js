const fs = require("fs");
fs.writeFile("output.txt", "Hello guys", (err) => {
  if (err) {
    console.error("Error writing file:", err);
  }

  console.log("File written successfully");
});


fs.readFile("output.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  console.log("File contents:");
  console.log(data);
});