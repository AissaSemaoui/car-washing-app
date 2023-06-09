"use client";

import { Button } from "@mantine/core";
import moment from "moment";

const timesByDay = {
  Sunday: { from: 0, to: 0 },
  Monday: { from: 9, to: 17 },
  Tuesday: { from: 9, to: 17 },
  Wednesday: { from: 9, to: 17 },
  Thursday: { from: 9, to: 17 },
  Friday: { from: 9, to: 17 },
  Saturday: { from: 9, to: 15 },
};

const dates = Array.from({ length: 7 }).map((_, index) => ({
  date: moment().add(index, "days"),
}));

const TimeDate = ({ scheduledDate, occupiedDates, setFormData }) => {
  const scheduleDate = (date, hour) => {
    if (!date || !hour) return;

    const scheduledDate = {
      date: date.format("L"),
      hour,
      fullDate: `${date.format("L")} ${hour} UTC`,
    };

    setFormData((prev) => ({ ...prev, scheduledDate }));
  };

  const occupiedTimes = (() => {
    const destructuredDates = occupiedDates.map((d) => {
      const date = moment(d);
      if (!date) return {};
      return {
        date: date.format("L"),
        hour: date.format("HH") + ":00",
      };
    });
    return destructuredDates;
  })();

  return (
    <div className="timedate">
      {dates.map(({ date }, index) => {
        const label = date.format("dddd");
        const times = timesByDay[label];
        const day = date.format("DD");

        return (
          <div className="timedate__container" key={label}>
            <div
              className={`timedate__head ${
                label === "Sunday"
                  ? "timedate__head--sunday "
                  : index === 0
                  ? "timedate__head--today"
                  : ""
              }`}>
              <p>{day}</p>
              <span>{label}</span>
            </div>
            <div className="timedate__times">
              {label === "Sunday" ? (
                <div className="timedate__times--closed">Closed</div>
              ) : (
                new Array(Math.floor((times.to - times.from + 1) / 2))
                  .fill("")
                  .map((_, i) => {
                    const startHour = times.from + i * 2;
                    const endHour = startHour + 1;

                    const hour = `${startHour.toString().padStart(2, "0")}:30`;

                    const labelHour = `${startHour
                      .toString()
                      .padStart(2, "0")}:00 - ${endHour
                      .toString()
                      .padStart(2, "0")}:00`;

                    const isCurrentDate =
                      scheduledDate?.date === date.format("L") &&
                      scheduledDate?.hour === hour;

                    const isOccupiedTime = !!occupiedTimes.find(
                      (d) => d?.date === date.format("L") && d?.hour === hour
                    );
                    return (
                      <Button
                        className={`timedate__btn ${
                          isCurrentDate
                            ? "timedate__btn--current"
                            : isOccupiedTime
                            ? "timedate__btn--occupied"
                            : ""
                        }`}
                        variant="subtle"
                        c="gray.8"
                        onClick={() => scheduleDate(date, hour)}
                        key={`time in ${label}: ${i}`}>
                        {labelHour}
                      </Button>
                    );
                  })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeDate;
