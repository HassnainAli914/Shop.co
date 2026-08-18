import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const SheetContext = React.createContext({
  open: false,
  setOpen: () => {},
})

const Sheet = ({ children, open: controlledOpen, onOpenChange }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = (val) => {
    if (isControlled) {
      onOpenChange?.(val)
    } else {
      setUncontrolledOpen(val)
    }
  }

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetTrigger = ({ children, asChild, className, ...props }) => {
  const { setOpen } = React.useContext(SheetContext)
  return (
    <div
      onClick={() => setOpen(true)}
      className={cn("cursor-pointer inline-flex", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const SheetClose = ({ children, className, ...props }) => {
  const { setOpen } = React.useContext(SheetContext)
  return (
    <div
      onClick={() => setOpen(false)}
      className={cn("cursor-pointer inline-flex", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const SheetContent = ({ side = "left", className, children, ...props }) => {
  const { open, setOpen } = React.useContext(SheetContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity animate-in fade-in"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "relative z-50 bg-background p-6 shadow-lg transition duration-300 ease-in-out w-3/4 max-w-sm h-full overflow-y-auto flex flex-col",
          side === "left" ? "mr-auto" : "ml-auto",
          className
        )}
        {...props}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 p-1"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  )
}

const SheetHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-left mb-4", className)} {...props} />
)

const SheetTitle = ({ className, ...props }) => (
  <h2 className={cn("text-lg font-semibold text-foreground", className)} {...props} />
)

const SheetDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
}
