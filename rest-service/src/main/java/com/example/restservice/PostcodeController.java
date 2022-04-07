package com.example.restservice;


import com.fasterxml.jackson.databind.util.JSONPObject;
import jakarta.annotation.security.DenyAll;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.json.simple.JSONObject;

@RestController
@ResponseBody
@RequestMapping("/postcode")
@CrossOrigin
public class PostcodeController {

    private PostcodeService postcodeService = new PostcodeService();

    @PostMapping("/post1")
    public String postcode(@RequestBody Postcode postCode){

        Map<String,String> longLat = postcodeService.postcodePost(postCode);
        //new JSONObject(longLat);
        JSONObject json = new JSONObject();
        json.putAll( longLat );
        return json.toString();

        //return "test:" + postCode + "date:" + date;

    }


}
