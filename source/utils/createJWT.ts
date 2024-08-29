import {createSign} from 'react-native-quick-crypto';

// Function to encode data in base64url format
const base64UrlEncode = (input: string) => {
  return Buffer.from(input, 'utf8') // Ensure 'utf8' encoding
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const getJWT = (payload: any, private_key: string) => {
  // JWT Header
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  // Encode Header and Payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  // Create the data to be signed (header and payload)
  const signatureBase = `${encodedHeader}.${encodedPayload}`;

  try {
    // Use Buffer correctly for signing
    const sign = createSign('RSA-SHA256');
    const _data = Buffer.from(signatureBase, 'utf8');
    sign.update(_data); // Correctly buffer the signature base
    sign.end();

    // Sign the JWT with the private key (in PEM format)
    const signature = sign.sign(
      {
        key: private_key,
        padding: 1, // Optional: specify padding if needed, e.g., RSA_PKCS1_PADDING
      },
      'base64',
    );

    // Convert the signature to base64url format
    const base64urlSignature = signature
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    // Construct the complete JWT
    const jwt = `${signatureBase}.${base64urlSignature}`;
    console.log('jwt:>>>', jwt);

    return jwt;
  } catch (error) {
    console.log('error:>>>', error);
  }
};

export default getJWT;
