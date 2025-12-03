/*
//? Works with EJS only
import chalk from "chalk";

console.log(chalk.blue("Hello World!"));
console.log(chalk.green.underline("Success Message!"));

//! external packages are updated incrementally, chalk: ^5.6.2
//! MAJOR.MINOR.PATCH => [Significant Updates or Breaking Changes].[Addition of new feature or Improvements in a backward compatible manner].[Backward compatible Bug fixes, or minor improvements that address issues without adding new features or causing breaking changes]
//! ^ => install any version compatible with 5.6.2 but less than 6.0.0
//! 5.6.2 => exact version || latest => latest version
*/

const fs = require("fs");
const { Command } = require("commander");

const program = new Command();

program
  .name("file-util")
  .description("Utility for file operations")
  .version("1.0.0");

program
  .command("count-words")
  .description("read the file and count the number of words in it.")
  .argument("<file-path>", "path to the file")
  .action((path) => {
    fs.readFile(path, "utf-8", (err, content) => {
      if (err) {
        console.error(err);
      } else {
        const words = content.split(" ");
        console.log(`You have ${words.length} words in file: ${path}.`);
      }
    });
  });

program.parse();

/*
? process.argv => returns the command line arguments passed in the terminal

?
const thenable = {
  then: function(onFulfilled) {
    setTimeout(() => onFulfilled(42), 1000);
  }
}
?
async function main() {
  const v = await thenable;
  console.log("Hey there");
}

main();

! Every thenable is not a Promise, but every Promise is a thenable.

*/
