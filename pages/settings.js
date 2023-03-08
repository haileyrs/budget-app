import InternalNavBar from '@/components/nav/internalNav';
import Head from 'next/head';
import Router from 'next/router';
import { getServerSession } from 'next-auth';
import { authOptions } from './/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  // const budgets = await prisma.budget.findMany({
  //   where: { userId: user.id },
  //   include: {
  //     category: {
  //       select: { name: true }
  //     }
  //   }
  // });
  const categories = await prisma.category.findMany();
  
  return {
    props: {
      categories: categories,
      user: user
    }
  };
}

export default function Settings({ categories }) {
  const { data: session, status } = useSession({ required: true });

  if (status == 'authenticated') {
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const data = {
          name: event.target.name.value
        };
        const response = await fetch(`/api/category`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        
        await Router.push('/settings');
      } catch (error) {
        console.log(error);
      }
    };

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
            {/* add and delete categories here */}
            {/* when deleting, add option to transfer an transactions/budgets with that category to a different one */}
            <div className="flex">
              {/* <label className="swap">
                  <input type="checkbox" />
                  <div className="swap-on">ON</div>
                  <div className="swap-off">OFF</div>
                </label> */}
              {/* this is so ugly but i needed it quickly */}
              <div>
                <p className="italic font-semibold text-primary">
                  Add a category
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="category name"
                    className="input input-bordered input-primary w-full max-w-xs"
                    required
                  />
                  <button className="btn" type="submit">
                    Save
                  </button>
                </form>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra table-compact w-full">
                  <tbody>
                    {categories.map((c) => (
                      <tr key={c.id}>
                        <th>{c.name}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </InternalNavBar>
      </>
    );
  }
}
