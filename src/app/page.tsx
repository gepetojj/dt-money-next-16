'use client';
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { ITransaction, TotalCard } from "@/types/transaction";
import { useMemo, useState } from "react";

const transactions:ITransaction[] = [
  {
    id: "1",
    title: "Salário",
    price: 5000,
    category: "Trabalho",
    type: "INCOME",
    data: new Date("2024-06-01"),
  },
  {
    id: "2",
    title: "Aluguel",
    price: 1500,
    category: "Moradia",
    type: "OUTCOME",
    data: new Date("2024-06-05"),
  },
  {
    id: "3",
    title: "Supermercado",
    price: 300,
    category: "Alimentação",
    type: "OUTCOME",
    data: new Date("2024-06-10"),
  },
  {
    id: "4",
    title: "Freelance",
    price: 1200,
    category: "Trabalho",
    type: "INCOME",
    data: new Date("2024-06-15"),
  }
];

export default function Home() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState(transactions);
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | undefined>(undefined);
  const [transactionToDelete, setTransactionToDelete] = useState<ITransaction | undefined>(undefined);

  const handleSubmitTransaction = (transaction: ITransaction) => {
    setTransactionData((prevState) => {
      const transactionIndex = prevState.findIndex((item) => item.id === transaction.id);
      if (transactionIndex === -1) {
        return [...prevState, transaction];
      }

      return prevState.map((item) => (item.id === transaction.id ? transaction : item));
    });
  };

  const handleEditTransaction = (transaction: ITransaction) => {
    setEditingTransaction(transaction);
    setIsFormModalOpen(true);
  };

  const handleDeleteTransaction = (transaction: ITransaction) => {
    setTransactionToDelete(transaction);
  };

  const handleConfirmDeleteTransaction = () => {
    if (!transactionToDelete) return;

    setTransactionData((prevState) => prevState.filter((item) => item.id !== transactionToDelete.id));
    setTransactionToDelete(undefined);
  };

  const handleCloseDeleteModal = () => {
    setTransactionToDelete(undefined);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingTransaction(undefined);
  };

  const calculaTotal = useMemo(() => {
    const totals = transactionData.reduce<TotalCard>((acc, transaction) => {
      if (transaction.type === "INCOME") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    }, { total: 0, income: 0, outcome: 0 })

    return totals;
  }, [transactionData]);
  
  return (
    <div className="h-full min-h-screen">
      <Header handleOpenFormModal={() => setIsFormModalOpen(true)}/>
      <BodyContainer>
         <CardContainer totalValues={calculaTotal} />
         <Table
          data={transactionData}
          handleEditTransaction={handleEditTransaction}
          handleDeleteTransaction={handleDeleteTransaction}
         />
      </BodyContainer>
      {isFormModalOpen && <FormModal 
          closeModal={handleCloseFormModal} 
          title={editingTransaction ? "Editar Transação" : "Criar Transação"} 
          submitTransaction={handleSubmitTransaction}
          transaction={editingTransaction}
      />}
      {transactionToDelete && (
        <div
          className="relative z-10"
          aria-labelledby="delete-modal-title"
          aria-describedby="delete-modal-description"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-700/75 transition-opacity" aria-hidden="true" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-modal text-left shadow-xl sm:w-full sm:max-w-lg p-8">
                <h2 id="delete-modal-title" className="font-semibold leading-9 text-title text-2xl">
                  Confirmar exclusão
                </h2>
                <p id="delete-modal-description" className="text-title mt-4">
                  Deseja excluir a transação &quot;{transactionToDelete.title}&quot;?
                </p>
                <div className="flex justify-end gap-3 mt-8">
                  <button
                    type="button"
                    className="rounded-md px-4 py-3 text-sm font-semibold text-title bg-background hover:opacity-80"
                    onClick={handleCloseDeleteModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="rounded-md px-4 py-3 text-sm font-semibold text-white bg-outcome hover:opacity-80"
                    onClick={handleConfirmDeleteTransaction}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
