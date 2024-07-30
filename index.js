#! /usr/bin/env node
import inquirer from 'inquirer';
class CountdownTimer {
    duration;
    timer;
    intervalId = null;
    constructor(duration) {
        this.duration = duration;
        this.timer = duration;
    }
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    start() {
        if (this.intervalId) {
            return;
        }
        this.intervalId = setInterval(() => {
            console.log(this.formatTime(this.timer));
            if (this.timer === 0) {
                this.stop();
                console.log('Countdown finished');
            }
            else {
                this.timer--;
            }
        }, 1000);
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    reset() {
        this.stop();
        this.timer = this.duration;
    }
}
const askForDuration = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'duration',
            message: 'Enter countdown duration in seconds:',
            validate: (input) => {
                const num = parseInt(input);
                if (isNaN(num) || num <= 0) {
                    return 'Please enter a valid positive number.';
                }
                return true;
            }
        }
    ]);
    const duration = parseInt(answers.duration);
    const countdown = new CountdownTimer(duration);
    countdown.start();
};
askForDuration();
