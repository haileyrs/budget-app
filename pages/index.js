import NavBar from '@/components/nav/navbar';
import Footer from '@/components/nav/footer';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <main>
          <div className="space-x-4 space-y-10">
            <div
              id="about-section"
              className="grid grid-cols-1 lg:grid-cols-2 justify-items-center content-center"
            >
              <div className="flex items-center p-2">
                <section className="prose">
                  <h1 id="home-page-title">App about section</h1>
                  <h3>This app does this, and blah, and this!</h3>
                </section>
              </div>
              <div className="flex items-center p-2">
                <div className="mockup-phone border-primary">
                  <div className="camera"></div>
                  <div className="display">
                    <div className="artboard artboard-demo bg-neutral phone-1">
                      <Image
                        src="/../public/images/phone.png"
                        alt="Screenshot of Application Page on mobile"
                        width={350}
                        height={675}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="features-section"
              className="grid grid-cols-1 lg:grid-cols-2 justify-items-center content-center"
            >
              <div className="flex justify-center p-2">
                <div className="mockup-window border bg-base-300">
                  <div className="flex justify-center bg-base-200">
                    <Image
                      src="/../public/images/budgetScreen.png"
                      alt="Screenshot of Internal Application Page on desktop"
                      width={600}
                      height={500}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-2">
                <article className="prose">
                  <h1>Create Budgets</h1>
                  <h3>
                    Create budgets and add transactions to track spending in customizable categories.
                  </h3>
                </article>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center content-center">
              <div className="flex justify-center p-2">
                <div className="mockup-window border bg-base-300">
                  <div className="flex justify-center bg-base-200">
                    <Image
                      src="/../public/images/accountScreen.png"
                      alt="Screenshot of Internal Application Page on desktop"
                      width={600}
                      height={500}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-2 lg:order-first">
                <article className="prose">
                  <h1>Monitor Account Balances</h1>
                  <h3>
                    Add your financial accounts for an organized view of your net worth.
                  </h3>
                </article>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center content-center">
              <div className="flex justify-center p-2">
                <div className="mockup-window border bg-base-300">
                  <div className="flex justify-center bg-base-200">
                    <Image
                      src="/../public/images/accountScreen.png"
                      alt="Screenshot of Internal Application Page on desktop"
                      width={600}
                      height={500}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-2">
                <article className="prose">
                  <h1>Export Your Data</h1>
                  <h3>
                    Seamlessly export your data to csv, or into a format used to create a sankey diagram using an external site. Simply select your timeframe and the accounts you want to include.
                  </h3>
                </article>
              </div>
            </div>
            <div
              id="start-section"
              className="grid grid-cols-1 lg:grid-cols-2 justify-items-center content-center"
            >
              <div className="flex items-center p-2">
                <div className="mockup-code">
                  <pre data-prefix="$">
                    <code>npm i daisyui</code>
                  </pre>
                  <pre data-prefix=">" className="text-warning">
                    <code>installing...</code>
                  </pre>
                  <pre data-prefix=">" className="text-success">
                    <code>Done!</code>
                  </pre>
                </div>
              </div>
              <div className="flex items-center p-2 lg:order-first">
                <article className="prose">
                  <h1>instructions for setup</h1>
                </article>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </NavBar>
    </>
  );
}
