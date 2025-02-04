import {
  Building2,
  CircleDollarSign,
  FilePlus2,
  Ticket,
  TrendingUp,
  User,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FilePlus2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Colleges</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">
              +4 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              -2 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Projects */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Design Engineering", progress: 75, status: "In Progress" },
                { name: "Sales & Marketing", progress: 32, status: "In Progress" },
                { name: "Travel Portal", progress: 50, status: "In Review" },
                { name: "Mobile App", progress: 100, status: "Completed" },
              ].map((project) => (
                <div key={project.name} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {project.name}
                    </p>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-muted-foreground">
                    {project.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* HR Overview */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>HR Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Total Employees
                  </p>
                  <p className="text-sm text-muted-foreground">234</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New Hires (This Month)
                  </p>
                  <p className="text-sm text-muted-foreground">12</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Open Positions
                  </p>
                  <p className="text-sm text-muted-foreground">8</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
