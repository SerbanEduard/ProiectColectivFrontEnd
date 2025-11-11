import { GraduationCap, Users, UserPlus, Settings, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="w-full px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-8 text-[#B8860B]" />
              <h1 className="text-2xl font-bold text-foreground">StudyFlow</h1>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link to="/study-teams">
              <Button variant="ghost" className="flex items-center gap-2">
                <Users className="size-5" />
                <span>Teams</span>
              </Button>
            </Link>
            <Link to="/friends">
              <Button variant="ghost" className="flex items-center gap-2">
                <UserPlus className="size-5" />
                <span>Friends</span>
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" className="flex items-center gap-2">
                <Settings className="size-5" />
                <span>Settings</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Welcome to StudyFlow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your collaborative learning platform where students come together to achieve academic excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Link to="/study-teams" className="block">
            <Card className="bg-card hover:bg-accent transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-col items-center text-center gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <Users className="size-12 text-foreground" />
                </div>
                <CardTitle className="text-xl">Study Teams</CardTitle>
                <CardDescription className="text-base">
                  Create and join study groups with classmates and friends
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/shared-resources" className="block">
            <Card className="bg-card hover:bg-accent transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-col items-center text-center gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <BookOpen className="size-12 text-foreground" />
                </div>
                <CardTitle className="text-xl">Shared Resources</CardTitle>
                <CardDescription className="text-base">
                  Access and share study materials, notes, and resources
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/track-progress" className="block">
            <Card className="bg-card hover:bg-accent transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-col items-center text-center gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <TrendingUp className="size-12 text-foreground" />
                </div>
                <CardTitle className="text-xl">Track Progress</CardTitle>
                <CardDescription className="text-base">
                  Monitor your learning journey and achieve your goals
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Ready to start your journey?
          </h3>
          <Link to="/add-friends">
            <Button variant="outline" size="lg" className="flex items-center gap-2 mx-auto">
              <UserPlus className="size-5" />
              <span>Add friends</span>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

