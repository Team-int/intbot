require('dotenv').config()

import Oauth from 'oauth-discord'

export default new Oauth({
  version: 'v8',
  client_id: '798709769929621506',
  client_secret: process.env.CLIENT_SECRET || '',
  redirect_uri: process.env.REDIRECT_URI || '',
})