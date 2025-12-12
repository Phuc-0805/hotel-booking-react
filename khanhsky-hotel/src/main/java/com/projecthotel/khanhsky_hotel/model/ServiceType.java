package com.projecthotel.khanhsky_hotel.model;

import java.math.BigDecimal;

public enum ServiceType {
    AIRPORT_PICKUP(new BigDecimal("1000"), PricingRule.FIXED),
    EXTRA_BED(new BigDecimal("2000"), PricingRule.PER_NIGHT),
    BREAKFAST(new BigDecimal("3000"), PricingRule.PER_PERSON_PER_NIGHT);

    
    private final BigDecimal price;
    private final PricingRule rule;

    ServiceType(BigDecimal price,PricingRule rule) {
        this.price = price;
        this.rule = rule;
    }
    public BigDecimal getPrice() {return price;}
    public PricingRule getRule() {return rule;}

    public enum PricingRule{
        FIXED,
        PER_NIGHT,
        PER_PERSON_PER_NIGHT
    }
}
