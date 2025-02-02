import * as React from "react"
import { Tabs as BaseTabs, TabsList as BaseTabsList, TabsTrigger, TabsContent } from "./ui/tabs"
import { cn } from "@/lib/utils"

const CustomTabs = BaseTabs

const CustomTabsList = React.forwardRef<
  React.ElementRef<typeof BaseTabsList>,
  React.ComponentPropsWithoutRef<typeof BaseTabsList>
>(({ className, ...props }, ref) => (
  <BaseTabsList
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-secondary p-1 text-secondary-foreground",
      className
    )}
    {...props}
  />
))
CustomTabsList.displayName = "CustomTabsList"

export { CustomTabs, CustomTabsList, TabsTrigger, TabsContent }