import * as React from "react"
import { X } from "lucide-react"

const SheetContext = React.createContext({
  open: false,
  setOpen: () => {},
})

export const Sheet = ({ children, open: controlledOpen, onOpenChange }) => {
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

export const SheetTrigger = ({ children, className = "", ...props }) => {
  const { setOpen } = React.useContext(SheetContext)
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`cursor-pointer inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export const SheetClose = ({ children, className = "", ...props }) => {
  const { setOpen } = React.useContext(SheetContext)
  return (
    <div
      onClick={() => setOpen(false)}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const SheetContent = ({ side = "left", className = "", children, ...props }) => {
  const { open, setOpen } = React.useContext(SheetContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex">
      <div
        className="fixed inset-0 bg-black/60 transition-opacity backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div
        className={`relative z-[10000] bg-white text-gray-900 p-6 shadow-2xl w-[280px] sm:w-[320px] h-full overflow-y-auto flex flex-col ${
          side === "left" ? "mr-auto" : "ml-auto"
        } ${className}`}
        {...props}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 p-1.5 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  )
}

export const SheetHeader = ({ className = "", ...props }) => (
  <div className={`flex flex-col space-y-1 text-left mb-6 pb-4 border-b border-gray-100 ${className}`} {...props} />
)

export const SheetTitle = ({ className = "", ...props }) => (
  <h2 className={`text-xl font-extrabold text-black tracking-tight ${className}`} {...props} />
)

export const SheetDescription = ({ className = "", ...props }) => (
  <p className={`text-xs text-gray-500 ${className}`} {...props} />
)
