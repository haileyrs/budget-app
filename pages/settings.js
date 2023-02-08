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
          <div>
            <h1>Settings</h1>
          </div>
        </main>
      </InternalNavBar>
    </>
  );
}
