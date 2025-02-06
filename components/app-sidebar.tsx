"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bell,
  Building2,
  CircleDollarSign,
  FilePlus2,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  Map,
  PieChart,
  Settings2,
  Ticket,
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Calendar,
  MessageCircle,
  Loader2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Dharani",
    email: "dharani@example.com",
    avatar: "/avatars/dharani.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
}

// Company navigation data
const companyNavData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      isActive: true,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FilePlus2,
      items: [
        {
          title: "New Project",
          url: "/projects/new",
        },
        {
          title: "Manage Projects",
          url: "/projects/manage",
        },
      ],
    },
    {
      title: "Colleges",
      url: "/colleges",
      icon: Building2,
      items: [
        {
          title: "Add College",
          url: "/colleges/new",
        },
        {
          title: "Manage Colleges",
          url: "/colleges/manage",
        },
      ],
    },
    {
      title: "Human Resource",
      url: "/hr",
      icon: User,
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CircleDollarSign,
    },
    {
      title: "Tickets",
      url: "/tickets",
      icon: Ticket,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Team",
          url: "/settings/team",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        {
          title: "Limits",
          url: "/settings/limits",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

// Trainer navigation data
const trainerNavData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      isActive: true,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
    },
    {
      title: "Job Listings",
      url: "/jobs",
      icon: Briefcase,
      items: [
        {
          title: "Available Jobs",
          url: "/jobs/available",
        },
        {
          title: "Applied Jobs",
          url: "/jobs/applied",
        },
        {
          title: "Saved Jobs",
          url: "/jobs/saved",
        },
      ],
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
      items: [
        {
          title: "Edit Profile",
          url: "/profile/edit",
        },
        {
          title: "Resume",
          url: "/profile/resume",
        },
        {
          title: "Portfolio",
          url: "/profile/portfolio",
        },
      ],
    },
    {
      title: "Training History",
      url: "/training",
      icon: GraduationCap,
    },
    {
      title: "Documents",
      url: "/documents",
      icon: FileText,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: Calendar,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: MessageCircle,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Preferences",
          url: "/settings/preferences",
        },
        {
          title: "Privacy",
          url: "/settings/privacy",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Recent Training",
      url: "#",
      icon: GraduationCap,
    },
    {
      name: "Upcoming Sessions",
      url: "#",
      icon: Calendar,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [mounted, setMounted] = React.useState(false)
  const [userData, setUserData] = React.useState<{ userType: string } | null>(null)

  React.useEffect(() => {
    setMounted(true)
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }
  }, [])

  // Select navigation data based on user type
  const navData = userData?.userType === 'ROLE_TRAINER' ? trainerNavData : companyNavData

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex h-screen w-[256px] items-center justify-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
        <NavProjects projects={navData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
