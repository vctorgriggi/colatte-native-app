import axios from "axios";

import { Product } from "@/types";
import { index } from "./index";

const serviceUrl = "/product";

export async function create(dto: Partial<Product>) {
  try {
    await index.post(serviceUrl, dto);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

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

export async function updateById(id: string, dto: Partial<Product>) {
  try {
    const response = await index.put(`${serviceUrl}/${id}`, dto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}

export async function deleteById(id: string) {
  try {
    await index.delete(`${serviceUrl}/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
}
