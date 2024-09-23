# Popsa.com - React Frontend test skeleton

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the packages with yarn:

```bash
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

Feel free to modify the source code in anyway that you see fit.

---

## Decision Log

This section will document the step by step process of building this feature It will also serve as a record for decisions made.

### Step 1 - Add TypeScript

#### What?

Switch from js to tsx and add packages to support using typscript to build this application.

#### Why?

TypeScript is a superset of JavaScript that adds optional static typing and other features to improve the development experience. _TypeScript will help catch errors early and improve code maintainability._

### Step 2 - Choose package to facilitate drag and drop funcitonality

#### What?

Pragmatic Drag & Drop - <https://github.com/atlassian/pragmatic-drag-and-drop?tab=readme-ov-file>

#### Why?

**Well-maintained and widely adopted**
Pragmatic drag and drop built by atlassian is built specifically to facilitate the drag and drop mechanics used in Trello/Jira/Confluence boards, is well built, maintained and widely adopted.

**Low-level, customizable**
Low level drag and drop package which will (hopefully) allow us to customise in any ways we're likely to need in terms of styling to the design.

### Step 3 - Add tiny-invariant

#### What?

Added for the `invariant` function for run time assertions.

#### Why?

In a TypeScript project, using runtime checks like invariant might seem redundant at first glance, especially since TypeScript provides compile-time type checking. However, it is a useful additional tool to handle certain cases which aren't as clean to handle with TypeScript alone.

**Handling Null or Undefined at Runtime**: Even with TypeScript's static type system, you can't always guarantee that something is defined at runtime, especially when dealing with refs, asynchronous data, or external sources (e.g., APIs, DOM elements).

```
const el = ref.current;
invariant(el, 'Element should not be null.');
```

Here, TypeScript can infer that ref.current could potentially be null based on the type, but it cannot eliminate the possibility entirely at runtime. invariant ensures that this scenario is handled gracefully with an explicit error message.
