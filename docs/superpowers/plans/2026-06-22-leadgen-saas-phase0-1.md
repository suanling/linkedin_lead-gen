# LeadGen SaaS — Phase 0 + 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a green-deploying Next.js skeleton (Phase 0), then add Clerk auth + multi-tenant Neon RLS so two users provably cannot see each other's data (Phase 1).

**Architecture:** Single Next.js (App Router) app on Vercel. Neon serverless Postgres via Drizzle ORM. Tenant isolation is enforced at the database by Neon RLS Authorize: Clerk issues a JWT, Neon reads `auth.user_id()` from it, and Drizzle `crudPolicy()` policies (declared beside the schema) restrict every row to its owner. The app uses TWO Drizzle clients — an *admin/owner* client (migrations, webhooks, system writes) and an *authenticated* client that passes the Clerk token so RLS applies.

**Tech Stack:** Next.js (App Router, TypeScript), `@neondatabase/serverless`, `drizzle-orm` + `drizzle-kit`, `@clerk/nextjs`, Vitest (unit/integration), Vercel (hosting + CI via GitHub Actions).

## Global Constraints

- New repo `leadgen-saas/`, created BESIDE the existing `va-workspace`, never inside it. Absolute parent: `/Users/lumsuanling/Library/Mobile Documents/com~apple~CloudDocs/Obsidian/`.
- Language: TypeScript, `strict: true`. App Router only (no `pages/`).
- ORM: Drizzle. Migrations via `drizzle-kit generate` + `drizzle-kit migrate` (NOT `push`) so migrations are versioned in git.
- RLS import path is `drizzle-orm/neon` for `crudPolicy`, `authenticatedRole`, `authUid`.
- Every tenant-scoped table carries a `user_id text` column holding the Clerk user id, and declares a `crudPolicy` keyed on `authUid(table.userId)`.
- Two DB clients only: `dbAdmin` (no token, bypasses RLS via owner role) and `dbAuth(token)` (passes Clerk token, RLS-enforced). Application/business reads go through `dbAuth`; only migrations/system go through `dbAdmin`.
- Secrets via env vars, never committed: `DATABASE_URL` (admin/owner conn), `DATABASE_AUTHENTICATED_URL` (authenticated-role conn), `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`. `.env.local` is gitignored; `.env.example` lists keys with empty values.
- Reference implementation to mirror when unsure: `github.com/neondatabase-labs/clerk-nextjs-neon-rls`.
- Node 20+. Package manager: npm.

---

### Task 1: Scaffold the Next.js app + green local build (Phase 0)

**Files:**
- Create: `leadgen-saas/` (whole app via create-next-app)
- Modify: `leadgen-saas/package.json` (scripts)
- Create: `leadgen-saas/.gitignore` (ensure `.env.local`, `.vercel`)

**Interfaces:**
- Consumes: nothing (greenfield).
- Produces: a buildable Next.js app at `leadgen-saas/` with `npm run build`, `npm run lint`, `npm run typecheck` scripts.

- [ ] **Step 1: Scaffold the app**

Run from the Obsidian parent dir (NOT inside va-workspace):
```bash
cd "/Users/lumsuanling/Library/Mobile Documents/com~apple~CloudDocs/Obsidian"
npx create-next-app@latest leadgen-saas --typescript --app --eslint --tailwind --src-dir=false --import-alias "@/*" --no-turbopack
```
Expected: a `leadgen-saas/` dir with `app/`, `package.json`, `tsconfig.json`.

- [ ] **Step 2: Add a typecheck script**

In `leadgen-saas/package.json`, add to `"scripts"`:
```json
"typecheck": "tsc --noEmit"
```

- [ ] **Step 3: Verify the app builds green**

Run:
```bash
cd "/Users/lumsuanling/Library/Mobile Documents/com~apple~CloudDocs/Obsidian/leadgen-saas"
npm run lint && npm run typecheck && npm run build
```
Expected: all three succeed; `next build` prints a route table with `/`.

- [ ] **Step 4: Init git + first commit**

```bash
cd "/Users/lumsuanling/Library/Mobile Documents/com~apple~CloudDocs/Obsidian/leadgen-saas"
git init
printf "\n.env.local\n.vercel\n" >> .gitignore
git add -A
git commit -m "chore: scaffold Next.js app (Phase 0)"
```

---

### Task 2: Wire Vitest so later tasks have a test runner

**Files:**
- Create: `leadgen-saas/vitest.config.ts`
- Create: `leadgen-saas/tests/smoke.test.ts`
- Modify: `leadgen-saas/package.json` (test script + devDeps)

**Interfaces:**
- Consumes: the scaffolded app from Task 1.
- Produces: `npm test` runs Vitest; a passing smoke test proving the harness works.

- [ ] **Step 1: Install Vitest**

```bash
cd "/Users/lumsuanling/Library/Mobile Documents/com~apple~CloudDocs/Obsidian/leadgen-saas"
npm install -D vitest
```

- [ ] **Step 2: Write the failing smoke test**

Create `tests/smoke.test.ts`:
```typescript
import { describe, it, expect } from "vitest";

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 3: Add config + script**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
```
Add to `package.json` `"scripts"`: `"test": "vitest run"`.

- [ ] **Step 4: Run the test, expect PASS**

```bash
npm test
```
Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "test: add Vitest harness with smoke test"
```

---

### Task 3: Connect Neon + Drizzle with a health_check table (Phase 0 DB)

**Files:**
- Create: `leadgen-saas/src/db/index.ts` (admin client)
- Create: `leadgen-saas/src/db/schema/health.ts`
- Create: `leadgen-saas/drizzle.config.ts`
- Create: `leadgen-saas/.env.example`
- Modify: `leadgen-saas/package.json` (drizzle scripts + deps)

**Interfaces:**
- Consumes: Task 1 app.
- Produces:
  - `dbAdmin` — a Drizzle client over `@neondatabase/serverless` using `DATABASE_URL` (owner role, bypasses RLS).
  - `healthCheck` table: `{ id: serial PK, note: text, createdAt: timestamp default now() }`.
  - npm scripts `db:generate`, `db:migrate`.

- [ ] **Step 1: Install deps**

```bash
cd "/Users/lumsuanling/Library/Mobile Documents/com~apple~CloudDocs/Obsidian/leadgen-saas"
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit dotenv
```

- [ ] **Step 2: Create the Neon project + get connection strings**

In the Neon console (neon.tech): create a project, then on the project's "Connect" panel copy the pooled connection string. Put it in `.env.local`:
```
DATABASE_URL=postgresql://...   # owner role (for migrations + admin client)
```
(The authenticated URL is added in Task 6.) Create `.env.example`:
```
DATABASE_URL=
DATABASE_AUTHENTICATED_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

- [ ] **Step 3: Define the health schema**

Create `src/db/schema/health.ts`:
```typescript
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const healthCheck = pgTable("health_check", {
  id: serial("id").primaryKey(),
  note: text("note").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

- [ ] **Step 4: Create the admin Drizzle client**

Create `src/db/index.ts`:
```typescript
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as health from "./schema/health";

const schema = { ...health };

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}

// Admin client: owner role, bypasses RLS. Use for migrations + system writes only.
export const dbAdmin = drizzle(neon(required("DATABASE_URL")), { schema });
export { schema };
```

- [ ] **Step 5: Create drizzle.config.ts**

Create `drizzle.config.ts`:
```typescript
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
```
Add to `package.json` `"scripts"`:
```json
"db:generate": "drizzle-kit generate",
"db:migrate": "dotenv -e .env.local -- drizzle-kit migrate"
```

- [ ] **Step 6: Generate + run the migration**

```bash
npm run db:generate
npm run db:migrate
```
Expected: a SQL file appears under `drizzle/`; migrate reports the `health_check` table created. Verify in the Neon console that `health_check` exists.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add Neon+Drizzle admin client and health_check table"
```

---

### Task 4: Render landing + prove a DB read in a server component (Phase 0 "done")

**Files:**
- Modify: `leadgen-saas/app/page.tsx`
- Create: `leadgen-saas/tests/health.test.ts`

**Interfaces:**
- Consumes: `dbAdmin`, `healthCheck` from Task 3.
- Produces: a homepage that selects from `health_check` server-side and renders the row count, proving the end-to-end DB path.

- [ ] **Step 1: Write the failing integration test**

Create `tests/health.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { dbAdmin } from "@/src/db";
import { healthCheck } from "@/src/db/schema/health";

describe("health_check DB path", () => {
  it("inserts and reads back a row", async () => {
    await dbAdmin.insert(healthCheck).values({ note: "phase0-smoke" });
    const rows = await dbAdmin.select().from(healthCheck);
    expect(rows.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run it, expect PASS against real Neon**

```bash
dotenv -e .env.local -- npx vitest run tests/health.test.ts
```
Expected: PASS (requires `.env.local` with `DATABASE_URL`). If it fails on env, prefix with the dotenv loader as shown.

- [ ] **Step 3: Render the count on the homepage**

Replace `app/page.tsx` with:
```tsx
import { dbAdmin } from "@/src/db";
import { healthCheck } from "@/src/db/schema/health";

export default async function Home() {
  const rows = await dbAdmin.select().from(healthCheck);
  return (
    <main style={{ padding: 32 }}>
      <h1>LeadGen SaaS</h1>
      <p>health_check rows: {rows.length}</p>
    </main>
  );
}
```

- [ ] **Step 4: Verify build + dev render**

```bash
npm run build
```
Expected: build green. (Local `npm run dev` should show the count; the page reads the DB at request time.)

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: homepage proves end-to-end DB read (Phase 0 done)"
```

---

### Task 5: CI workflow + Vercel deploy (Phase 0 deploy gate)

**Files:**
- Create: `leadgen-saas/.github/workflows/ci.yml`

**Interfaces:**
- Consumes: the `lint`, `typecheck`, `build` scripts.
- Produces: a green CI run on push; a live Vercel staging URL.

- [ ] **Step 1: Write the CI workflow**

Create `.github/workflows/ci.yml`:
```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${{ secrets.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY }}
          CLERK_SECRET_KEY: ${{ secrets.CLERK_SECRET_KEY }}
```

- [ ] **Step 2: Push to GitHub**

Create the repo on GitHub (via `gh repo create leadgen-saas --private --source . --push` or the web UI), then push `main`. Add the repo secrets (`DATABASE_URL`, Clerk keys) under Settings → Secrets → Actions.

- [ ] **Step 3: Connect Vercel**

Import the GitHub repo in Vercel. Add the same env vars in Vercel project settings. Trigger a deploy.
Expected: Vercel build goes green; the staging URL loads the homepage showing the health_check count. **This is Phase 0 "done": pipeline proven before any feature.**

- [ ] **Step 4: Commit (workflow file)**

```bash
git add -A && git commit -m "ci: add build workflow; connect Vercel staging"
```

---

### Task 6: Add Clerk auth + sign-in/up routes (Phase 1 auth)

**Files:**
- Create: `leadgen-saas/middleware.ts`
- Modify: `leadgen-saas/app/layout.tsx` (wrap in `<ClerkProvider>`)
- Create: `leadgen-saas/app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- Create: `leadgen-saas/app/(auth)/sign-up/[[...sign-up]]/page.tsx`
- Modify: `leadgen-saas/package.json` (add `@clerk/nextjs`)

**Interfaces:**
- Consumes: the app from Task 1.
- Produces: working Clerk sign-in/up at `/sign-in` and `/sign-up`; `auth()` available server-side from `@clerk/nextjs/server`.

- [ ] **Step 1: Install Clerk + set env**

```bash
npm install @clerk/nextjs
```
Add to `.env.local` the keys from the Clerk dashboard:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

- [ ] **Step 2: Add middleware**

Create `middleware.ts`:
```typescript
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/"],
};
```

- [ ] **Step 3: Wrap the root layout**

In `app/layout.tsx`, wrap the `<html>` tree:
```tsx
import { ClerkProvider } from "@clerk/nextjs";
// ...existing imports

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

- [ ] **Step 4: Add sign-in / sign-up pages**

Create `app/(auth)/sign-in/[[...sign-in]]/page.tsx`:
```tsx
import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return <SignIn />;
}
```
Create `app/(auth)/sign-up/[[...sign-up]]/page.tsx`:
```tsx
import { SignUp } from "@clerk/nextjs";
export default function Page() {
  return <SignUp />;
}
```

- [ ] **Step 5: Verify build + routes render**

```bash
npm run build
```
Expected: build green; route table includes `/sign-in/[[...sign-in]]` and `/sign-up/[[...sign-up]]`. Run `npm run dev` and confirm `/sign-in` renders the Clerk widget.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add Clerk auth + sign-in/up routes (Phase 1)"
```

---

### Task 7: Configure Clerk↔Neon JWT + the authenticated DB client (Phase 1 RLS plumbing)

**Files:**
- Create: `leadgen-saas/src/db/rls.ts`
- Create: `leadgen-saas/src/db/auth-helpers.ts`

**Interfaces:**
- Consumes: `schema` from `src/db/index.ts`.
- Produces:
  - `authenticatedRole`, `authUid` re-exported for schema files.
  - `dbAuth(): Promise<DrizzleClient>` — a Drizzle client bound to the current request's Clerk token, so Neon evaluates `auth.user_id()` from the JWT and RLS applies.

- [ ] **Step 1: Wire Clerk as a JWT provider in Neon**

In the Neon console → project → "RLS" / "Authorize" → Add Authentication Provider → choose Clerk, paste the Clerk JWKS URL (from Clerk dashboard → API Keys → JWT public key / Frontend API URL → `<frontend-api>/.well-known/jwks.json`). Neon creates the `authenticated` role and the `auth.user_id()` SQL function bound to the JWT `sub`. Copy the **authenticated** connection string into `.env.local`:
```
DATABASE_AUTHENTICATED_URL=postgresql://...   # authenticated role
```

- [ ] **Step 2: Re-export RLS helpers**

Create `src/db/auth-helpers.ts`:
```typescript
// Central re-export so schema files import RLS helpers from one place.
export { crudPolicy, authenticatedRole, authUid } from "drizzle-orm/neon";
```

- [ ] **Step 3: Create the authenticated client**

Create `src/db/rls.ts`:
```typescript
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "./index";

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}

// Authenticated client: passes the Clerk token so Neon RLS sees auth.user_id().
// Use this for ALL business reads/writes. Throws if the request is unauthenticated.
export async function dbAuth() {
  const { getToken, userId } = await auth();
  if (!userId) throw new Error("dbAuth called without an authenticated user");
  const token = await getToken();
  const sql = neon(required("DATABASE_AUTHENTICATED_URL"), {
    authToken: token ?? undefined,
  });
  return drizzle(sql, { schema });
}
```

- [ ] **Step 4: Typecheck**

```bash
npm run typecheck
```
Expected: passes (no usage yet, just the modules compile).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Clerk JWT provider + authenticated RLS Drizzle client"
```

---

### Task 8: WorkspaceConfig table with RLS + provision-on-first-sign-in (Phase 1 tenancy)

**Files:**
- Create: `leadgen-saas/src/db/schema/workspace.ts`
- Create: `leadgen-saas/app/actions/workspace.ts`
- Modify: `leadgen-saas/src/db/index.ts` (register workspace schema)

**Interfaces:**
- Consumes: `dbAuth` (Task 7), `dbAdmin` (Task 3), `crudPolicy`/`authenticatedRole`/`authUid` (Task 7).
- Produces:
  - `workspaceConfig` table: `{ userId text PK, onboardingComplete boolean default false, gatesJson jsonb, createdAt, updatedAt }` with an RLS `crudPolicy` so a row is visible/mutable only by its owner.
  - `ensureWorkspace(): Promise<void>` — idempotent; inserts the caller's `workspaceConfig` row if absent.

- [ ] **Step 1: Define the schema with RLS**

Create `src/db/schema/workspace.ts`:
```typescript
import { pgTable, text, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { crudPolicy, authenticatedRole, authUid } from "../auth-helpers";

export const workspaceConfig = pgTable(
  "workspace_config",
  {
    userId: text("user_id").primaryKey(), // Clerk user id
    onboardingComplete: boolean("onboarding_complete").default(false).notNull(),
    gatesJson: jsonb("gates_json"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    crudPolicy({
      role: authenticatedRole,
      read: authUid(t.userId),
      modify: authUid(t.userId),
    }),
  ]
);
```

- [ ] **Step 2: Register the schema**

In `src/db/index.ts`, add the import and spread:
```typescript
import * as workspace from "./schema/workspace";
const schema = { ...health, ...workspace };
```

- [ ] **Step 3: Generate + migrate (RLS policy lands in SQL)**

```bash
npm run db:generate
npm run db:migrate
```
Expected: the generated SQL contains `ALTER TABLE "workspace_config" ENABLE ROW LEVEL SECURITY` and a policy referencing `auth.user_id()`. Confirm in Neon.

- [ ] **Step 4: Write the provisioning action**

Create `app/actions/workspace.ts`:
```typescript
"use server";

import { auth } from "@clerk/nextjs/server";
import { dbAuth } from "@/src/db/rls";
import { workspaceConfig } from "@/src/db/schema/workspace";

// Idempotent: creates the caller's workspace row if it doesn't exist.
export async function ensureWorkspace(): Promise<void> {
  const { userId } = await auth();
  if (!userId) return;
  const db = await dbAuth();
  await db
    .insert(workspaceConfig)
    .values({ userId })
    .onConflictDoNothing({ target: workspaceConfig.userId });
}
```

- [ ] **Step 5: Typecheck + build**

```bash
npm run typecheck && npm run build
```
Expected: green.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: WorkspaceConfig table with RLS + ensureWorkspace provisioning"
```

---

### Task 9: Gated layout enforcing auth + provisioning (Phase 1 lock stage 1)

**Files:**
- Create: `leadgen-saas/app/(gated)/layout.tsx`
- Create: `leadgen-saas/app/(gated)/dashboard/page.tsx`

**Interfaces:**
- Consumes: `auth()` from Clerk, `ensureWorkspace` (Task 8).
- Produces: every route under `(gated)` redirects anonymous users to `/sign-in` and provisions their workspace on entry. A stub dashboard proves the gate.

- [ ] **Step 1: Write the gated layout**

Create `app/(gated)/layout.tsx`:
```tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureWorkspace } from "@/app/actions/workspace";

export default async function GatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  await ensureWorkspace(); // stage 2 (paid) + stage 3 (onboarded) added in later phases
  return <>{children}</>;
}
```

- [ ] **Step 2: Add a stub dashboard**

Create `app/(gated)/dashboard/page.tsx`:
```tsx
export default function Dashboard() {
  return (
    <main style={{ padding: 32 }}>
      <h1>Dashboard</h1>
      <p>You are signed in and your workspace exists.</p>
    </main>
  );
}
```

- [ ] **Step 3: Build + manual verify**

```bash
npm run build
```
Expected: green; route table includes `/dashboard`. Run `npm run dev`: visiting `/dashboard` while signed out redirects to `/sign-in`; after signing in, the dashboard renders and a `workspace_config` row exists in Neon for that user.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: gated layout enforces auth + provisions workspace (lock stage 1)"
```

---

### Task 10: Prove tenant isolation — the two-user RLS test (Phase 1 "done")

**Files:**
- Create: `leadgen-saas/tests/rls-isolation.test.ts`
- Create: `leadgen-saas/tests/helpers/rls-client.ts`

**Interfaces:**
- Consumes: `DATABASE_AUTHENTICATED_URL`, the `workspace_config` schema + policy.
- Produces: an automated test proving that a client authenticated as user A cannot read user B's row, even with an unfiltered `SELECT *`.

- [ ] **Step 1: Write a test-only authenticated-client helper**

Because tests run outside a Clerk request, build the authenticated client directly from a token string. Create `tests/helpers/rls-client.ts`:
```typescript
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "@/src/db";

// Builds an RLS-bound client for an arbitrary JWT (test harness only).
export function dbAsToken(jwt: string) {
  const sql = neon(process.env.DATABASE_AUTHENTICATED_URL!, { authToken: jwt });
  return drizzle(sql, { schema });
}
```

- [ ] **Step 2: Write the failing isolation test**

Create `tests/rls-isolation.test.ts`. It seeds two rows via the admin client, then reads via two per-user authenticated clients and asserts each sees only its own. The JWTs must be Clerk-issued test tokens whose `sub` equals the seeded `userId` (generate via Clerk's testing tokens / a long-lived test JWT, stored in env as `TEST_JWT_A` / `TEST_JWT_B` with matching `TEST_USER_A` / `TEST_USER_B`):
```typescript
import { describe, it, expect, beforeAll } from "vitest";
import { dbAdmin } from "@/src/db";
import { workspaceConfig } from "@/src/db/schema/workspace";
import { dbAsToken } from "./helpers/rls-client";

const A = process.env.TEST_USER_A!;
const B = process.env.TEST_USER_B!;

beforeAll(async () => {
  await dbAdmin.insert(workspaceConfig).values({ userId: A }).onConflictDoNothing();
  await dbAdmin.insert(workspaceConfig).values({ userId: B }).onConflictDoNothing();
});

describe("RLS tenant isolation", () => {
  it("user A sees only their own row on an unfiltered select", async () => {
    const db = dbAsToken(process.env.TEST_JWT_A!);
    const rows = await db.select().from(workspaceConfig); // intentionally NO where clause
    expect(rows.every((r) => r.userId === A)).toBe(true);
    expect(rows.some((r) => r.userId === B)).toBe(false);
  });

  it("user B cannot read user A's row", async () => {
    const db = dbAsToken(process.env.TEST_JWT_B!);
    const rows = await db.select().from(workspaceConfig);
    expect(rows.some((r) => r.userId === A)).toBe(false);
  });
});
```

- [ ] **Step 3: Run it, expect PASS**

```bash
dotenv -e .env.local -- npx vitest run tests/rls-isolation.test.ts
```
Expected: both tests PASS — the unfiltered select returns only the caller's row, proving Neon RLS (not app code) is the backstop. If the test FAILS by returning both rows, RLS is misconfigured (check: policy generated in migration, `authToken` actually passed, Clerk JWT provider registered in Neon, `sub` matches `userId`).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "test: prove RLS tenant isolation with two-user unfiltered select (Phase 1 done)"
```

---

## Self-Review

**Spec coverage (Phase 0 + 1 portions of the approved spec):**
- Green-deploying skeleton, CI, Vercel staging → Tasks 1, 2, 4, 5. ✓
- Neon + Drizzle + `health_check` + migration → Task 3. ✓
- DB read proven in a server component → Task 4. ✓
- Clerk auth, sign-in/up render → Task 6. ✓
- Neon RLS Authorize + Clerk JWT + `crudPolicy()` + authenticated client → Tasks 7, 8. ✓
- `user_id` on every tenant table + `ensureWorkspace()` provisioning → Task 8. ✓
- `(gated)/layout.tsx` redirects anonymous users (lock stage 1; stages 2–3 explicitly deferred to Phases 2–3) → Task 9. ✓
- Two-user isolation test incl. intentionally-unfiltered query → Task 10. ✓
- Two clients only (`dbAdmin`, `dbAuth`) constraint honored throughout. ✓

**Placeholder scan:** No TBD/TODO; every code step shows full code; commands have expected output. The only externally-sourced values that cannot be inlined are account-specific secrets (Neon connection strings, Clerk keys/JWKS, Clerk test JWTs) — these are env vars by design and the steps say exactly where to get each.

**Type consistency:** `dbAdmin` (Task 3) and `dbAuth` (Task 7) used consistently; `schema` exported from `src/db/index.ts` and consumed in `rls.ts` + test helper; `workspaceConfig.userId` is the join key across schema, action, layout, and test; `ensureWorkspace()` signature matches its call site in the gated layout.

**Scope:** Phase 0 + 1 only, as agreed. Phases 2–8 (pay gate, onboarding, qa-gate/metering, content, engagement, funnel, learning) are out of scope for this plan and will be planned per-phase as reached.
