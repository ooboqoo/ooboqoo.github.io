# 深入理解 Next.js

Vercel  /ˈvəsel/

## 常见问题

Before worrying about Next.js HMR, make sure you are not experiencing a _caching issue_. Next.js builds the local server in the .next folder and sometimes fails to update it properly. As a general solution, follow these steps:

Stop the local `dev` server
Delete the `.next` folder
Run the `dev` server again with `next dev`

If this is not enough to solve the problem or you need to repeat the above procedure, then chances are that you have a real HMR issue.


## 流式渲染和分块传输

en https://medium.com/@momendaoud/efficient-and-elegant-web-development-with-next-js-6087b3fd86e1  
zh https://zhangzidan.com/2023/12/31/efficient-and-elegant-web-development-with-next-js/  
sourcecode https://github.com/facebook/react/blob/b9be4537c2459f8fc0312b796570003620bc8600/packages/react-dom-bindings/src/server/fizz-instruction-set/ReactDOMFizzInstructionSetShared.js?ref=hackernoon.com#L46  


## Next.js Setup

https://dev.to/alexeagleson/how-to-build-scalable-architecture-for-your-nextjs-project-2pb7  2022

* How to build a fullstack Next.js app using API routes and [Tailwind CSS]()
* How to add a global state manager to your Next.js app with [Recoil]()
* How to implement unit and end-to-end testing in a Next.s app with [jest]() and [playwright]()
* How to create a CI/CD pipeline with [Github actions]() and [Vercel]()
* How to implement SSO authentication and internationalization in a Next.js app using [NextAuth]() and [i18next]()
* How to connect a database to your Next.js app with [Prisma]() and [Supabase]()
* How to manage multiple applications in a monorepo with Next.js and [Nx]()





