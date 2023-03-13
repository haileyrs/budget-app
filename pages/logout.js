import NavBar from '@/components/nav/navbar';
import Head from 'next/head';
import { signIn } from 'next-auth/react';

export default function LogoutPage() {
  return (
    <>
      <Head>
        <title>Logout Page</title>
      </Head>
      <NavBar>
        <main>
          <div className="hero">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold pt-10">Goodbye!</h1>
                <p className="py-6">You have been succesfully logged out.</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    signIn(undefined, {
                      callbackUrl: 'http://localhost:3000/tabs/summary'
                    })
                  }
                >
                  Log in Again
                </button>
              </div>
            </div>
          </div>
        </main>
      </NavBar>
    </>
  );
}
