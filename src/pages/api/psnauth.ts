import * as psn from 'psn-api';
import env from "env-var";

interface AuthData {
  accessToken: string;
  refreshToken: string;
  expirationDate: string;
}

let authData: AuthData | null = null;

export async function getValidAccessToken(): Promise<string> {
  if (!authData || isTokenExpired()) {
    await refreshAuthData();
  }
  return authData!.accessToken;
}

async function refreshAuthData(): Promise<void> {
  const PSN_NPSSO_TOKEN = env.get('PSN_NPSSO_TOKEN').required().asString();

  if (!authData) {
    const accessCode = await psn.exchangeNpssoForCode(PSN_NPSSO_TOKEN);
    const authorization = await psn.exchangeCodeForAccessToken(accessCode);
    updateAuthData(authorization);
  } else {
    // Refresh using refresh token
    try {
      const updatedAuthorization = await psn.exchangeRefreshTokenForAuthTokens(authData.refreshToken);
      updateAuthData(updatedAuthorization);
    } catch (error) {
      // If refresh token is invalid, start over with NPSSO token
      console.error("Error refreshing token, starting over:", error);
      const accessCode = await psn.exchangeNpssoForCode(PSN_NPSSO_TOKEN);
      const authorization = await psn.exchangeCodeForAccessToken(accessCode);
      updateAuthData(authorization);
    }
  }
}

function updateAuthData(authorization: psn.AuthTokensResponse): void {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + authorization.expiresIn * 1000).toISOString();
  
  authData = {
    accessToken: authorization.accessToken,
    refreshToken: authorization.refreshToken,
    expirationDate: expirationDate,
  };
}

function isTokenExpired(): boolean {
  if (!authData) return true;
  const now = new Date();
  return new Date(authData.expirationDate).getTime() < now.getTime();
}
