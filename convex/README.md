
# Convex Functions Directory

This folder contains all backend logic for the Ticketr app, implemented using [Convex](https://convex.dev/). Each file defines queries, mutations, or actions that power the app's real-time features, authentication, event management, ticketing, and more.

## Structure

- **auth.ts, auth.config.ts**: Authentication logic and configuration for user authentication (google and github OAuth), and session management.
- **constant.ts**: Shared constants used across Convex functions.
- **events.ts**: Functions for creating, updating, and querying events.
- **http.ts**: HTTP endpoint handlers for webhooks or external integrations.
- **schema.ts**: Convex data model schema definitions.
- **storage.ts**: File and asset storage logic.
- **tickets.ts**: Ticket creation, purchase, refund, and management logic.
- **users.ts**: User profile and account management functions.
- **waitingList.ts**: Logic for managing event waiting lists and queues.
- **_generated/**: Auto-generated Convex API and type files (do not edit manually).

## Usage

1. **Edit or add functions** in this directory to implement backend logic for your app.
2. **Push changes** to your Convex deployment using the Convex CLI:
   ```bash
   npx convex push
   ```
3. **Call functions** from your frontend using the generated API in `convex/_generated/api.js`.

## Example

To create a new query or mutation, follow the Convex docs:

```ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getEvent = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.eventId);
  },
});
```

## Resources

- [Convex Documentation](https://docs.convex.dev/)
- [Ticketr Frontend Code](../app/)

---
**Note:** Do not edit files in `_generated/` directly. They are regenerated automatically.
