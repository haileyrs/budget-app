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

  // only pull budgets where month and year are this month and year
  const budgets = await prisma.budget.findMany({
    where: { userId: user.id }
  });
  const categories = await prisma.category.findMany();

  return {
    props: {
      budgets: budgets,
      categories: categories,
      user: user
    }
  };
}

export default function Budgets({ budgets, user }) {
  const { data: session, status } = useSession({ required: true });

  if (status == 'authenticated') {
    return (
      <>
        <Head>
          <title>Budgets</title>
        </Head>
        <InternalNavBar>
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
              {/* for budget in list of budgets */}
              {budgets.map((budget) => (
                <div key={budget.category} className="w-full">
                  <BudgetWidget
                    key={budget.category}
                    id={budget.id}
                    name={budget.category}
                    value={budget.value}
                    max={budget.max}
                  />
                </div>
              ))}
              {/* <div className="w-full">
              <BudgetWidget
                key="clothing"
                name="Clothing"
                value="300"
                max="500"
              />
            </div>
            <div className="w-full">
              <BudgetWidget key="dining" name="Dining" value="150" max="300" />
            </div> */}
            </div>
            <AddBudget user={user} />
          </main>
        </InternalNavBar>
      </>
    );
  } 
}
