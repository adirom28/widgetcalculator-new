package com.allcarstransport.server.utils;

public class Utils {

    private Utils() {}

    public static String toUpperCase(String str) {
        if (str == null) return null;

        return str.trim().replace(" ", "_").toUpperCase();
    }

}
