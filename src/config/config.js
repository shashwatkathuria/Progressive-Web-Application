const path = require('path');

exports.module = {
  "database": {
    "MONGO_DB_URL": "mongodb://localhost:27017",
    "DB_NAME": "pwadb",
    "DB_URL": "mongodb://localhost:27017/pwadb"
  },
  "server": {
    "PORT": 8080,
    "SESSION_KEY": "secret key",
    "ENABLE_SERVICE_WORKER_CACHE": true,
    "STATIC_FILES_URL": path.resolve(__dirname, '..', '..', 'dist')
  },
  "notifications": {
    // For Google key go to the Google API Console, create a project,
    // enable the Google Cloud Messaging API and then create an API key under the credentials tab
    // https://console.developers.google.com/apis/dashboard
    "GCM_API_KEY": "AIzaSyD_Bzf2XgpSdLg2WyXfNh_WQDD6GjnKg9Y",
    "DOMAIN_MAIL_TO": "mailto:your-email-address@example-domain.com",
    // To generate public and private vapid key, execute the following command
    // As given in documentation
    // ./node_modules/.bin/web-push generate-vapid-keys
    "VAPID_PUBLIC_KEY": "BH3VmAle5zOvl12pKTCgpVzkPBbP7PJv6MZ8jeLqIDKhgDMqvze53UtMptVL_uQNDMkTCa-vz_t9EfJtEONBGqc",
    "VAPID_PRIVATE_KEY": "0PBYDHWtTgozenR7eA-5hbByQjzzIsN6vWx_vpcvnq4"
  }
}
