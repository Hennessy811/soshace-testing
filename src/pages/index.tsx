import React from "react"

import { addHours, formatDistanceToNow } from "date-fns"
import { useSession } from "next-auth/react"

import Layout from "@components/shared/Layout"
import trpc from "@utils/trpc"

// const Loader = () => {
//   return (
//     <div className="w-full h-full my-12 font-mono text-2xl animate-pulse">
//       Loading...
//     </div>
//   )
// }

// const Error = () => {
//   return (
//     <div className="w-full h-full font-mono text-2xl text-red-600">
//       Error happened while loading...
//     </div>
//   )
// }

// interface FormInputs {
//   destination: string
//   startDate: string
//   endDate: string
//   comment: string
// }

// const schema = yup
//   .object({
//     destination: yup.string().required().min(3),
//     startDate: yup.date().required(),
//     endDate: yup
//       .date()
//       .required()
//       .test("endDate", "End date must be after start date", function (value) {
//         return value ? value > this.parent.startDate : true
//       }),
//     comment: yup.string(),
//   })
//   .required()

// const CreateTripForm = ({
//   onSubmit,
//   isSubmitLoading,
// }: {
//   onSubmit: (data: FormInputs) => void
//   isSubmitLoading: boolean
// }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormInputs>({
//     resolver: yupResolver(schema),
//   })

//   const handleSubmitForm = (data: FormInputs) => {
//     onSubmit(data)
//     reset()
//   }

//   return (
//     <div className="px-2 py-4 my-4 border border-gray-100 rounded-md shadow-sm">
//       <h1 className="text-2xl font-bold text-gray-800">Create Trip</h1>
//       <br />

//       <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col">
//         <div className="">
//           <div className="text-lg font-medium">Destination</div>
//           <input
//             className="w-full p-2 my-2 border border-gray-300 rounded"
//             placeholder="Destination"
//             {...register("destination")}
//           />
//           <p className="text-sm text-red-500">{errors.destination?.message}</p>
//         </div>

//         <div>
//           <div className="text-lg font-medium">Start Date</div>

//           <input
//             className="w-full my-2 border border-gray-300 rounded"
//             type="date"
//             {...register("startDate")}
//           />
//           <p className="text-sm text-red-500">{errors.startDate?.message}</p>
//         </div>

//         <div>
//           <div className="text-lg font-medium">End Date</div>

//           <input
//             className="w-full my-2 border border-gray-300 rounded"
//             type="date"
//             {...register("endDate")}
//           />
//           <p className="text-sm text-red-500">{errors.endDate?.message}</p>
//         </div>

//         <div>
//           <div className="text-lg font-medium">Comment</div>

//           <input
//             className="w-full p-2 my-2 border border-gray-300 rounded"
//             placeholder="Comment"
//             {...register("comment")}
//           />
//         </div>

//         <button
//           className="px-4 py-2 mt-4 uppercase border border-gray-600 rounded"
//           type="submit"
//           disabled={isSubmitLoading}
//         >
//           {isSubmitLoading ? "Loading" : "Submit"}
//         </button>
//       </form>
//     </div>
//   )
// }

function Home() {
  const utils = trpc.useContext()
  const { data } = useSession()
  const { data: repos, isLoading, isError } = trpc.useQuery(["gh.repos"])

  const createRepoMutation = trpc.useMutation("gh.create", {
    onSuccess: () => utils.invalidateQueries(["gh.repos"]),
  })

  const userName = data?.user?.name

  const userRepos = userName
    ? repos?.filter((repo) => repo.name.includes(userName))
    : []

  return (
    <Layout protectedRoute>
      <>
        <div className="prose">
          <h1>Hi, {data?.user?.name}!</h1>

          <h2>Welcome to the Soshace Testing Platform!</h2>
        </div>
        <div className="p-4 mt-4 rounded-md shadow-md">
          <p>React Developer</p>

          <button
            className="btn btn-primary"
            onClick={() => {
              createRepoMutation.mutateAsync()
            }}
          >
            Start
          </button>
        </div>

        <div className="mt-12 prose">
          <h2>Your Repositories</h2>
        </div>

        <div>{isLoading && <div>Loading...</div>}</div>

        <div>{isError && <div>Error...</div>}</div>

        <div className="space-y-4">
          {userRepos?.map((repo) => (
            <div
              key={repo.id}
              className="shadow-md card card-bordered bg-slate-100"
            >
              <div className="card-body">
                <h4 className="card-title">{repo.name}</h4>
                <div>{repo.description}</div>
                <div className="kbd">{repo.clone_url}</div>

                <p>
                  Created:{" "}
                  <span className="text-red-500">
                    {formatDistanceToNow(new Date(repo.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </p>
                <p>
                  Repo will be read-only:{" "}
                  <span className="text-red-500">
                    {formatDistanceToNow(
                      addHours(new Date(repo.created_at), 1),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    </Layout>
  )
}
export default Home
