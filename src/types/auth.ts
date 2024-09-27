export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Forgot {
  email: string;
}

export interface Reset {
  password: string;
  confirmPassword: string;
}
