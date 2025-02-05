package com.cars24.fullstack.data.request;

import jakarta.validation.Valid;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.Length;

@Data
@Slf4j
@Valid

public class CreateNoteRequest {
    @Valid
    @Length(min = 3, max = 20)
    public String title;

    @Valid
    @Length(min = 1, max = 100)
    public String note;
}
