import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar } from "lucide-react"
import type {EntityTeam} from "@/api";

export function TeamCard({team}: {team: EntityTeam}) {
    return (
        <Card className="w-80 bg-neutral-800 border border-gray-700 text-gray-100">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <Users className="h-5 w-5" />
                    <span className="text-xs bg-gray-700 text-gray-200 px-2 py-0.5 rounded-md">
            {team.teamtopic}
          </span>
                </div>

                <CardTitle className="mt-2">{team.name}</CardTitle>
                <CardDescription>{team.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sm">
                    {team.users?.length !=null ?
                        (
                            <>
                                <Users className="h-4 w-4" />  {team.users?.length} members
                            </>
                        ) :
                        (
                            <>
                                <Users className="h-4 w-4" /> Not members yet
                            </>
                        )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" /> Tomorrow at 3:00 PM
                </div>
            </CardContent>

            <CardFooter>
                <Button className="w-full mt-2">
                    View Team
                </Button>
            </CardFooter>
        </Card>
    )
}
