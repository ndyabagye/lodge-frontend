import { api } from "@/lib/api-client";
import type { ContactUsData } from "@/types";

export const contactUsService = {
  // POST /api/v1/contact-us
  contactUs: async (data: ContactUsData): Promise<void> => {
    const response = await api.post("/contact-us", data);
    return response.data.data;
  },
};
