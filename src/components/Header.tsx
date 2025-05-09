import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { useAuth } from '@/hooks/userContext'
import LoginForm from './LoginForm'

function Header() {
  const auth = useAuth()
  return (
    <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
      {/* inner content */}
      <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
        {/* application/author image/logo placeholder */}
        <div className="max-w-[250px] w-full flex">
          <div className="bg-zinc-100 rounded-md size-12" />
        </div>
        {/* app/author title/name placeholder */}
        <div className="bg-zinc-100 rounded-md h-8 w-[200px]" />
        {/* user menu */}
        <div className="max-w-[250px] w-full flex justify-end">
          {
            auth.authState.isLoggedIn
              ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>

                      <Button variant="ghost">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src="https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col text-left">
                            <span className="text-sm text-zinc-700 font-medium">{auth.authState.user?.firstName}</span>
                            <span className="text-xs text-zinc-500">{auth.authState.user?.email}</span>
                          </div>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[250px]">
                      <DropdownMenuLabel>
                        {auth.authState.user?.firstName}
                        {' '}
                        {auth.authState.user?.lastName}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => auth.logout()}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              : (
                  <Dialog>
                    <DialogTrigger className="text-zinc-900">Login</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-zinc-900">Login</DialogTitle>
                        <LoginForm />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                )
          }
        </div>
      </div>
    </nav>
  )
}

export default Header
