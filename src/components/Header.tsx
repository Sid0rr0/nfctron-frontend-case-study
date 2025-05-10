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
import { t } from 'i18next'
import { Globe, Ticket } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LoginForm from './LoginForm'

const lngs = {
  en: { nativeName: 'English' },
  cs: { nativeName: 'Česky' },
}

function Header() {
  const auth = useAuth()
  const { i18n } = useTranslation()

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
      {/* inner content */}
      <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
        {/* application/author image/logo placeholder */}
        <div className="max-w-[250px] w-full flex">
          <Ticket className="text-zinc-900" />
        </div>
        {/* app/author title/name placeholder */}
        {/* <div className="bg-zinc-100 rounded-md h-8 w-[200px]" /> */}
        <div className="bg-blue-400 rounded-md px-4 py-2">BLEtron</div>
        <div className="flex flex-row">
          <div className="text-zinc-900 font-medium flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  <Globe size={18} />
                  <span className="text-sm font-medium">
                    {lngs[i18n.resolvedLanguage as keyof typeof lngs]?.nativeName || 'Language'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[150px]">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {Object.keys(lngs).map(lng => (
                    <DropdownMenuItem
                      key={lng}
                      className={i18n.resolvedLanguage === lng ? 'font-bold' : ''}
                      onClick={() => i18n.changeLanguage(lng)}
                    >
                      {lngs[lng as keyof typeof lngs].nativeName}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
                            {t('logout')}
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                : (
                    <Dialog>
                      <DialogTrigger className="text-zinc-900">
                        <Button>
                          <span className="text-sm font-medium">{t('login')}</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-zinc-900">{t('login')}</DialogTitle>
                          <LoginForm />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
