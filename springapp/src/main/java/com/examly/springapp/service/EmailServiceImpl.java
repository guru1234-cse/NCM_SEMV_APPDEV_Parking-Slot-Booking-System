package com.examly.springapp.service;

import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@example.com}")
    private String fromEmail;

    @Override
    public void sendEmail(String to, String subject, String body) {

        if (mailSender == null) {
            System.out.println("Mail sender not configured. Skipping email to: " + to);
            return;
        }

        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, false);

            mailSender.send(message);

            System.out.println("Email sent successfully to: " + to);

        } catch (Exception e) {

            System.out.println("Email sending failed.");
            e.printStackTrace();

        }

    }
}