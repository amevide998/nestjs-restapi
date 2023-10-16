export interface User  {
  readonly email: String,
  readonly hash: String,
  readonly createdAt: Date,
  readonly updatedAt: Date,
  readonly verified: Boolean
}
