require('dotenv').config()

module.exports = {
    type: process.env.TYPE,
    project_id: process.env.PROYECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENTE_EMAIL,
    client_id: process.env.CLIENTE_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN
  }