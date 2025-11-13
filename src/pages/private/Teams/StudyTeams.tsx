import {DefaultApi, Configuration, type EntityTeam} from "@/api";
import {useEffect, useState} from "react";
import Navbar from "@/components/teamComponents/NavBar"
import {TeamCard} from "@/components/teamComponents/TeamCard"
import { Button } from "@/components/ui/button"
import {Dialog, DialogTrigger, DialogContent} from "@/components/ui/dialog"
import CreateTeamForm from "@/components/teamComponents/CreateTeamForm";
import {getStoredToken, getStoredUser} from "@/services/react-query/auth.ts";
import SearchTeamForm from "@/components/teamComponents/SearchTeamForm.tsx";
import {Search} from "lucide-react";

export default function StudyTeams() {
    const token = getStoredToken();
    const user = getStoredUser();
    const api = new DefaultApi(
        new Configuration({
            basePath: "/api",
            baseOptions: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        })
    );

    const [userTeams, setUserTeams] = useState<EntityTeam[]>([]);
    const [teams, setTeams] = useState<EntityTeam[]>([]);
    const fetchTeams = () => {
        api.teamsGet()
            .then((res) => {
                setTeams(res.data);
            })
            .catch((err) => {
                console.error("Eroare la preluarea echipelor:", err);
            });
    }


    const fetchUserTeams = () => {
        api.teamsGet()
            .then((res) => {
                if (!user || !user.id) {
                    console.error("User not logged in or missing id");
                    return;
                }
                const filteredTeams = res.data.filter(team =>
                    team.users?.includes(user.id)
                );
                setUserTeams(filteredTeams);
            })
            .catch((err) => {
                console.error("Eroare la preluarea echipelor:", err);
            });
    }

    useEffect(() => {
        fetchUserTeams()
        fetchTeams()
    }, []);

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <Navbar />

            <div className="max-w-6xl mx-auto mt-10 px-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="space-y-4">
                        <h1 className="text-2xl font-semibold">StudyTeams</h1>
                        <p className="text-gray-400">
                            Collaborate with classmates and achieve your goals together
                        </p>
                    </div>

                    {/* GRUPARE BUTOANE */}
                    <div className="flex items-center gap-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-gray-100 text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 flex items-center gap-2">
                                    <Search /> Search Team
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <SearchTeamForm allTeams={teams} />
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-gray-100 text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200">
                                    + Create Team
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <CreateTeamForm onTeamCreated={fetchTeams} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Grid cu echipe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTeams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))}
                </div>
            </div>
        </div>
    )
}
