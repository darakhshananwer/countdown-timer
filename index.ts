#! /usr/bin/env node

import inquirer from 'inquirer';

class CountdownTimer {
    private duration: number;
    private timer: number;
    private intervalId: NodeJS.Timeout | null = null;

    constructor(duration: number) {
        this.duration = duration;
        this.timer = duration;
    }

    private formatTime(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    public start() {
        if (this.intervalId) {
            return;
        }
        this.intervalId = setInterval(() => {
            console.log(this.formatTime(this.timer));
            if (this.timer === 0) {
                this.stop();
                console.log('Countdown finished');
            } else {
                this.timer--;
            }
        }, 1000);
    }

    public stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public reset() {
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