"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"

// export default function Cadastro() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     nome: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // Basic validation
//     if (formData.password !== formData.confirmPassword) {
//       alert("As senhas não coincidem!")
//       return
//     }

//     // Store data in localStorage or context
//     localStorage.setItem("userData", JSON.stringify(formData))

//     // Navigate to next registration page
//     router.push("/cadastro/perguntas")
//   }

//   return (
//     <>
//       <Header />
//       <div className="px-5">
//         <div className="bg-light-blue w-full max-w-[350px] p-7 rounded-xl mx-auto shadow-md mb-8">
//           <div className="mb-5">
//             <h2 className="text-primary-dark text-3xl text-center">Cadastro</h2>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="nome" className="block mb-1 text-sm">
//                 Nome:
//               </label>
//               <input
//                 type="text"
//                 id="nome"
//                 name="nome"
//                 placeholder="Nome"
//                 required
//                 className="form-input"
//                 value={formData.nome}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className="block mb-1 text-sm">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Email"
//                 required
//                 className="form-input"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="password" className="block mb-1 text-sm">
//                 Senha:
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Digite sua senha"
//                 required
//                 className="form-input"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="mb-5">
//               <label htmlFor="confirmPassword" className="block mb-1 text-sm">
//                 Confirme sua senha:
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 placeholder="Confirme sua senha"
//                 required
//                 className="form-input"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary mx-auto block">
//               Cadastrar
//             </button>
//           </form>
//         </div>

//         <div className="w-full max-w-[600px] mx-auto rounded-xl overflow-hidden">
//           <Image
//             src="/metro-deficientes.jpg"
//             alt="Várias pessoas incluindo deficientes no vagão do metrô"
//             width={600}
//             height={300}
//             className="w-full object-cover max-h-[300px]"
//           />
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

export default function Cadastro() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  // Improve the registration form UI and add password visibility toggle
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!formData.nome || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Por favor, preencha todos os campos")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem!")
      return
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const existingUser = users.find((user: any) => user.email === formData.email)

    if (existingUser) {
      setError("Este email já está cadastrado")
      return
    }

    // Add new user to users array
    const newUser = {
      id: Date.now().toString(),
      nome: formData.nome,
      email: formData.email,
      password: formData.password,
      accessibility: null, // Will be updated in the next step
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Store current user data for the next registration step
    localStorage.setItem("tempUserData", JSON.stringify(newUser))

    // Navigate to next registration page
    router.push("/cadastro/perguntas")
  }

  return (
    <>
      <Header />
      <div className="px-5 py-8">
        <div className="bg-light-blue w-full max-w-[450px] p-7 rounded-xl mx-auto shadow-md mb-8">
          <div className="mb-5">
            <h2 className="text-primary-dark text-3xl text-center font-bold">Cadastro</h2>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nome" className="block mb-1 text-sm font-medium">
                Nome:
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Nome completo"
                required
                className="form-input text-black"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className="form-input text-black"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 text-sm font-medium">
                Senha:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                  required
                  className="form-input text-black pr-10"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium">
                Confirme sua senha:
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirme sua senha"
                  required
                  className="form-input text-black pr-10"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Continuar
            </button>

            <div className="mt-4 text-center">
              <Link href="/" className="text-primary-dark hover:underline text-sm">
                Já tem uma conta? Faça login
              </Link>
            </div>
          </form>
        </div>

        <div className="w-full max-w-[600px] mx-auto rounded-xl overflow-hidden">
          <Image
            src="/metro-deficientes.jpg"
            alt="Várias pessoas incluindo deficientes no vagão do metrô"
            width={600}
            height={300}
            className="w-full object-cover max-h-[300px]"
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

