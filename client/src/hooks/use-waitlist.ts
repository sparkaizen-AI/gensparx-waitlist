import { useMutation } from "@tanstack/react-query";
import { api, type InsertWaitlist } from "@shared/routes";
import { z } from "zod";

export function useJoinWaitlist() {
  return useMutation({
    mutationFn: async (data: InsertWaitlist) => {
      // Validate data before sending
      const validated = api.waitlist.create.input.parse(data);
      
      const res = await fetch(api.waitlist.create.path, {
        method: api.waitlist.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 409) {
          const error = api.waitlist.create.responses[409].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 400) {
          const error = api.waitlist.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to join waitlist. Please try again.");
      }

      return api.waitlist.create.responses[201].parse(await res.json());
    },
  });
}
