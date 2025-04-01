export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS") || [
      "Ti+vJHia3sjsjF/b7rjCVqPONZ58Msmtp0S8A+tMXjk=",
      "4l9DQsR0Kf4896LGAI/X18QJJx7lvEWgLyI6gppshgw=",
    ],
  },
});
