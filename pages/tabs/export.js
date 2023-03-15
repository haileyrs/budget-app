import InternalNavBar from '@/components/nav/internalNav';
import Head from 'next/head'
import DatePicker from 'tailwind-datepicker-react';
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  const accounts = await prisma.moneyAccount.findMany({
    where: { userId: user.id }
  });

  return {
    props: {
      accounts: accounts,
      user: user
    }
  };
}

export default function Export({ accounts, user }) {
  const { data: session, status } = useSession({ required: true });

  const handleDate1 = (selectedDate) => {
    console.log(selectedDate);
  };

  const handleDate2 = (selectedDate) => {
    console.log(selectedDate);
  };

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const options = {
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    theme: {
      background: '',
      todayBtn: '',
      clearBtn:
        'bg-primary text-primary-content dark:bg-primary dark:text-primary-content',
      icons: '',
      text: '',
      disabledText: 'dark:text-base-300',
      input: '',
      inputIcon: '',
      selected:
        'bg-primary text-primary-content dark:bg-primary dark:text-primary-content'
    },
    defaultDate: new Date(),
    language: 'en'
  };

  if (status == 'authenticated') {
    return (
      <>
        <Head>
          <title>Export</title>
        </Head>
        <InternalNavBar user={user}>
          <main>
            <div className="flex flex-row" id="title-div">
              <article className="prose">
                <h1>Export</h1>
              </article>
            </div>
            <div className="space-x-4">
              <select
                className="select select-primary w-full max-w-xs"
                defaultValue="select your output"
              >
                <option disabled>select your output</option>
                <option>CSV File</option>
                <option>Sankey Diagram Format</option>
              </select>
              <button className="btn">GO</button>
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <article className="prose">
                  <h2>Filters</h2>
                </article>
              </div>
              <div className="flex space-x-4">
                <p>Date Range</p>
                <div className="form-control">
                  <DatePicker
                    show={show1}
                    setShow={(state) => setShow1(state)}
                    options={options}
                    onChange={handleDate1}
                  />
                  <p>TO</p>
                  <DatePicker
                    show={show2}
                    setShow={(state) => setShow2(state)}
                    options={options}
                    onChange={handleDate2}
                  />
                </div>
              </div>
              <p>Accounts</p>
              <div className="form-control">
                {accounts.map((a) => (
                  <label className="label cursor-pointer">
                    <span className="label-text">{a.name}</span>
                    <input type="checkbox" checked className="checkbox" />
                  </label>
                ))}
              </div>
            </div>
          </main>
        </InternalNavBar>
      </>
    );
  }
}