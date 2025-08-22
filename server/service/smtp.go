package service

import (
	"fmt"
	"net/smtp"
	"os"
)

type SMTPConfig struct {
	Host     string
	Port     string
	Username string
	Password string
	From     string
	To       string
}

type SMTPRequest struct {
	Author      string
	SenderEmail string
	Subject     string
	Body        string
}

func SendEmail(smtpRequest *SMTPRequest) error {

	smtpConfig := SMTPConfig{
		Host:     "smtp.gmail.com",
		Port:     "587",
		Username: "dog.lips.automatron@gmail.com",
		Password: os.Getenv("GMAIL_APP_PASSWORD"),
		From:     "dog.lips.automatron@gmail.com",
		To:       "ihatedoglips@gmail.com",
	}

	auth := smtp.PlainAuth("", smtpConfig.Username, smtpConfig.Password, smtpConfig.Host)

	message := "From: " + smtpConfig.From + "\r\n" +
		"To: " + smtpConfig.To + "\r\n" +
		"Subject: " + smtpRequest.Subject + "\r\n" +
		"MIME-version: 1.0;\r\nContent-Type: text/plain; charset=\"UTF-8\";\r\n\r\n" +
		fmt.Sprintf("DOGLIPS.NET CONTACT FORM REQUEST \n\nFrom: %s <%s>\n\n%s", smtpRequest.Author, smtpRequest.SenderEmail, smtpRequest.Body)

	address := fmt.Sprintf("%s:%s", smtpConfig.Host, smtpConfig.Port)
	return smtp.SendMail(address, auth, smtpConfig.From, []string{smtpConfig.To}, []byte(message))
}
