package com.projecthotel.khanhsky_hotel.service;

import java.util.List;

import com.projecthotel.khanhsky_hotel.model.BookedRoom;

public interface IBookingService {
    void cancelBooking(Long bookingId);

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);
    String saveBooking(Long roomId,BookedRoom bookingRequest);
    BookedRoom findByBookingConfirmationCode(String confirmationCode);
    List<BookedRoom> getAllBookings();
    List<BookedRoom> getBookingsByUserEmail(String email);
    
}
