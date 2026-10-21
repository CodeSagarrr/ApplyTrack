import * as Sentry from "@sentry/node";


Sentry.init({
  dsn: "https://c97c44316490d14d72b359847366ef05@o4512078373978112.ingest.us.sentry.io/4512078378303488",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});