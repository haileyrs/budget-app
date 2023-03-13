import Modal from '../modalTemplate';
import Router from 'next/router';

export default function ProfileModal({ user }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        userId: user.id,
        displayName: event.target.name.value
      }
      const response = await fetch(`/api/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      document.getElementById('profile-modal').click();
      await Router.push('/tabs/summary');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal title="Update Profile" control='profile-modal'>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={ user.displayName ? user.displayName : "display name" }
                className="input input-bordered input-primary w-full max-w-xs"
                required
              />
            </div>
          </div>
          <div className="modal-action m-1">
            <button className="btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}