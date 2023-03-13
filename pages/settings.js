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

  // fetch budgets to determine what categories can be safely deleted
  const categories = await prisma.category.findMany();
  
  return {
    props: {
      categories: categories,
      user: user
    }
  };
}

export default function Settings({ user, categories }) {
  const { data: session, status } = useSession({ required: true });
  let catError = false;

  if (status == 'authenticated') {
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      if (categories.find(c => event.target.name.value == c.name)) {
        catError = true;
      } else {
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
      }
    };

    const removeCategory = async (id, e) => {
      e.preventDefault();
      try {
        const response = await fetch(`/api/category`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({categoryId: id})
        });
        const result = await response.json();
        await Router.push('/settings');
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <>
        <Head>
          <title>Settings</title>
        </Head>
        <InternalNavBar user={user}>
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
                        <td>
                          <label
                            onClick={(e) => removeCategory(c.id, e)}
                            className="btn"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </label>
                        </td>
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
