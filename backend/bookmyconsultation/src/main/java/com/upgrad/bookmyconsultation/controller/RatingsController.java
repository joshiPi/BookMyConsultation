package com.upgrad.bookmyconsultation.controller;

import com.upgrad.bookmyconsultation.entity.Rating;
import com.upgrad.bookmyconsultation.service.RatingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RatingsController {

	@Autowired
	private RatingsService ratingsService;

	@PostMapping(value = "/ratings")
	public ResponseEntity<String> submitRatings(@RequestBody Rating rating){
		ratingsService.submitRatings(rating);
		return ResponseEntity.status(HttpStatus.OK).body("rating submitted");
	}
	
}
