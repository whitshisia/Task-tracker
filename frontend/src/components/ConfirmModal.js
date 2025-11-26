export default function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-xl w-80">
        <h2 className="text-lg font-semibold mb-4">Delete Task?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
