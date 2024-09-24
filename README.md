# Popsa.com - React Frontend test skeleton

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the packages with yarn:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tests

```bash
yarn test
```

## Decision Log

This section will document the step by step process of building this feature It will also serve as a record for decisions made.

### Step 1 - Add TypeScript

**What?**

Switch from js to tsx and add packages to support using typscript to build this application.

**Why?**

TypeScript is a superset of JavaScript that adds optional static typing and other features to improve the development experience. _TypeScript will help catch errors early and improve code maintainability._

### Step 2 - Choose package to facilitate drag and drop funcitonality

**What?**

Pragmatic Drag & Drop - <https://github.com/atlassian/pragmatic-drag-and-drop?tab=readme-ov-file>

**Why?**

**Well-maintained and widely adopted**
Pragmatic drag and drop built by atlassian is built specifically to facilitate the drag and drop mechanics used in Trello/Jira/Confluence boards, is well built, maintained and widely adopted.

**Low-level, customizable**
Low level drag and drop package which will (hopefully) allow us to customise in any ways we're likely to need in terms of styling to the design.

### Step 3 - Add tiny-invariant

**What?**

Added for the `invariant` function for run time assertions.

**Why?**

In a TypeScript project, using runtime checks like invariant might seem redundant at first glance, especially since TypeScript provides compile-time type checking. However, it is a useful additional tool to handle certain cases which aren't as clean to handle with TypeScript alone.

**Handling Null or Undefined at Runtime**: Even with TypeScript's static type system, you can't always guarantee that something is defined at runtime, especially when dealing with refs, asynchronous data, or external sources (e.g., APIs, DOM elements).

```typescript
const el = ref.current;
invariant(el, "Element should not be null.");
```

Here, TypeScript can infer that ref.current could potentially be null based on the type, but it cannot eliminate the possibility entirely at runtime. invariant ensures that this scenario is handled gracefully with an explicit error message.

### Step 4 - Drag Preview

**What?**

Use the onGenerateDragPreview API from pragmatic drag and drop.
<https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/drag-previews>

```typescript
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCustomNativeDragPreview({
          getOffset: centerUnderPointer,
          render({ container }) {
            setPreview(container);
          },
          nativeSetDragImage,
        });
      },
```

**Why?**

Built into the PD&D draggable API and it allows you to use and style a custom drag preview.
One drawback was that the documentation is not easy to find as the links in Atlassian docs are largely broken, and the search functionality isn't great, even if you know the names of the api.

### Step 5 - Animate Image Mount/Exit - Add Framer motion

**What**

Add framer for animations, use animate prescence / motion apis.

### Step 6 - Drag & Drop Reassess and Refactor

**What?**

Replaced Pragmatic Drag and Drop implimentation with [React-DND](https://react-dnd.github.io/react-dnd/docs/api/use-drag).

**Why?**

I couldnt' find any way to make use of Pragmatic Drag and Drop's to support mobile touch interactions. Very litte good documentation/examples or discussion of it, aside from various places that mention it should work out of the box, however it didn't. So i had to explore a number of different options.

I was also struggling to get Pragmatic Drag and Drop to play well with Framer for the animations. So when looking for a solution I taking that into account.

Tested [dndkit](https://dndkit.com/) but it didn't seem ideal as it was very low level.

Also found [react-dnd](https://react-dnd.github.io/react-dnd/docs/api/use-drag) which seemed to work well with Framer in terms of accessible props.
However it didn't work with Mobile out of the box, it has two "Backends" neither of which support mouse and touch events. So I added the helper function to detect touch devices in the `DragDropContextWrapper`. Sidenote - the level of support of this library is still not great, it's the reason that the Drag Preview is not visible on mobile/touch.

### Step 6 - Find Solution for Drag Preview

**What?**

Added a custom drag preview - `DragPreview`

**Why?**

Now that we're using React DND (as opposed to Pragmatic Drag and Drop, which had great support for drag previews), React DND's DragPreviewImage doesn't provide flexibilty for custom styling. Neccesitating a custom drag preview.

## What I would do if I had more time:

**Incomplete Items**

- Exit animation for the image from the dragged slot as it's being dropped
- Drag Preview on mobile / touch devices (in browser)
- Spring animation when the Drag Preview appears.
- Testing:
  - Given the uncertain nature of the librarys I was using, spending time learning to test them at a unit level seemed like something I couldn't afford in the time frame and the advice from the libararies themselves is that unit tests are brittle because the events they use under the hood can change as the browser APIs develop. And it would also have been a difficult task which would have coupled the library and implimentation heavily in the tests.
  - Ideally I would have set up a cypress test to test the drag preview at a higher level.
