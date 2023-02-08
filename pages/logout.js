import NavBar from "@/components/nav/navbar"
import LoginModal from "@/components/user/loginModal"
import Head from "next/head"


export default function LogoutPage() {
  return (
    <>
      <Head>
        <title>Logout Page</title>
      </Head>
      <NavBar></NavBar>
      <main>
        <div className="flex flex-col items-center">
          <p>You have been succesfully logged out.</p>
          <label htmlFor="login-modal" className="btn">Log In Again</label>
          <LoginModal/>
        </div>
      </main>
    </>
  )
}