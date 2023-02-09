import AddBudget from '@/components/budget/addBudgetModal';
import BudgetWidget from '@/components/budget/budgetWidget';
import InternalNavBar from '@/components/nav/internalNav';
import Head from 'next/head';



export default function Budgets() {

  const budgets = fetch('/api/budgets');
  
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
            <div className="w-full">
              <BudgetWidget key="clothing" name="Clothing" value="300" max="500" />
            </div>
            <div className="w-full">
              <BudgetWidget key="dining" name="Dining" value="150" max="300" />
            </div>
          </div>
          <AddBudget />
        </main>
      </InternalNavBar>
    </>
  );
}
