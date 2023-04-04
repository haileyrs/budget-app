import InternalNavBar from '@/components/nav/internalNav';
import CategorySettings from '@/components/settings/categorySettings';
import BudgetSettings from '@/components/settings/budgetSettings';
import Alert from '@/components/alert';
import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { authOptions } from './/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth();

  const categories = await prisma.category.findMany({
    where: { userId: user.id },
    include: {
      Transaction: {
        select: { id: true }
      },
      Budget: {
        select: { id: true }
      }
    }
  });

  const budgets = await prisma.budget.findMany({
    where: { AND: [{ userId: user.id }, { month: m }, { year: y }] },
    include: {
      category: {
        select: { name: true, id: true }
      }
    }
  });

  const recurringBudgets = await prisma.recurringBudget.findMany({
    where: { userId: user.id },
    include: {
      category: {
        select: { name: true, id: true}
      }
    }
  })

  return {
    props: {
      categories: categories,
      budgets: budgets,
      recurringBudgets: recurringBudgets,
      user: user
    }
  };
}

export default function Settings({ user, categories, recurringBudgets, budgets }) {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  if (status == 'authenticated') {
    const budgetTab = () => {
      document.getElementById('categorySettings').className = 'hidden';
      document.getElementById('budgetSettings').className = '';
      document.getElementById('budgetTab').className = 'tab tab-bordered tab-active';
      document.getElementById('categoryTab').className = 'tab tab-bordered';
    };
    const categoryTab = () => {
      document.getElementById('budgetSettings').className = 'hidden';
      document.getElementById('categorySettings').className = '';
      document.getElementById('categoryTab').className =
        'tab tab-bordered tab-active';
      document.getElementById('budgetTab').className = 'tab tab-bordered';
    };

    if (router.query?.tab) {
      router.query.tab === 'budget' ? budgetTab() : ''
    };

    return (
      <>
        <Head>
          <title>Settings</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            {router.query?.message ? (
              <Alert
                message={router.query.message}
                alertType={router.query.messageType}
              />
            ) : (
              ''
            )}
            <div id="title-div">
              <article className="prose">
                <h1>Settings</h1>
              </article>
            </div>
            <div className="tabs">
              <button
                id="categoryTab"
                className="tab tab-bordered tab-active"
                onClick={categoryTab}
              >
                Categories
              </button>
              <button
                id="budgetTab"
                className="tab tab-bordered"
                onClick={budgetTab}
              >
                Budgets
              </button>
            </div>
            <div className="settings-container">
              <div id="categorySettings">
                <CategorySettings categories={categories} user={user} />
              </div>
              <div id="budgetSettings" className="hidden">
                <BudgetSettings recurringBudgets={recurringBudgets} categories={categories} user={user} />
              </div>
            </div>
          </main>
        </InternalNavBar>
      </>
    );
  }
}
