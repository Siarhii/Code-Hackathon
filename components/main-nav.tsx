import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          <Link href="/about">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/donate">Donate</Link>
          <Link href="/apply">Apply as Volunteer</Link>
          <Link href="/ngotask">Campaigns</Link>
          <Link href="/feedback">Feedback</Link>

          {/* {items?.map(
            (item, index) =>
              item.href && (
                // <Link
                //   key={index}
                //   href={item.href}
                //   className={cn(
                //     "flex items-center text-sm font-medium text-muted-foreground",
                //     item.disabled && "cursor-not-allowed opacity-80"
                //   )}
                // >
                //   {item.title}
                // </Link>
              )
          )} */}
        </nav>
      ) : null}
    </div>
  )
}
