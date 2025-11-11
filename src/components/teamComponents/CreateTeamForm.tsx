import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { DialogClose } from "@/components/ui/dialog"

export default function CreateTeamForm() {
    const [teamName, setTeamName] = useState("")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")

    return (
        <form className="w-full text-white space-y-5">
            <div>
                <h2 className="text-xl font-semibold mb-2">Create New Study Team</h2>
                <p className="text-gray-400">
                    Start a new study group and invite your classmates to join
                </p>
            </div>

            {/* Team Name */}
            <div className={"space-y-3.5"}>
                <Label htmlFor="name">Team Name</Label>
                <Input
                    id="name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    className="bg-neutral-900 border-gray-700 text-white"
                />
            </div>

            {/* Subject */}
            <div className={"space-y-3.5"}>
                <Label htmlFor="subject">Subject</Label>
                <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject"
                    className="bg-neutral-900 border-gray-700 text-white"
                />
            </div>

            {/* Description */}
            <div className="space-y-3.5">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your team goals..."
                    className="bg-neutral-900 border-gray-700 text-white h-20 py-2"
                />
            </div>


            {/* Buttons */}
            <div className="flex justify-between gap-3 pt-4 w-full">
                <DialogClose asChild>
                    <Button variant="secondary" className="flex-1 h-10 bg-neutral-700 hover:bg-neutral-600 text-white font-medium">
                        Cancel
                    </Button>
                </DialogClose>
                <Button type = "button" variant = "secondary" className="flex-1 h-10 bg-neutral-700 hover:bg-neutral-600 text-white font-medium">
                    Create Team
                </Button>
            </div>

        </form>
    )
}
