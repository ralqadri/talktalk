import { hash } from "bcrypt";

let password = "";

console.log("Enter a password:");
process.stdin.on("data", (data) => {
    password = data.toString().trim();

    process.stdin.pause();

    hash(password, 10, (err, hash) => {
        if (err) {
            console.error(`Failed to generate hash: ${err.message}`);
            return;
        }

        console.log(`Generated hash: ${hash}\nEnter this hash in the config.json file.`);
    });
});