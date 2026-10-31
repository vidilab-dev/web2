import { handleFormPost } from "@/lib/api";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormPost("contact", contactSchema, request);
}
