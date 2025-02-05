package com.cars24.fullstack.data.response;

import lombok.Data;

@Data

public class UpdateDeleteResponse {
    private Long noteId;
    private String note;
    private String title;
}
