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
        region: env("AWS_REGION"),
        params: {
          ACL: null, // <== set ACL to private
          // signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
          Bucket: env("AWS_BUCKET"),
        },
        resize: false, // Disable automatic resizing
      },
    },
  },
});
