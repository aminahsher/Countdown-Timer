#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
const response = await inquirer.prompt([{
        type: "number",
        name: "userinput",
        message: "enter desired time",
        validate: function (userinput) {
            if (userinput < 0 || userinput > 60) {
                return "please number between (1-60)";
            }
            else if (isNaN(userinput)) {
                return "please enter value in number";
            }
            else {
                return true;
            }
        }
    }]);
let input = response.userinput;
function startTimer(val) {
    const inintialTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(inintialTime);
    setInterval(((val) => {
        const currenttime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currenttime);
        if (timeDiff <= 0) {
            console.log("Timer has expired");
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTimer(input);
