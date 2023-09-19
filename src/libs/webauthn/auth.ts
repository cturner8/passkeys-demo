import type { UserCredential } from "@prisma/client";
import {
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
  type VerifyAuthenticationResponseOpts,
} from "@simplewebauthn/server";
import { relyingPartyId, relyingPartyUrl } from "./config";
import { mapCredentials } from "./helpers";

export const generateOptions = (userCredentials: UserCredential[]) =>
  generateAuthenticationOptions({
    // Require users to use a previously-registered authenticator
    allowCredentials: mapCredentials(userCredentials),
    userVerification: "preferred",
  });

export const verifyAuthentication = async (
  userCredential: UserCredential,
  response: VerifyAuthenticationResponseOpts["response"],
  expectedChallenge: string
) => {
  try {
    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge,
      expectedOrigin: relyingPartyUrl,
      expectedRPID: relyingPartyId,
      authenticator: {
        credentialPublicKey: Buffer.from(userCredential.key),
        credentialID: Buffer.from(userCredential.id),
        counter: userCredential.counter,
      },
    });
    return Promise.resolve(verification);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};
