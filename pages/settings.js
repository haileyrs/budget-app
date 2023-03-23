import InternalNavBar from '@/components/nav/internalNav';
import Head from 'next/head';
import Router from 'next/router';
import { getServerSession } from 'next-auth';
import { authOptions } from './/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';
import CategorySettings from '@/components/settings/categorySettings';
import BudgetSettings from '@/components/settings/budgetSettings';

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

  if (status == 'authenticated') {

    const budgetTab = () => {
      document.getElementById('categorySettings').className = 'hidden';
      document.getElementById('budgetSettings').className = '';
      document.getElementById('budgetTab').className = 'tab tab-bordered tab-active';
      document.getElementById('categoryTab').className = 'tab tab-bordered';
    }

    const categoryTab = () => {
      document.getElementById('budgetSettings').className = 'hidden';
      document.getElementById('categorySettings').className = '';
      document.getElementById('categoryTab').className =
        'tab tab-bordered tab-active';
      document.getElementById('budgetTab').className = 'tab tab-bordered';
    }

    return (
      <>
        <Head>
          <title>Settings</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            <div id="title-div">
              <article className="prose">
                <h1>Settings</h1>
              </article>
            </div>
            <div className="tabs">
              <button
                id="budgetTab"
                className="tab tab-bordered tab-active"
                onClick={budgetTab}
              >
                Budgets
              </button>
              <button
                id="categoryTab"
                className="tab tab-bordered"
                onClick={categoryTab}
              >
                Categories
              </button>
              {/* <a className="tab tab-bordered">Tab 3</a> */}
            </div>
            <div id="budgetSettings">
              <BudgetSettings />
            </div>
            <div id="categorySettings" className="hidden">
              <CategorySettings categories={categories} />
            </div>
          </main>
        </InternalNavBar>
      </>
    );
  }
}
