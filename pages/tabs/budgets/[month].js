import AddBudget from '@/components/budget/addBudgetModal';
import BudgetWidget from '@/components/budget/budgetWidget';
import InternalNavBar from '@/components/nav/internalNav';
import ButtonLayout from '@/components/addNewButtonLayout';
import Head from 'next/head';
import Router from 'next/router';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  let today = new Date();
  let y = today.getFullYear();
  let pageMonth = parseInt(context?.params?.month);

  let minDate = y + '-' + (pageMonth + 1) + '-01';
  let maxDate =
    pageMonth === 11 ? y + 1 + '-01-01' : y + '-' + (pageMonth + 2) + '-01';

  const currentBudgets = await prisma.budget.findMany({
    where: {
      AND: [{ userId: user.id }, { month: pageMonth }, { year: y }]
    },
    include: {
      category: {
        select: { name: true, id: true }
      }
    }
  });

  const transactions = await prisma.transaction.findMany({
    where: { date: { gte: new Date(minDate), lt: new Date(maxDate) } }
  });

  const categories = await prisma.category.findMany();
  const filteredCategories = categories.filter((c) => c.name != 'Income');

  return {
    props: {
      budgets: currentBudgets,
      categories: filteredCategories,
      transactions: transactions,
      user: user,
      pageMonth: pageMonth
    }
  };
}

export default function BudgetHistory({
  budgets,
  categories,
  transactions,
  user,
  pageMonth
}) {
  const { data: session, status } = useSession({ required: true });

  if (status == 'authenticated') {
    const goBack = (e) => {
      e.preventDefault();
      const month = pageMonth - 1;
      const year = 2023;
      // need to add year to url if possible to have two variables(year/month)
      // for now you only view budgets in this year
      Router.push('/tabs/budgets/[month]', `/tabs/budgets/${month}`);
    };

    const goForward = (e) => {
      e.preventDefault();
      const month = pageMonth + 1;
      const year = 2023;
      if (month === new Date().getMonth() && year === 2023) {
        Router.push('/tabs/budgets');
      } else {
        // need to add year to url if possible to have two variables(year/month)
        // for now you only view budgets in this year
        Router.push('/tabs/budgets/[month]', `/tabs/budgets/${month}`);
      }
    };

    const findValues = function (budgetItem) {
      const categoryId = budgetItem.category.id;
      let total = 0;

      transactions.forEach((t) => {
        if (t.categoryId === categoryId) {
          total += t.amount * -1;
        }
      });
      return total;
    };

    budgets.forEach((b) => (b.value = findValues(b)));

    let lastMonth = false;
    if (pageMonth === 0) {
      lastMonth = true;
    }
    const budgetCategories = budgets.map((b) => b.category.name);
    const availableCategories = categories.filter(
      (c) => !budgetCategories.includes(c.name)
    );

    const date = new Date(pageMonth + 1 + '/1/2023');

    return (
      <>
        <Head>
          <title>Budgets</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            <div className="justify-between" id="title-div">
              <div className="flex">
                <article className="prose">
                  <h1>Budgets</h1>
                </article>
                <label
                  htmlFor="add-budget-modal"
                  className="btn btn-sm gap-2 mx-2 mt-2"
                >
                  <ButtonLayout />
                </label>
              </div>
              <div className="flex self-end place-items-end">
                <article className="prose">
                  <h3>
                    {date.toLocaleString('en-us', { month: 'long' })}, 2023
                  </h3>
                </article>
                <button
                  disabled={lastMonth}
                  onClick={(e) => goBack(e)}
                  className="ml-2 btn btn-sm btn-circle"
                >
                  ❮
                </button>
                <button
                  onClick={(e) => goForward(e)}
                  className="mx-2 btn btn-sm btn-circle"
                >
                  ❯
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              {budgets.length == 0 ? (
                <p>There is no budget history for this month</p>
              ) : (
                budgets.map((budget) => (
                  <div key={budget.id} className="w-full">
                    <BudgetWidget
                      key={budget.id}
                      id={budget.id}
                      name={budget.category.name}
                      value={budget.value}
                      max={budget.max}
                    />
                  </div>
                ))
              )}
            </div>
            <AddBudget user={user} categories={availableCategories} />
          </main>
        </InternalNavBar>
      </>
    );
  }
}
