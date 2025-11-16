// src/pages/Friends.tsx
"use client";

import Navbar from "@/components/teamComponents/NavBar";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  MessageCircle,
  MoreHorizontal,
  UserPlus,
  Search,
  X,
} from "lucide-react";

type Friend = {
  id: number;
  name: string;
  email: string;
  mutualFriends: number;
};

const friends: Friend[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@university.edu",
    mutualFriends: 5,
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@university.edu",
    mutualFriends: 5,
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@university.edu",
    mutualFriends: 5,
  },
];

export default function Friends() {
  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-6">
        {/* Title + Add friend */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Friends
            </h1>
            <p className="text-sm text-gray-400">
              Connect with classmates and study together
            </p>
          </div>

          {/* ADD FRIEND DIALOG */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-100 text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200">
                <UserPlus className="h-4 w-4" />
                Add Friend
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-xl border border-neutral-700 bg-neutral-900 text-gray-100">
              <DialogHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <DialogTitle className="text-lg font-semibold">
                    Add Friend
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-gray-400">
                    Search for students by name or email to add them as
                    friends.
                  </DialogDescription>
                </div>

                <DialogClose asChild>
                  
                </DialogClose>
              </DialogHeader>

              {/* Search bar */}
              <div className="mt-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Search"
                    className="h-10 rounded-xl border border-neutral-800 bg-neutral-800/80 pl-9 text-sm text-gray-100 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              {/* Empty state */}
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Search className="mb-4 h-10 w-10 text-gray-300" />
                <p className="text-sm text-gray-400">
                  Start typing to search for friends
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs (All / Pending / Suggestions) */}
        <Tabs defaultValue="all">
          <TabsList className="grid w-full max-w-xl grid-cols-3 rounded-xl bg-neutral-800">
            <TabsTrigger
              value="all"
              className="gap-1 rounded-xl text-gray-300 data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
            >
              All Friends
              <Badge
                variant="secondary"
                className="ml-1 h-5 min-w-[20px] justify-center border border-neutral-700 bg-neutral-900 px-1 text-[11px] font-medium text-gray-100"
              >
                {friends.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="pending"
              className="gap-1 rounded-xl text-gray-300 data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
            >
              Pending
              <Badge
                variant="secondary"
                className="ml-1 h-5 min-w-[20px] justify-center border border-neutral-700 bg-neutral-900 px-1 text-[11px] font-medium text-gray-100"
              >
                2
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="suggestions"
              className="rounded-xl text-gray-300 data-[state=active]:bg-neutral-700 data-[state=active]:text-white"
            >
              Suggestions
            </TabsTrigger>
          </TabsList>

          {/* All Friends list */}
          <TabsContent value="all" className="mt-4 space-y-3">
            {friends.map((friend) => (
              <FriendRow key={friend.id} friend={friend} />
            ))}
          </TabsContent>

          {/* Empty states */}
          <TabsContent
            value="pending"
            className="mt-6 text-sm text-gray-400"
          >
            No pending requests right now.
          </TabsContent>

          <TabsContent
            value="suggestions"
            className="mt-6 text-sm text-gray-400"
          >
            No suggestions at the moment.
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function FriendRow({ friend }: { friend: Friend }) {
  return (
    <Card className="border border-neutral-800 bg-neutral-800/90 shadow-sm">
      <CardContent className="flex items-center justify-between gap-4 px-4 py-3">
        {/* Left side: avatar + basic info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-neutral-700 bg-neutral-900">
            <AvatarFallback className="text-gray-100">
              {friend.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <div className="font-medium leading-none text-white">
              {friend.name}
            </div>
            <div className="text-xs text-gray-400">{friend.email}</div>
            <div className="text-[11px] text-gray-500">
              {friend.mutualFriends} mutual friends
            </div>
          </div>
        </div>

        {/* Right side: actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 border-neutral-700 bg-neutral-900 text-gray-100 hover:bg-neutral-800"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Message</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-gray-300 hover:bg-neutral-800"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 border-neutral-800 bg-neutral-900 text-gray-100"
            >
              <DropdownMenuItem className="hover:bg-neutral-800">
                View profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-neutral-800">
                Mute
              </DropdownMenuItem>
              <Separator className="my-1 bg-neutral-800" />
              <DropdownMenuItem className="text-red-400 hover:bg-neutral-800">
                Remove friend
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
