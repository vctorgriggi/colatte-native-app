import axios from "axios";

import { SignIn, SignUp, Forgot, Reset } from "@/types";
import { index } from "./index";

const serviceUrl = "/auth";

/* sign in, sign up, sign out */
export async function signIn(dto: SignIn) {
  try {
    const response = await index.post(`${serviceUrl}/sign-in`, dto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

export async function signUp(dto: SignUp) {
  try {
    const response = await index.post(`${serviceUrl}/sign-up`, dto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

export async function signOut() {
  try {
    await index.post(`${serviceUrl}/sign-out`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

/* reset password */
export async function forgotPassword(dto: Forgot) {
  try {
    await index.post(`${serviceUrl}/forgot-password`, dto);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

export async function resetPassword(id: string, token: string, dto: Reset) {
  try {
    await index.post(`${serviceUrl}/reset-password/${id}/${token}`, dto);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

/* validate token */
export async function validateUserToken() {
  try {
    const response = await index.get(`${serviceUrl}/validate-user-token`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

export async function validateResetToken(id: string, token: string) {
  try {
    await index.get(`${serviceUrl}/validate-reset-token/${id}/${token}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}
