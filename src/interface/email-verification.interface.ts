export interface EmailVerification  {
  readonly userId: String,
  readonly uniqueString: String,
  readonly createdAt: number,
  readonly expiresAt: number
}
