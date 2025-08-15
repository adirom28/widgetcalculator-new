package com.allcarstransport.server.dtos.user;

public class ClientShortInfo {

    private final String companyName;
    private final String logo;

    public ClientShortInfo(String companyName, String logo) {
        this.companyName = companyName;
        this.logo = logo;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getLogo() {
        return logo;
    }

}
