"use client";

import { Flex } from "@mantine/core";

const dates = [
  {
    label: "Saturday",
    times: { from: 9, to: 15 },
  },
  {
    label: "Sunday",
    times: "Closed",
  },
  {
    label: "Monday",
    times: { from: 9, to: 17 },
  },
  {
    label: "Tuesday",
    times: { from: 9, to: 17 },
  },
  {
    label: "Wednesday",
    times: { from: 9, to: 17 },
  },
  {
    label: "Thursday",
    times: { from: 9, to: 17 },
  },
  {
    label: "Friday",
    times: { from: 9, to: 17 },
  },
];

const TimeDate = () => {
  return (
    <div className="timedate">
      {dates.map(({ label, times }) => (
        <div className="timedate__container" key={label}>
          <div className="timedate__head">
            <p>06</p>
            <span>{label}</span>
          </div>
          <div className="timedate__times">
            {times === "Closed" ? (
              <div>Closed</div>
            ) : (
              new Array(times.to - times.from + 1)
                .fill("")
                .map((el, i) => (
                  <div key={`time in ${label}: ${i}`}>
                    {(i + times.from).toString().padStart(2, "0")}:00
                  </div>
                ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeDate;