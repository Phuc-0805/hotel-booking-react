package com.projecthotel.khanhsky_hotel.service.bookingcost;

import java.math.BigDecimal;

public abstract class ServiceChargeDecorator implements BookingCharge{
    protected final BookingCharge wrapper;

    protected ServiceChargeDecorator(BookingCharge wrapper) {
        this.wrapper = wrapper;
    }

    @Override
    public BigDecimal cost() {
        return wrapper.cost();
    }

    @Override 
    public String description(){
        return wrapper.description();
    }
}
