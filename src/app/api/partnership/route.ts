import { handleFormPost } from "@/lib/api";
import { distributorSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormPost("partnership", distributorSchema, request);
}
