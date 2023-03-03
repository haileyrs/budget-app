import InternalNavBar from '@/components/nav/internalNav';
import Head from 'next/head';

// this could be a modal instead of a page
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
          <div className="flex flex-row">
            <label className="swap">
              <input type="checkbox" />
              <div className="swap-on">ON</div>
              <div className="swap-off">OFF</div>
            </label>
          </div>
        </main>
      </InternalNavBar>
    </>
  );
}
