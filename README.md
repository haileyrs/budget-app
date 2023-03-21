This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Purpose

## Notes

The 'Income' category type by default is the only value that will be displayed as a positive number in the transaction history, all others will be converted to negative value automatically if not entered as so. This type will also not show up in the categories dropdown on the add budget modal. 

If you would like to add categories to track positive cash flow in more detail, there are three places you must update the code in order to make it work for you:
```
budgets.js
addTransactionModal.js
editTransactionModal.js
```

In `addTransactionModal and editTransactionModal`, inside the `handleSubmit` function, there is a block that looks like this:
```
if (event.target.category.value != 'Income' && category != 'Income') {
    if (data.amount > 0) {
      data.amount *= -1;
    }
  }
```      

You will want to add any new categories that should track positive values here, so they can be properly entered. For example, if I wanted to add a positive category called *Interest Earned*, my new code in `editTransactionModal` would look like this:
```
if (event.target.category.value != 'Income' && category != 'Income' && event.target.category.value != 'Interest Earned' && category != 'Interest Earned') {
    if (data.amount > 0) {
      data.amount *= -1;
    }
  };
```      

`addTransactionModal` will be shorter, as you only have to consider the new category value: 
```
if (event.target.category.value != 'Income' && event.target.category.value != 'Interest Earned') {
    if (data.amount > 0) {
      data.amount *= -1;
    }
  };
```

In `budgets`, you will simply add the new category name to the function that filters the categories, like so:
```
const filteredCategories = categories.filter((c) => c.name != 'Income' && c.name != 'Interest Earned');
```

