# Next.js


https://nextjs.org/


## What's in Next.js

All the tools you need to *make the web faster*.

* Built-in Optimizations - Automatic Image, Font, and Script Optimizations for improved UX and Core Web Vitals.
* Data Fetching - Make your React component async and await your data. Next.js supports both server and client data fetching.
* Node.js & Edge Runtimes
* Advanced Routing & Nested Layouts - Create routes using the file system, including support for more advanced routing patterns and UI layouts.
* Dynamic HTML Streaming
* CSS Support
* Route Handlers - Build API endpoints to securely connect with third party services and consume from your frontend.
* Middleware
* React Server Components
* Client and Server Rendering


Built on a foundation of fast, production-grade tooling: *React + Turbopack + SWC*

* React
* Turbopack - An incremental bundler optimized for JavaScript and TypeScript, written in Rust 
* SWC (Speedy Web Compiler) - An extensible Rust based platform for the next generation of fast developer tools, and can be used for both compilation and minification.


## V13.4 App Router

https://nextjs.org/blog/next-13-4

App Router (Stable):
* React Server Components
* Nested Routes & Layouts
* Simplified Data Fetching
* Streaming & Suspense
* Built-in SEO Support





## Starter

https://nextjs.org/learn/dashboard-app

* https://zod.dev/ TypeScript-first schema validation with static type inference
* https://authjs.dev/ 


### Getting Started

#### Creating a new project

```bash
$ npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"
```

#### Exploring the project

```txt
app/        // Contains all the routes, components, and logic for your application.
  |- lib/   // Contains functions used in your app, such as reusable utility functions and data fetching functions.
  |- ui/    // Contains all the UI components for your application, such as cards, tables, and forms.
public/
scripts/
```

#### Placeholder data

* Use placeholder data in JSON format or as JavaScript objects.
* Use a 3rd party service like mockAPI.

#### TypeScript

For now, `/app/lib/definitions.ts` file manually define the types that will be returned from the database. But for better type-safety, we recommend [Prisma](), which automatically generates types based on your database schema.


### 2 CSS Styling

Tailwind and CSS modules are the two most common ways of styling Next.js applications.

#### Global

`/app/ui/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`app/layout.tsx`

```tsx
import '@/app/ui/global.css';
```

#### Tailwind

Although the CSS styles are shared globally, each class is singularly applied to each element. This means if you add or delete an element, you don't have to worry about maintaining separate stylesheets, style collisions, or the size of your CSS bundle growing as your application scales.

#### CSS Modules

`/app/ui/home.module.css`

```css
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

`/app/page.tsx`

```tsx
import styles from '@/app/ui/home.module.css';

<div className={styles.shape}></div>;
```

#### Using the `clsx` library to toggle class names

[clsx](https://www.npmjs.com/package/clsx) is a library that lets you toggle class names easily.

```tsx
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

Other styling solutions
* Sass which allows you to import .css and .scss files.
* CSS-in-JS libraries such as [styled-jsx](), [styled-components](), and [emotion]().

### 3 Optimizing Fonts and Images

Next.js automatically optimizes fonts in the application when you use the `next/font` module. It downloads font files at build time and hosts them with your other static assets.

/app/ui/fonts.ts

```ts
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
```

/app/layout.tsx

```tsx
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
```

```tsx
import Image from 'next/image';
 
export default function Page() {
  return (
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
  );
}
```

### 4 Creating Layouts and Pages

* file-system routing - folders are used to create nested routes
  - You can create separate UIs for each route using `layout.tsx` and `page.tsx` files.
* nested layout - can be shared between multiple pages

This is how you can create different pages in Next.js: create a new route segment using a *folder*, and add a *page file* inside it.

`/app/dashboard/page.tsx`

```tsx
export default function Page() {
  return <p>Dashboard Page</p>;
}
```

By having a special name for page files (即目录下必须要有 `page.tsx` 才会变成有效路由), *Next.js allows you to colocate UI components, test files, and other related code with your routes*.

#### Layout

In Next.js, you can use a special layout.tsx file to create UI that is shared between multiple pages.

`/app/dashboard/layout.tsx`

```tsx
import SideNav from '@/app/ui/dashboard/sidenav';

// `children` 可以是页面内容 或 子layout
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
```

The `<Layout />` component receives a children prop. *This child can either be a page or another layout*.

One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called **partial rendering**.

### 5 Navigating Between Pages

`Link` allows you to do client-side navigation with JavaScript.

You should now be able to navigate between the pages without seeing a full refresh. Although *parts of your application are rendered on the server*, there's no full page refresh, making it *feel like a web app*.

Automatic code-splitting and prefetching

To improve the navigation experience, Next.js automatically code splits your application by route segments. This is different from a traditional React SPA, where the browser loads all your application code on initial load.

*Splitting code by routes* means that pages become isolated. If a certain page throws an error, the rest of the application will still work.

Futhermore, in production, whenever `<Link>` components appear in the browser's viewport, *Next.js automatically prefetches the code for the linked route in the background*.


/app/ui/dashboard/nav-links.tsx

```tsx
'use client';  // 必须加这个才能用下面的 usePathname，但是发现这个组件在服务端也能渲染，具体待深入

import { usePathname } from 'next/navigation';

export default function NavLinks() {
	const pathname = usePathname();
	// ...
}
```

### 6 Setting Up Your Database

https://nextjs.org/learn/dashboard-app/setting-up-your-database


### 7 Fetching Data

Let's discuss the different ways you can fetch data from your database, including using APIs, SQL, and alternatives.

* Learn about some approaches to fetching data: APIs, ORMs, SQL, etc.

* How Server Components can help you access back-end resources more securely.

* What network waterfalls are.

* How to implement parallel data fetching using a JavaScript Pattern.

For relational databases like Postgres, you can do this with SQL, or an ORM like Prisma.

### 8 Static and Dynamic Rendering

* What static rendering is and how it can improve your application's performance.

Static rendering is useful for UI with no data or data that is shared across users, such as a static blog post or a product page. It might not be a good fit for a dashboard that has personalized data that is regularly updated.

The opposite of static rendering is dynamic rendering.

* What dynamic rendering is and when to use it.

* Different approaches to make your dashboard dynamic.

```ts
import { unstable_noStore as noStore } from 'next/cache';
 
export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
 
  // ...
}
```

* Simulate a slow data fetch to see what happens. 只要有一个接口慢，服务端会等待这个接口返回之后才一次性返回整个页面。

### 9 Streaming

* What streaming is and when you might use it.

Streaming works well with React's component model, as each component can be considered a *chunk*.

* How to implement streaming with `loading.tsx` and `Suspense`.

* What loading skeletons are.

* What route groups are, and when you might use them.

* Where to place `Suspense` boundaries in your application.

### 10 Partial Prerendering (Optional)

When a user visits a route:

* A static route shell is served, this makes the initial load fast.
* The shell leaves holes where dynamic content will load in async.
* The async holes are loaded in parallel, reducing the overall load time of the page.

This is different from how your application behaves today, where *entire routes are either fully static or dynamic*.

The fallback is embedded into the initial static file along with other static content. At build time (or during revalidation), the static parts of the route are prerendered, and the rest is postponed until the user requests the route.

It's worth noting that wrapping a component in Suspense doesn't make the component itself dynamic (remember you used `unstable_noStore` to achieve this behavior), but rather *Suspense is used as a boundary between the static and dynamic parts of your route*.

The great thing about Partial Prerendering is that you don't need to change your code to use it. As long as you're using `Suspense` to wrap the dynamic parts of your route, Next.js will know which parts of your route are static and which are dynamic.


### 11 Adding Search and Pagination

These are the Next.js client hooks that you'll use to implement the search functionality:

* `useSearchParams`- Allows you to access the parameters of the current URL. For example, the search params for this URL `/dashboard/invoices?page=1&query=pending` would look like this: `{page: '1', query: 'pending'}`.
* `usePathname` - Lets you read the current URL's pathname. For example, for the route /dashboard/invoices, usePathname would return `'/dashboard/invoices'`.
* `useRouter` - Enables navigation between routes within client components programmatically. There are multiple methods you can use.

```tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
  );
}
 ```

### 12 Mutating Data

* What React Server Actions are and how to use them to mutate data.

An advantage of invoking a Server Action within a Server Component is *progressive enhancement* - forms work even if JavaScript is disabled on the client.

```tsx
// Server Component
export default function Page() {
  // Action
  async function create(formData: FormData) {
    'use server';
 
    // Logic to mutate data...
  }
 
  // Invoke the action using the "action" attribute
  return <form action={create}>...</form>;
}
```

* How to work with forms and Server Components.

* Best practices for working with the native `formData` object, including type validation.

* How to revalidate the client cache using the `revalidatePath` API.

* How to create dynamic route segments with specific IDs.

* How to use the React’s `useFormStatus` hook for optimistic updates.


### 13 Handling Errors


### 14 Improving Accessibility

You'll learn about server-side form validation and improving accessibility.

### 15 Adding Authentication


### 16 Adding Metadata










