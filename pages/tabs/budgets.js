import AddBudget from '@/components/budget/addBudgetModal';
import BudgetWidget from '@/components/budget/budgetWidget';
import InternalNavBar from '@/components/nav/internalNav';
import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth();

  const currentBudgets = await prisma.budget.findMany({
    where: {
      AND: [{ userId: user.id }, { month: m }, { year: y }]
    },
    include: {
      category: {
        select: { name: true }
      }
    }
  });
  const categories = await prisma.category.findMany();
  console.log(currentBudgets)

  const filteredCategories = categories.filter((c) => c.name != 'Income');
  return {
    props: {
      budgets: currentBudgets,
      categories: filteredCategories,
      user: user
    }
  };
}

export default function Budgets({ budgets, categories, user }) {
  const { data: session, status } = useSession({ required: true });

  if (status == 'authenticated') {
    const budgetCategories = budgets.map(b => b.category.name)
    const availableCategories = categories.filter(
      (c) => !budgetCategories.includes(c.name)
    );

    return (
      <>
        <Head>
          <title>Budgets</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            <div className="flex" id="title-div">
              <article className="prose">
                <h1>Budgets</h1>
              </article>
              <label
                htmlFor="add-budget-modal"
                className="btn btn-sm gap-2 mx-2 mt-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add New
              </label>
            </div>

            <div className="flex flex-col">
              {budgets.map((budget) => (
                <div key={budget.id} className="w-full">
                  <BudgetWidget
                    key={budget.id}
                    id={budget.id}
                    name={budget.category.name}
                    value={budget.value}
                    max={budget.max}
                  />
                </div>
              ))}
            </div>
            <AddBudget user={user} categories={availableCategories} />
          </main>
        </InternalNavBar>
      </>
    );
  } 
}
