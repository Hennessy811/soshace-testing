import { Octokit } from "@octokit/core"
import { TRPCError } from "@trpc/server"

import createRouter from "@backend/createRouter"
import { Repository } from "@backend/types/Repositories"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const githubRouter = createRouter()
  /* This is a middleware that checks if the user is logged in. If not, it throws an error. */
  .middleware(async ({ ctx, next }) => {
    const { user } = ctx

    if (!user) {
      //   console.log("user", user, ctx)
      throw new TRPCError({ code: "UNAUTHORIZED" })
    } else return next()
  })
  .query("repos", {
    resolve: async (query) => {
      const { data } = await octokit.request(
        "GET /orgs/soshace-testing/repos?direction=desc"
      )
      return data as Repository[]
    },
  })

  .mutation("create", {
    resolve: async ({ ctx, input }) => {
      const { prisma, user } = ctx

      const repoName = `${user?.name}-react-test-1-${Date.now()}`
      await octokit.request("POST /orgs/soshace-testing/repos", {
        name: repoName,
        private: true,
      })

      await delay(500)

      await octokit.request(
        "PUT /repos/{owner}/{repo}/collaborators/{username}",
        {
          owner: "soshace-testing",
          repo: repoName,
          username: user?.name!,
          permission: "push",
        }
      )
    },
  })

export default githubRouter
