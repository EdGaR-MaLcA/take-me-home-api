import * as moment from 'moment-timezone';

export class DateTime {
  private datetime: Date;

  private constructor(
    datetime: Date
  ) {
    this.datetime = datetime;
  }

  public static from(datetime: Date) {
    return new DateTime(
      datetime
    );
  }
 
  public static fromString(datetime: string) {
    const date: Date = moment(datetime, 'YYYY-MM-DD HH:mm:ss').toDate();
    return new DateTime(
      date
    );
  }
 

  //get Date in string format
  getValue() {
    return moment(this.datetime).format('YYYY-MM-DD');
  }


  public static utcNow() {
    moment.tz.setDefault('UTC');
    const datetime = moment.tz().toDate();
    return new DateTime(
      datetime
    );
  }

  public format() {
    return moment(this.datetime).format();
  }
}