package com.example.restservice;

//import org.apache.tomcat.util.json.JSONParser;


import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

import java.util.Map;
import java.util.Scanner;
import java.util.HashMap;


public class PostcodeService {

    public Map<String,String> postcodePost(Postcode postCode){
        String[] out = {"default"};
        String[] resultArray = {};
        HashMap<String, String> longLat = new HashMap<String, String>();

        try{
            URL url = new URL("https://api.postcodes.io/postcodes/" + postCode.getPostcode());
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            StringBuilder infoString = new StringBuilder();

            // optional default is GET
            con.setRequestMethod("GET");
            con.connect();

            int responseCode = con.getResponseCode();
            System.out.println("Response Code : " + responseCode);

            if(responseCode !=200){
                out[0] = "error not 200";
            }else{
                //StringBuilder infoString = new StringBuilder();
                Scanner scanner = new Scanner(url.openStream());

                while(scanner.hasNext()){
                    infoString.append(scanner.nextLine());
                }
                scanner.close();
                System.out.println(infoString);
            }

            //Splitting the result string by commas
            String[] result = infoString.toString().split(",");

            //Outputting the lat and long as an array
            String longitude = result[7];
            String latitude = result[8];

            longitude = longitude.substring(longitude.lastIndexOf(":")+1);
            latitude = latitude.substring((latitude.lastIndexOf(":")+1));
            longLat.put("Longitude",longitude);
            longLat.put("Latitude",latitude);

            System.out.println(longLat);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return longLat;
    }

}
