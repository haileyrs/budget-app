import InternalNavBar from "@/components/nav/internalNav";
import Head from 'next/head'


export default function Export() {
  return (
    <>
      <Head>
        <title>Export</title>
      </Head>
      <InternalNavBar>
        <main>
          <div>
            <h1>Export</h1>
            <p>this could maybe be a modal</p>
          </div>
        </main>
      </InternalNavBar>
    </>
  )
}