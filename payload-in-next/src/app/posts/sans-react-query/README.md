# Infinite scrolling feed of 'posts' from Payload CMS

TODO: need to revisit this info as approach has moved on

## Using `server-actions`

Pursuing this as the default approach

### Pros

- can share types between payload cms and next app (even though client-> server requests still traverse a network)
- hopefully support will improve over time

### Cons

- server-actions experimental feature
- as specified should be used for mutations not queries
- network request is a POST

## Using `react-query` and `hydration`

Will keep an example of this

### Pros

- as likely closer to what I will use in production situs like at work

### Cons

- unlike server-actions cannot easily share types between payload cms and nextjs client/server
