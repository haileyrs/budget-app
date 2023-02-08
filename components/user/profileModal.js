export default function ProfileModal() {
  return (
    <main>
      <input type="checkbox" id="profile-modal" className="modal-toggle" />
      <div className="modal modal-primary">
        <div className="modal-box relative">
          <label htmlFor="profile-modal" className="btn btn-circle btn-ghost absolute right-2 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </label>
          <input type="text" placeholder="display name" className="input input-bordered input-primary w-full max-w-xs" />
          <input type="text" placeholder="new username" className="input input-bordered input-primary w-full max-w-xs" />
          <input type="text" placeholder="new password" className="input input-bordered input-primary w-full max-w-xs" />
          {/* password rules */}
          {/* <input type="text" placeholder="confirm new password" className="input input-bordered input-primary w-full max-w-xs" /> */}
          <div className="modal-action">
            <label className="btn">Save</label>
          </div>
        </div>
      </div>
    </main>
  )
}