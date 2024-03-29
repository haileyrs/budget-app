import AddBudget from '@/components/budget/addBudgetModal';
import BudgetWidget from '@/components/budget/budgetWidget';
import InternalNavBar from '@/components/nav/internalNav';
import ButtonLayout from '@/components/addNewButtonLayout';
import Alert from '@/components/alert';
import Head from 'next/head';
import Router from 'next/router';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  let today = new Date();
  let y = today.getFullYear();
  let m = today.getMonth();

  let minDate = y + '-' + (m + 1) + '-01';
  let maxDate = m === 11 ? y + 1 + '-01-01' : y + '-' + (m + 2) + '-01';

  const currentBudgets = await prisma.budget.findMany({
    where: {
      AND: [{ userId: user.id }, { month: m }, { year: y }]
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

  const categories = await prisma.category.findMany({
    where: { userId: user.id }
  });
  const filteredCategories = categories.filter((c) => c.name != 'Income');
  return {
    props: {
      budgets: currentBudgets,
      categories: filteredCategories,
      transactions: transactions,
      user: user,
      currentMonth: m
    }
  };
}

export default function Budgets({
  budgets,
  categories,
  transactions,
  user,
  currentMonth
}) {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const timer = () => {
    const time = setTimeout(() => {
      setShow(false);
      setMessage('');
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  };

  if (status == 'authenticated') {
    const getHistory = (e) => {
      e.preventDefault();
      const sendMonth = currentMonth - 1;
      Router.push('/tabs/budgets/[month]', `/tabs/budgets/${sendMonth}`);
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

    const budgetCategories = budgets.map((b) => b.category.name);
    const availableCategories = categories.filter(
      (c) => !budgetCategories.includes(c.name)
    );
    const date = new Date();
    
    if (router.query.message) {
      if (router.query.message != message) {
        setMessage(router.query.message);
        setAlertType(router.query.messageType);
        setShow(true);
        timer();
        router.replace('/tabs/budgets', undefined, { shallow: true });
      }
    };

    return (
      <>
        <Head>
          <title>Budgets</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            {show ? (
              <Alert
                message={message}
                alertType={alertType}
                handleClose={() => setShow(false)}
              />
            ) : (
              ''
            )}
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
                  onClick={(e) => getHistory(e)}
                  className="ml-3 btn btn-sm btn-circle"
                >
                  ❮
                </button>
                <button disabled className="mx-2 btn btn-sm btn-circle">
                  ❯
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              {budgets.length == 0 ? (
                <p>There are no budgets for this month</p>
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
