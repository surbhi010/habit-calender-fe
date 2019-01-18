import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

const baseUrl = 'http://localhost:3000';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }

    getHabits() {
        return this.http.get(`${baseUrl}/habits`);
    }

    getEntries(startDate, endDate) {
        return this.http.get(`${baseUrl}/entries`, {
            params: { startDate: startDate, endDate: endDate },
        });
    }
    addHabit(name) {
        return this.http.post(`${baseUrl}/habits/create`, {
            name,
        });
    }
    addEntry(habit, date) {
        console.log(habit.id, date.format('YYYY-MM-DD'));
        return this.http.post(`${baseUrl}/entries/create`, {
            habitId: habit.id,
            date: date.format('YYYY-MM-DD'),
        });

    }
    removeEntry(habit, date) {
        return this.http.post(`${baseUrl}/entries/remove`, {
            habitId: habit.id,
            date: date.format('YYYY-MM-DD'),
        });
    }

    validateLogin(user: User) {
        return this.http.post(`${baseUrl}/login`, {
            params: {username: user.username,
            password: user.password}
        });
    }
}
