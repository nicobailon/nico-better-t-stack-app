import { Link } from '@tanstack/react-router'
import { ModeToggle } from './mode-toggle'

export default function Header() {
  const links = [
    { to: '/', label: 'Home' },
  ]

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: 'font-bold' }}
              activeOptions={{ exact: true }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  )
}
