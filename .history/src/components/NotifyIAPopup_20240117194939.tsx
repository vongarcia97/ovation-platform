import { api } from '~/utils/api';
import { useEffect, useState } from 'react';

type NotificationProps = {
  supplierId: number | null;
  supplierName: string | null;
}

export const NotifyIAPopup: React.FC<NotificationProps> = ({ supplierId, supplierName }) => {

  const [modal, setModal] = useState<HTMLDialogElement | undefined>(undefined);

  const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    modal?.showModal();
  }

  const notificationAPI = api.notification.createNotification.useMutation({
    onSuccess: () => {
      alert('successfully notified IA team, thank you! :)')

      modal?.close();
    }
  });

  const notifyIA = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { name, details } = formData;

    notificationAPI.mutate({ supplierId, name, details });



    
  }

  useEffect(() => {
    
    setModal(document.getElementById('flag-modal') as HTMLDialogElement);
  }, [])


  return (
    <>
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={(e) => openModal(e)}>FLAG</button>
      <dialog id="flag-modal" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={notifyIA}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
              <input name="name" type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter name here" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea name="details" id="details" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Let us know what changes to make....."></textarea>
            </div>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <button type="submit" className="btn">NOTIFY</button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  )
}