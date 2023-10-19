# Notes

## Route Groups

- https://nextjs.org/docs/app/building-your-application/routing/route-groups
- `(payload)` folder is a "route group"
  - to prevent the folder from being included in the route's URL path.
  - therefore it is not affected by any `layout` defined above it in the folder/routing tree e.g. the root layout of the main (non-admin) UI

## Templates

In terms of Component tree: is rendered BETWEEN a `layout` and its `children`

## Server Actions

- Think be more useful when calling directly into server-side code e.g. when hooking up to payload-in-nextjs
- For now would just be client triggering call on the server to 3rd party. so extra network hop by time returns data to client?
  [Infinite Scroll with Server Actions](https://www.youtube.com/watch?v=IFYFezylQlI)
