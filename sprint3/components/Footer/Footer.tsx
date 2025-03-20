import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary-dark p-4 text-center mt-auto">
      <div className="contatos">
        <Link href="#" className="text-white no-underline text-sm">
          Contatos
        </Link>
      </div>
    </footer>
  )
}

