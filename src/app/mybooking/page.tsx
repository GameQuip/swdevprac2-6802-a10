"use client";

import BookingList from "@/components/BookingList";
import { Container, Typography, Box, Paper } from "@mui/material";

export default function MyBookingPage() {
  return (
    <main className="p-10 bg-slate-50 min-h-screen">
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1e293b" }}
          >
            My Venue Bookings
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            sx={{ mb: 4 }}
          >
            Manage all your venue bookings here
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 4,
              backgroundColor: "transparent",
            }}
          >
            <BookingList />
          </Paper>
        </Box>
      </Container>
    </main>
  );
}
