import { baseApi } from "@/redux/baseApiSlice";

const profileApiSlice = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		profileCreate: builder.mutation({
			query: ({
				is_student,
				is_alumni,
				is_lecturer,
				bio,
				phone_number,
				linked_in_url,
			}) => {
				const formData = new FormData();
				formData.append("is_student", is_student);
				formData.append("is_alumni", is_alumni);
				formData.append("is_lecturer", is_lecturer);
				formData.append("bio", bio);
				formData.append("phone_number", phone_number);
				formData.append("linked_in_url", linked_in_url);

				return {
					url: "/profile/",
					method: "PATCH",
					body: formData,
				};
			},
			// invalidatesTags: ["PROFILE"],
		}),

		profileList: builder.query({
			query: ({}) => ({
				url: "/profile/",
				method: "GET",
			}),
			// providesTags: ["POSTS"],
		}),
	}),
});

export const { useProfileCreateMutation, useProfileListQuery } =
	profileApiSlice;
