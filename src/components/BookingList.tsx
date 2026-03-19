"use client";

import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { BookingItem } from "@/types/venue-interface";
import { removeBooking } from "@/redux/features/bookSlice";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";

export default function BookingList() {
  const bookingItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  if (bookingItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h6" color="textSecondary">
          No Venue Booking
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Your Bookings
      </Typography>
      <Stack spacing={2}>
        {bookingItems.map((item: BookingItem, index: number) => (
          <Paper
            key={`${item.venue}-${item.bookDate}-${index}`}
            elevation={2}
            sx={{ p: 3, borderRadius: 2, position: "relative" }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Name-Lastname
                </Typography>
                <Typography variant="body1">{item.nameLastname}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Contact Number
                </Typography>
                <Typography variant="body1">{item.tel}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Venue
                </Typography>
                <Typography variant="body1">{item.venue}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="primary">
                  Booking Date
                </Typography>
                <Typography variant="body1">{item.bookDate}</Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ mt: 2 }}
              onClick={() => dispatch(removeBooking(item))}
            >
              Cancel Booking
            </Button>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
