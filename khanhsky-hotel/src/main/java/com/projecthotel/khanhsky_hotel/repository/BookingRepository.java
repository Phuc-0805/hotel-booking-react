package com.projecthotel.khanhsky_hotel.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projecthotel.khanhsky_hotel.model.BookedRoom;

public interface BookingRepository extends JpaRepository<BookedRoom,Long>{
    List<BookedRoom> findByRoom_Id(Long roomId);

    Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> findByGuestEmail(String email);
}