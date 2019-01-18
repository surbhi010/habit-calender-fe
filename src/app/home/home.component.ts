import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  habits: Object[] = [];
  entries: Object[] = [];
  habitName: String = '';
  checked = false;
  currentDate: moment.Moment;
  startOfWeek: moment.Moment;
  endOfWeek: moment.Moment;
  daysOfWeek: moment.Moment[] = [];
  constructor(private service: AppService) { }

  ngOnInit() {
    this.currentDate = moment();
    this.startOfWeek = moment().startOf('month');
    this.endOfWeek = moment().endOf('month');
    for (const time = this.startOfWeek.clone(); time.isBefore(this.endOfWeek); time.add(1, 'day')) {
      this.daysOfWeek.push(time.clone());
    }

    // console.log(this.currentDate, this.startOfWeek, this.endOfWeek, );
    //  for (let time of this.startOfWeek){
    this.service.getHabits()
      .subscribe((response: any) => {
        this.habits = response.habits;
      });

    this.service.getEntries(
      this.startOfWeek.format('YYYY-MM-DD'),
      this.endOfWeek.format('YYYY-MM-DD')
    ).subscribe((response: any) => {
      this.entries = response.entries;
      // if(this.entries){

      // }
      // console.log(1, this.entries);
    });
  }
  onChecked(habit, date) {
    // console.log(habit, date);
    for (let i = 0; i < this.entries.length; i++) {
      const entry: any = this.entries[i];
      if (entry.habit === habit.id
        && entry.date === date.format('YYYY-MM-DD')) {
        return true;
      }
    }
    return false;
  }

  onEntry(event, habit, date) {
    // console.log(event.target.checked);
    if (event.target.checked) {
      // console.log('heyyys');
      this.service.addEntry(habit, date)
        .subscribe((response: any) => {
          // console.log('');
        });
    } else {
      this.service.removeEntry(habit, date)
        .subscribe(() => {

        });
    }
  }
  onAddHabit() {
    this.service.addHabit(this.habitName)
      .subscribe((response: any) => {
        this.habits.push(response.habit);
        this.habitName = '';
      });
  }
}
