type ConfirmModalProps = {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmModal = ({ title, description, onCancel, onConfirm }: ConfirmModalProps) => {
  return (
    <div
      className="relative z-10 min-w-xl"
      aria-labelledby="confirm-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-700 opacity-75 transition-opacity" aria-hidden="true" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounder-lg bg-modal text-left shadow-xl sm:w-full sm:max-w-lg">
            <div className="px-8 py-8">
              <h2 className="text-title text-2xl font-semibold" id="confirm-modal-title">
                {title}
              </h2>
              <p className="mt-3 text-table-header">{description}</p>

              <div className="mt-8 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="rounded-md border border-input-border px-5 py-3 text-title hover:opacity-80"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="rounded-md bg-outcome px-5 py-3 text-white hover:opacity-80"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
