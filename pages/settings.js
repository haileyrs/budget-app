import InternalNavBar from '@/components/nav/internalNav';
import Head from 'next/head';

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <InternalNavBar>
        <main>
          <div className="flex flex-row" id="title-div">
            <article className="prose">
              <h1>Settings</h1>
            </article>
          </div>
        </main>
      </InternalNavBar>
    </>
  );
}
