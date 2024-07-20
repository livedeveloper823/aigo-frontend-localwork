"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoIcon } from "@/components/icons/icons"
import { BellIcon, SettingsIcon, X } from "lucide-react"
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerHeader } from "@/components/ui/drawer"
import { LanguageSwitcher } from "@/components/navbar/LanguageSwitcher"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

const components: { title: string; href: string; }[] = [
    {
        title: "screener",
        href: "/screener",
    },
    {
        title: "rankings",
        href: "/rankings",
    },
    {
        title: "projects",
        href: "/projects",
    },
    {
        title: "backoffice",
        href: "/backoffice",
    },
    {
        title: "goPro",
        href: "/gopro",
    },
    {
        title: "academy",
        href: "/academy",
    },
]

export function ExchangeNavbar() {
    const t = useTranslations('Navbar')
    return (
        <div>
            <div className="md:hidden m-5">
                <div className="flex justify-between">
                    <Drawer direction="left">
                        <DrawerTrigger asChild>
                            <Button variant={"mobile"}>
                                <div className="w-7 h-1 bg-gray-300"></div>
                                <div className="w-7 h-1 bg-gray-300"></div>
                                <div className="w-7 h-1 bg-gray-300"></div>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="w-full">
                            <DrawerHeader className="flex justify-between text-white border-b-[1px] border-description">
                                <DrawerClose><X /></DrawerClose>
                            </DrawerHeader>
                            <div>
                                {components.map((item, index) =>
                                    <div key={index} className="text-white z-[1] flex flex-col rela w-full hover:bg-description px-5 rounded-md">
                                        <Link href={item.href}><div className="cursor-pointer py-2">{t(item.title)}</div></Link>
                                    </div>)}
                            </div>
                        </DrawerContent>
                    </Drawer>
                    <div className="flex items-center lg:gap-5">
                        <div className="flex items-center gap-1">
                            <LanguageSwitcher />
                            <SettingsIcon className="text-gray-800 xl:m-2 m-1 lg:w-8 w-5" />
                            <BellIcon className="text-gray-800 xl:m-2 m-1 lg:w-8 w-5" />
                        </div>
                        <Avatar className="xl:w-9 xl:h-9 w-6 h-6">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
            <div className="md:flex items-center justify-between md:w-full md:visible hidden xl:px-20 py-7 sm:px-10">
                <div className="flex items-center xl:gap-20 gap-3 text-sm">
                    <Link href="/"><LogoIcon size={32} /></Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {components.map((item, index) =>
                                <div key={index}>
                                    <NavigationMenuItem>
                                        <Link href={item.href} legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                {t(item.title)}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                </div>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center lg:gap-5">
                    <div className="flex items-center gap-1">
                        <LanguageSwitcher />
                        <SettingsIcon className="text-gray-800 xl:m-2 m-1 lg:w-8 w-5" />
                        <BellIcon className="text-gray-800 xl:m-2 m-1 lg:w-8 w-5" />
                    </div>
                    <Avatar className="xl:w-9 xl:h-9 w-6 h-6">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
