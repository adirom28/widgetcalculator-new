package com.allcarstransport.server.utils.mappers;

import org.bson.types.Binary;

public interface BaseMapper {

    default Binary mapBase64ToBinary(String base64) {
        return base64 != null ? new Binary(base64.getBytes()) : null;
    }

    default String mapBinaryToBase64(Binary binary) {
        return binary != null ? new String(binary.getData()) : null;
    }

}
