const c = require("config");
const fs = require("fs");

// Ghi file

// 1. Ghi file sync

// fs.writeFileSync("demo.txt", "Hello", { encoding: "binary" });
// Ghi file khong dong bo
// fs.appendFile("demo.txt", "Hello word", (err) => {
//   console.log("err", err);
// });

// 2. Doc file

// Doc file dong bo

// const content = fs.readFileSync("demo.txt");
// console.log("content", content.toString("utf-8"));

// Doc file khong dong bo

// fs.readFile("demo.txt", (err, data) => {
//   if (err) return;
//   console.log(data.toString());
// });

// Rename file
// fs.rename("demo.txt", "demo.js", (err) => console.log(err));

// Xoa file

// fs.unlink("demo.js", (err) => err);
