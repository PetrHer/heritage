const { i18n } = require('./next-i18next.config')
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'bnjcklhtmxxsdvaqzmpj.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/herytage/**',
        },
      ],
    },
    i18n,
  }