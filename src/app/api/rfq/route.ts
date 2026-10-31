import { handleFormPost } from "@/lib/api";
import { rfqSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormPost("rfq", rfqSchema, request);
}
