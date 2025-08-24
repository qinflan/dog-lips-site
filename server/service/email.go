package service

import (
	"fmt"
	"os"

	"github.com/resend/resend-go/v2"
)

type SendEmailRequest struct {
	Author      string
	SenderEmail string
	Subject     string
	Body        string
}

func SendEmail(smtpRequest *SendEmailRequest) error {

	apiKey := os.Getenv("RESEND_API_KEY")
	client := resend.NewClient(apiKey)

	params := &resend.SendEmailRequest{
		From:    "DOG LIPS AUTOMATRON <no-reply@doglips.net>",
		To:      []string{"ihatedoglips@gmail.com"},
		Subject: smtpRequest.Subject,
		Html: fmt.Sprintf(`
			<h2>DOGLIPS.NET CONTACT FORM REQUEST</h2>
			<p><b>From:</b> %s &lt;%s&gt;</p>
			<p><b>Message:</b></p>
			<p>%s</p>
		`, smtpRequest.Author, smtpRequest.SenderEmail, smtpRequest.Body),
	}

	_, err := client.Emails.Send(params)
	if err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	return nil

}
