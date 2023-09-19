import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  type VerifyRegistrationResponseOpts,
} from "@simplewebauthn/server";

import type { User, UserCredential } from "@prisma/client";
import { relyingPartyId, relyingPartyName, relyingPartyUrl } from "./config";
import { mapCredentials } from "./helpers";

export const generateOptions = (
  user: User,
  userCredentials: UserCredential[]
) =>
  generateRegistrationOptions({
    rpName: relyingPartyName,
    rpID: relyingPartyId,
    userID: user.id,
    userName: user.email,
    // Don't prompt users for additional information about the authenticator
    // (Recommended for smoother UX)
    attestationType: "none",
    // Prevent users from re-registering existing authenticators
    excludeCredentials: mapCredentials(userCredentials),
  });

export const verifyRegistration = async (
  response: VerifyRegistrationResponseOpts["response"],
  expectedChallenge: string
) => {
  try {
    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge,
      expectedOrigin: relyingPartyUrl,
      expectedRPID: relyingPartyId,
    });
    return Promise.resolve(verification);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};
