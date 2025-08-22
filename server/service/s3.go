package service

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
)

type S3Client struct {
	client *s3.Client
	bucket string
}

func NewS3Client() (*S3Client, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return nil, fmt.Errorf("failed to load AWS config: %w", err)
	}

	return &S3Client{
		client: s3.NewFromConfig(cfg),
		bucket: os.Getenv("AWS_S3_BUCKET"),
	}, nil

}

func (s *S3Client) GetPresignedURL(filename string, expiry time.Duration) (string, error) {
	psClient := s3.NewPresignClient(s.client)

	req, err := psClient.PresignPutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: &s.bucket,
		Key:    &filename,
		ACL:    types.ObjectCannedACLPublicRead,
	}, s3.WithPresignExpires(expiry))

	if err != nil {
		return "", fmt.Errorf("failed to generate presigned URL: %w", err)
	}

	return req.URL, nil
}
