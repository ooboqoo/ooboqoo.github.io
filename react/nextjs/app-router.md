# Next.js Using App Router

https://nextjs.org/docs/app/building-your-application/routing

Next.js V13 introduced a new **App Router** built on **React Server Components**, which supports shared layouts, nested routing, loading states, error handling, and more.

The `app` directory works alongside the `pages` directory to allow for *incremental adoption*.


## Getting Started

```bash
$ pnpm create next-app@latest

✔ What is your project named? … nextjs-app-demo
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? … No
```

Project Structure

```txt
public/      // Static assets to be served
app/         // App Router
  |- lib/
  |- ui/
  |- layout.tsx
  |- page.tsx
components/

next.config.js
middleware.ts    // Next.js request middleware
```

`app` Routing Conventions

Routing Files

```txt
|- layout.tsx        // Shared UI for a segment and its children
|- template.tsx      // Specialized re-rendered Layout UI
|- page.tsx          // Unique UI of a route and *make routes publicly accessible*

|- route.ts          // Server-side API endpoint

|- loading.tsx       // Loading UI for a segment and its children   (React suspense boundary)
|- not-found.tsx     // Not found UI for a segment and its children (React error boundary)
|- error.tsx         // Error UI for a segment and its children     (React error boundary)

|- global-error.tsx  // Global error UI
|- default.tsx       // Fallback UI for Parallel Routes
```

<img width="545" src="images/nextjs/nested-file-conventions-component-hierarchy.avif" />


Metadata File Conventions

```txt
App Icons
|- favicon.ico           // Favicon file
|- icon.svg              // App Icon file
|- apple-icon.png        // Apple App Icon file

Open Graph and Twitter Images
|- opengraph-image.png   // Open Graph image file
|- twitter-image.png     // Twitter image file

SEO
|- sitemap.xml           // Sitemap file
|- robots.txt            // Robots file
```


## Routing

```txt
Nested Routes
folder	Route segment
folder/folder	Nested route segment

Dynamic Routes
[folder]	Dynamic route segment
[...folder]	Catch-all route segment
[[...folder]]	Optional catch-all route segment

Route Groups and Private Folders
(folder)	Group routes without affecting routing
_folder	Opt folder and all child segments out of routing

Parallel and Intercepted Routes
@folder	Named slot
(.)folder	Intercept same level
(..)folder	Intercept one level above
(..)(..)folder	Intercept two levels above
(...)folder	Intercept from root
```

### Pages and Layouts

```tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
```

Passing data between a parent layout and its children is not possible. However, you can fetch the same data in a route more than once, and React will automatically dedupe the requests without affecting performance.

Layouts do not have access to the route segments below itself. To access all route segments, you can use useSelectedLayoutSegment or useSelectedLayoutSegments in a Client Component.

Metadata can be defined by exporting a `metadata` object or `generateMetadata` function in a `layout.js` or `page.js` file.

```tsx
import { Metadata } from 'next'
export const metadata: Metadata = { title: 'Next.js' }
export default function Page() {
  return '...'
}
```

### Linking and Navigating

There are four ways to navigate between routes in Next.js

* Using the `<Link>` Component
* Using the `useRouter` hook (Client Components)
* Using the `redirect` function (Server Components)
* Using the native History API

How Routing and Navigation Works

1. Code Splitting
2. Prefetching
3. Caching
4. Partial Rendering
5. Soft Navigation
6. Back and Forward Navigation
7. Routing between `pages/` and `app/`

### Loading UI and Streaming


### Error Handling


### Redirecting


### Project Organization


### Dynamic Routes


### Route Handlers


### Middleware


### Internationalization




## Data Fetching


