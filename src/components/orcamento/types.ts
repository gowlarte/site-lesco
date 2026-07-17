export interface FormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  // Step 2
  state: string;
  city: string;
  profile: string;
  // Step 3
  timeline: string;
  products: string[];
}

export const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  state: "",
  city: "",
  profile: "",
  timeline: "",
  products: [],
};
