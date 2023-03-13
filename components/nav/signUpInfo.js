import Modal from "../modalTemplate"

export default function SignUpInfo() {
  return (
    <>
      <Modal title="Sign Up" control="sign-up-modal">
        <div className="px-2 max-h-96">
          <article className="prose">
            <h3>Creating an account is simple and fast.</h3>
            <p>
              This application uses NextAuth which allows you to login with a
              pre-existing account that supports OAuth. Current providers
              include Google and GitHub.
            </p>
            <p>
              When you click 'login', you will be taken to a page that gives you
              options for supported providers. Select which sign-in service you
              would like to use, and login with your credentials for that
              service. If this is the first time you are logging into the
              application, you may be required to confirm additional information
              regarding what you would like to be shared with this application.
            </p>
            <p>
              After your intial login, a user will be created and associated
              with your OAuth credentials. Now each time you login to the
              application, you will be asked for the same credentials.
            </p>
            <p>
              Once you have selected your service, you cannot switch to another
              service if they both use the same email address. If you are trying
              to login and are getting a message that says something about
              'using the account you originally registered with this email',
              this is probably what is happening. You have to use the original
              service you signed up with to login.
            </p>
          </article>
        </div>
      </Modal>
    </>
  );
}