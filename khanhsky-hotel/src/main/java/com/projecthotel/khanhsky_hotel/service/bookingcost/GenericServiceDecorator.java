package com.projecthotel.khanhsky_hotel.service.bookingcost;

import java.math.BigDecimal;

import com.projecthotel.khanhsky_hotel.model.ServiceType;

public class GenericServiceDecorator extends ServiceChargeDecorator{
    private final ServiceType serviceType;
    private final int guestCount;
    private final Long nights;

    public GenericServiceDecorator(BookingCharge wrapper, ServiceType serviceType, int guestCount, Long nights) {
        super(wrapper);
        this.serviceType = serviceType;
        this.guestCount = guestCount;
        this.nights = nights;
    }

    @Override
    public BigDecimal cost() {
        BigDecimal base = super.cost();
        BigDecimal price = serviceType.getPrice();


            return switch(serviceType.getRule()) {
                case FIXED -> base.add(price);
                case PER_NIGHT -> base.add(price.multiply(BigDecimal.valueOf(nights)));
                case PER_PERSON_PER_NIGHT -> base.add(
                    price.multiply(BigDecimal.valueOf(guestCount))
                         .multiply(BigDecimal.valueOf(nights))
                );
            };

    }
    @Override
    public String description() {
        return super.description() + " + " + serviceType.name(); 
    }
    

}
