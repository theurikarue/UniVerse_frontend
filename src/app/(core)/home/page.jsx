"use client";
import React from "react";
import PostCard from "@/components/ui/MyComponents/cards/PostCard";
import { usePostListQuery } from "@/redux/features/posts/postsApiSlice";
import PostSkeleton from "@/components/ui/MyComponents/cards/skeletons/Skeleton";
import RightSidebar from "@/components/ui/MyComponents/RightSidebar";
import { Card } from "@/components/ui/shadcnComponents/card";
import { Button } from "@/components/ui/shadcnComponents/button";
import AvatarProfile from "@/components/ui/MyComponents/profile/AvatarProfile";
import { useProfile } from "@/hooks/profile";
import Link from "next/link";
import PostForm from "@/components/forms/postForm";
import { Image, CalendarFold, NotepadText } from "lucide-react";
import { useDialog } from "@/hooks/responsiveDialog";
import { ResponsiveDialog } from "@/components/ui/MyComponents/ResponsiveDialog";

const Home = () => {
	const { data, isLoading } = usePostListQuery(1);
	const { data: profileData } = useProfile();
	const { isDialogOpen, handleOpenDialog, handleCloseDialog } =
		useDialog("post");

	return (
		<div>
			<div className="flex flex-col gap-4">
				<Card className="flex w-[53%] min-w-[21.25rem] py-[0.3rem] px-0 flex-col justify-center items-start gap-[0.75rem] rounded-[0.5rem] bg-white dark:bg-muted">
					<div className="flex w-full m-2">
						<AvatarProfile
							className="w-[3rem] h-[3rem]"
							pfpImage={profileData?.profile_picture}
							first_name={profileData?.user.first_name}
							last_name={profileData?.user.last_name}
						/>
						<Button
							variant="outline"
							onClick={handleOpenDialog}
							className="w-full h-[5vh] rounded-[20px] mx-[1rem]">
							<Link
								className="text-sm"
								href="#"
								onClick={handleOpenDialog}>
								Create New Post
							</Link>
						</Button>
						<ResponsiveDialog
							title={"Create New Post"}
							className="w-[60rem]"
							isOpen={isDialogOpen}
							setIsOpen={handleCloseDialog}>
							<PostForm />
						</ResponsiveDialog>
					</div>
					<div className="flex justify-evenly items-start self-stretch">
						<Button
							variant="ghost"
							onClick={handleOpenDialog}
							className="flex gap-1 mx-4">
							<Image color="#4392F1" />
							<Link
								href="#"
								onClick={handleOpenDialog}>
								Media
							</Link>
						</Button>
						<Button
							variant="ghost"
							className="gap-1">
							<CalendarFold color="#90B494" />
							<Link href="#">Events</Link>
						</Button>
						<Link href="./new-post">
							<Button
								variant="ghost"
								className="gap-1">
								<NotepadText color="#855e1d" />
								Write an article
							</Button>
						</Link>
					</div>
				</Card>

				{isLoading ? (
					<PostSkeleton />
				) : (
					data?.results?.map((post, index) => (
						<PostCard
							key={index}
							postId={post.id}
							first_name={post.author.user.first_name}
							last_name={post.author.user.last_name}
							pfpImage={post.author.profile_picture}
							isVerified={post.author.is_verified}
							isLiked={post.is_liked}
							isFollowingCreator={post.is_following_creator}
							likeCount={post.likes_count}
							isSaved={post.is_bookmarked}
							bookmarkCount={post.bookmarks_count}
							type="Student"
							date="1 Month Ago"
							title={post.title}
							content={post.content}
							postImage={post.media}
							size="large"
						/>
					))
				)}
			</div>
			<RightSidebar className="fixed top-[6rem] bottom-0 right-0 bg-gray-200 z-30 " />
		</div>
	);
};

export default Home;
