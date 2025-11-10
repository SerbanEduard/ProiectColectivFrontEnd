
import Navbar from "@/components/NavBar"
import {TeamCard} from "@/components/TeamCard"
import { Button } from "@/components/ui/button"
import {Dialog, DialogTrigger, DialogContent} from "@/components/ui/dialog"
import CreateTeamForm from "@/components/CreateTeamForm";

export default function TeamsPage() {

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <Navbar />

            <div className="max-w-6xl mx-auto mt-10 px-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold">StudyTeams</h1>
                        <p className="text-gray-400">
                            Collaborate with classmates and achieve your goals together
                        </p>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gray-100 text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200">
                                + Create Team
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <CreateTeamForm />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Grid cu echipe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TeamCard />
                </div>
            </div>
        </div>
    )
}
