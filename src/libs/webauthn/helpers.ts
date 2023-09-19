import type { UserCredential } from "@prisma/client";
import { type GenerateRegistrationOptionsOpts } from "@simplewebauthn/server";

export const mapCredentials = (
  userCredentials: UserCredential[]
): GenerateRegistrationOptionsOpts["excludeCredentials"] =>
  userCredentials.map((credential) => ({
    id: Buffer.from(credential.id),
    type: "public-key",
  }));
