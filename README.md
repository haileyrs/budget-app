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

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

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

