package br.com.projeto.condominio.utils;

import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class UtilsMail {

	public void enviarEmail(String assunto, String msgCorpoEmail, String destinatarios) {
		final String username = "control.syscondo@gmail.com";
		final String password = "C0ntrol&20";

		Properties props = new Properties();
		props.put("mail.transport.protocol", "smtp");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "465");
		props.put("mail.enable.ssl", true);
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.socketFactory.fallback", "false");

		Session session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		  });

		try {
			
			
			Address[] toUser = InternetAddress.parse(destinatarios);

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress( username ));
			message.setRecipients(Message.RecipientType.TO, toUser);
			message.setSubject(assunto);
			message.setText(msgCorpoEmail);

			Transport.send(message);

			System.out.println("Pronto!");

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	
	}
}