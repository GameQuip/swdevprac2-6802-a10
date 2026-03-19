"use client";

import { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "@/types/venue-interface";
import { addBooking } from "@/redux/features/bookSlice";

export default function BookingForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [nameLastname, setNameLastname] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);

  const handleBooking = () => {
    if (nameLastname && tel && venue && bookDate) {
      const item: BookingItem = {
        nameLastname: nameLastname,
        tel: tel,
        venue: venue,
        bookDate: bookDate.format("YYYY/MM/DD"),
      };

      dispatch(addBooking(item));
      alert(`จองสถานที่ ${venue} เรียบร้อยแล้ว!`);
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <Box
      sx={{ minHeight: "60vh", display: "flex", alignItems: "center", py: 4 }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Venue Booking
          </Typography>
          <form noValidate autoComplete="off">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                variant="standard"
                label="Name-Lastname"
                name="Name-Lastname"
                fullWidth
                required
                onChange={(e) => setNameLastname(e.target.value)}
              />
              <TextField
                variant="standard"
                label="Contact-Number"
                name="Contact-Number"
                fullWidth
                required
                onChange={(e) => setTel(e.target.value)}
              />
              <FormControl variant="standard" fullWidth>
                <InputLabel id="venue-label">Venue</InputLabel>
                <Select
                  labelId="venue-label"
                  id="venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  label="Venue"
                >
                  <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                  <MenuItem value="Spark">Spark Space</MenuItem>
                  <MenuItem value="GrandTable">The Grand Table</MenuItem>
                </Select>
              </FormControl>

              <DateReserve onDateChange={(value) => setBookDate(value)} />

              <Button
                variant="contained"
                fullWidth
                size="large"
                color="primary"
                name="Book Venue"
                onClick={handleBooking}
                sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
              >
                Book Venue
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
