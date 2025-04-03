export default ({ env }) => ({
  upload: {
    config: {
      baseUrl: env("IMAGE_HOSTNAME"),
      provider: "aws-s3",
      providerOptions: {
        credentials: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
        },
        s3Options: {
          region: env("AWS_REGION"),
          params: {
            ACL: null, // <== set ACL to private
            // signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
            Bucket: env("AWS_BUCKET"),
          },
        },
        resize: false,
      },
    },
  },
  email: {
    config: {
      provider: "strapi-provider-email-brevo",
      providerOptions: {
        apiKey: env("BREVO_SMTP_PASSWORD"),
      },
      settings: {
        defaultSenderEmail: "luke@closer.com",
        defaultSenderName: "Luke Closer",
        defaultReplyTo: "vlad.dumitrescu@proton.me",
      },
    },
  },
});
