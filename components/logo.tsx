import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1">
      <span className="text-xl font-bold">
        Code<span className="text-primary">Mace</span>
      </span>
    </Link>
  )
}
