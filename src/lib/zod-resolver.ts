// Zod resolver stub for react-hook-form
import type { ZodSchema } from "zod";

export function zodResolver(schema: ZodSchema) {
  return async (values: any) => {
    try {
      await schema.parseAsync(values);
      return { values, errors: {} };
    } catch (error: any) {
      const errors: Record<string, any> = {};
      if (error.issues) {
        for (const issue of error.issues) {
          const path = issue.path.join(".");
          errors[path] = { message: issue.message };
        }
      }
      return { values: {}, errors };
    }
  };
}
