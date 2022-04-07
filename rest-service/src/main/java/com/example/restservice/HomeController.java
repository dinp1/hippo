package com.example.restservice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class HomeController {
    private static final String temp = "test";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/home")
    public Home home(@RequestParam(value = "name", defaultValue = "testing") String name){
        return new Home(counter.incrementAndGet(),String.format(temp, name));
    }
}
