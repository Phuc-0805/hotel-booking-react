package com.projecthotel.khanhsky_hotel.service.bookingcost;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
@AllArgsConstructor
public class BasicRoomCharge implements BookingCharge{
    private final BigDecimal roomPricePerNight;
    private final long nights;

    @Override
    public BigDecimal cost() {
        if(roomPricePerNight == null || nights <= 0) return BigDecimal.ZERO;
        return roomPricePerNight.multiply(BigDecimal.valueOf(nights));
    }
    @Override
    public String description() {
        return "Room (" +nights +") nights";
    }

}
