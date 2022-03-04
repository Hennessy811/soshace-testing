import superjson from "superjson"

import createRouter from "@backend/createRouter"

import githubRouter from "./github"
import tripsRouter from "./trips"
import usersRouter from "./users"

export const appRouter = createRouter()
  .transformer(superjson)

  .merge("users.", usersRouter)
  .merge("trips.", tripsRouter)
  .merge("gh.", githubRouter)

export type AppRouter = typeof appRouter
