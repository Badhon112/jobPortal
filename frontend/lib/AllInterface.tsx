export interface SignUpInterface {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  role?: string;
}

export interface login {
  email?: string;
  password?: string;
  role?: string;
}

export interface UpdateInterface {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  skill?: string;
}
