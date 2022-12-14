package com.upgrad.bookmyconsultation.service;

import com.upgrad.bookmyconsultation.entity.Appointment;
import com.upgrad.bookmyconsultation.entity.Doctor;
import com.upgrad.bookmyconsultation.entity.Rating;
import com.upgrad.bookmyconsultation.repository.AppointmentRepository;
import com.upgrad.bookmyconsultation.repository.DoctorRepository;
import com.upgrad.bookmyconsultation.repository.RatingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.UUID;
// import java.util.stream.Collectors;


@Service
public class RatingsService {

	// @Autowired
	// private ApplicationEventPublisher publisher;

	@Autowired
	private RatingsRepository ratingsRepository;

	@Autowired
	private DoctorRepository doctorRepository;

	public void submitRatings(Rating rating) {
		rating.setId(UUID.randomUUID().toString());
		ratingsRepository.save(rating);
		Doctor doctor = doctorRepository.findById(rating.getDoctorId()).get();
		Double currentRating = doctor.getRating();
		int numberOfRatings = ratingsRepository.findByDoctorId(rating.getDoctorId()).size();
		double finalRating = ((numberOfRatings * currentRating) + rating.getRating()) / (numberOfRatings);
		doctor.setRating(finalRating);
		doctorRepository.save(doctor);
	}
}