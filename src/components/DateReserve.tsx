"use client";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DateReserve({
  onDateChange,
}: {
  onDateChange: (value: Dayjs | null) => void;
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          className="bg-white"
          value={reserveDate}
          onChange={(value) => {
            setReserveDate(value);
            onDateChange(value);
          }}
          slotProps={{ textField: { variant: "standard", fullWidth: true } }}
        />
      </LocalizationProvider>
    </>
  );
}
