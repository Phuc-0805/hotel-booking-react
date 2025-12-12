package com.projecthotel.khanhsky_hotel.service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.projecthotel.khanhsky_hotel.exception.InvalidBookingRequestException;
import com.projecthotel.khanhsky_hotel.exception.ResourceNotFoundException;
import com.projecthotel.khanhsky_hotel.model.BookedRoom;
import com.projecthotel.khanhsky_hotel.model.Room;
import com.projecthotel.khanhsky_hotel.repository.BookingRepository;
import com.projecthotel.khanhsky_hotel.service.bookingcost.BookingCharge;
import com.projecthotel.khanhsky_hotel.service.bookingcost.BookingChargeFactory;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookingService implements IBookingService{
    private final BookingRepository bookingRepository;
    private final RoomService roomService;

    @Override
    public List<BookedRoom>getAllBookings() {
        return bookingRepository.findAll();
    }
    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoom_Id(roomId);
    }
    @Override
    public void cancelBooking(Long bookingId) {
         bookingRepository.deleteById(bookingId);
    }
    @Override
    public String saveBooking(Long roomId,BookedRoom bookingRequest) {
        // kiểm tra ngày
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("ngày nhận phòng phải trước ngày trả phòng");
        }
        // lấy phòng
        Room room = roomService.getRoomById(roomId)
                    .orElseThrow(()-> new ResourceNotFoundException("không tìm thấy phòng"));
        // lấy các booking đã có của phòng đó
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);

        if(!roomIsAvailable) {
            throw new InvalidBookingRequestException("Sorry, This room is not available for the selected dates;");
        }
        
        long nights = ChronoUnit.DAYS.between(
            bookingRequest.getCheckInDate(),
            bookingRequest.getCheckOutDate());
        
        BookingCharge charge = BookingChargeFactory.build(
            room,
             nights,
            bookingRequest.getTotalNumberOfGuest(),
            bookingRequest.getSelectedServices());
        
            bookingRequest.setTotalAmount(charge.cost());

            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);

            return bookingRequest.getBookingConfirmationCode();
    }
    @Override 
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(()-> new ResourceNotFoundException(confirmationCode));
    }
    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    } 

    private boolean roomIsAvailable(BookedRoom req, List<BookedRoom> existing) {
    return existing.stream().noneMatch(b ->
            req.getCheckInDate().isBefore(b.getCheckOutDate()) &&
            req.getCheckOutDate().isAfter(b.getCheckInDate())
    );
    }



}
