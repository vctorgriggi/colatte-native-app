import axios from "axios";

import { index } from "./index";

const serviceUrl = "/product-image";

export async function create(productId: string, dto: FormData) {
  try {
    await index.post(`${serviceUrl}/p/${productId}`, dto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
