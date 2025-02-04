"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bell,
  BookOpen,
  Bot,
  Building2,
  CircleDollarSign,
  Coins,
  Command,
  DollarSignIcon,
  FilePlus2,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Ticket,
  User,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
