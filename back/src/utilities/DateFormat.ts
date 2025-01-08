class DateFormat {
    static formatDateStringToLocale(
      date: string,
      type: "date" | "dateTimeHour" | "dateTimeHourMinute"
    ): string {

        const splitedDate = date.split(" ");
        let formattedString: string;

        switch (type) {
          case "date":
            formattedString = `${splitedDate[0]}T00:00:00`;
            break;

          case "dateTimeHour":
            formattedString = `${splitedDate[0]}T${splitedDate[1]}:00:00`;
            break;

          case "dateTimeHourMinute":
            formattedString = `${splitedDate[0]}T${splitedDate[1]}:00`;
            break;
        }
        return new Date(formattedString).toISOString();
    }
}

export default DateFormat;