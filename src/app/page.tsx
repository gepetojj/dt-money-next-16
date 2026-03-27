'use client';
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { ConfirmModal } from "@/components/ConfirmModal";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import type { ITransaction, TotalCard } from "@/types/transaction";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState(transactions);
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);

  const handleAddTransaction = (transaction: ITransaction) => {
    setTransactionData( (prevState)=> [...prevState, transaction]);
  }

  const handleUpdateTransaction = (transaction: ITransaction) => {
    setTransactionData((prevState) =>
      prevState.map((item) => (item.id === transaction.id ? transaction : item))
    );
  };

  const handleSaveTransaction = (transaction: ITransaction) => {
    if (selectedTransaction) {
      handleUpdateTransaction(transaction);
      return;
    }

    handleAddTransaction(transaction);
  };

  const handleOpenCreateModal = () => {
    setSelectedTransaction(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedTransaction) {
      setIsDeleteModalOpen(false);
      return;
    }

    setTransactionData((prevState) => prevState.filter((item) => item.id !== selectedTransaction.id));
    setSelectedTransaction(null);
    setIsDeleteModalOpen(false);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTransaction(null);
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
      <Header handleOpenFormModal={handleOpenCreateModal}/>
      <BodyContainer>
         <CardContainer totalValues={calculaTotal} />
         <Table
            data={transactionData}
            onEditTransaction={handleOpenEditModal}
            onDeleteTransaction={handleOpenDeleteModal}
          />
      </BodyContainer>
      {isFormModalOpen && <FormModal 
          closeModal={handleCloseFormModal}
          title={selectedTransaction ? "Editar Transação" : "Criar Transação"}
          onSubmitTransaction={handleSaveTransaction}
          initialValues={selectedTransaction ?? undefined}
        />}
      {isDeleteModalOpen && selectedTransaction && (
        <ConfirmModal
          title="Excluir transação"
          description={`Tem certeza que deseja excluir a transação "${selectedTransaction.title}"?`}
          onCancel={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
