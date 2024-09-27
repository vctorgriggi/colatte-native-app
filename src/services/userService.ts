import axios from "axios";

import { index } from "./index";

const serviceUrl = "/user";

export async function get() {
  try {
    const response = await index.get(serviceUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

export async function getById(id: string) {
  try {
    const response = await index.get(`${serviceUrl}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

export async function updateById(id: string, dto: FormData) {
  try {
    const response = await index.put(`${serviceUrl}/${id}`, dto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

export async function deleteImage(id: string) {
  try {
    const response = await index.delete(`${serviceUrl}/i/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}
