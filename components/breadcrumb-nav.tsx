"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

export function BreadcrumbNav() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // Convert path segments to readable titles
  const getTitle = (segment: string) => {
    // Handle special cases
    if (segment === "hr") return "Human Resources"
    
    // Convert others to title case
    return segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1
          const path = `/${segments.slice(0, index + 1).join("/")}`

          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{getTitle(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={path}>{getTitle(segment)}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
} 