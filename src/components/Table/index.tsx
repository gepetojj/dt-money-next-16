import { ITransaction } from "@/types/transaction"
import { formatDate, formatPrice } from "@/utils"

export type TableProps = {
    data: ITransaction[]
    handleEditTransaction: (transaction: ITransaction) => void
    handleDeleteTransaction: (transaction: ITransaction) => void
}
export const Table = ({ data, handleEditTransaction, handleDeleteTransaction }: TableProps) => {
    return <>
        <table className="w-full mt-16 border-separate border-spacing-y-2">
            <thead>
                <tr>
                   <th scope="col" className="px-4 text-left text-table-header text-base font-medium">Título</th> 
                   <th scope="col" className="px-4 text-left text-table-header text-base font-medium">Preço</th> 
                   <th scope="col" className="px-4 text-left text-table-header text-base font-medium">Categoria</th> 
                   <th scope="col" className="px-4 text-left text-table-header text-base font-medium">Data</th> 
                   <th scope="col" className="px-4 text-left text-table-header text-base font-medium">Ações</th>
                </tr>
            </thead> 
            <tbody>
               {data.map(transaction => (
                 <tr key={transaction.id} className="h-16">
                    <td className="px-4 py-4 whitespace-nowrap text-title bg-white rounded-l-lg">{transaction.title} </td> 
                    <td className={`px-4 py-4 whitespace-nowrap ${transaction.type === "INCOME"? "text-income": "text-outcome"} bg-white text-right`}>{formatPrice(transaction.price)} </td> 
                    <td className="px-4 py-4 whitespace-nowrap text-title bg-white">{transaction.category} </td>
                    <td className="px-4 py-4 whitespace-nowrap text-title bg-white">{formatDate(transaction.data)} </td>
                    <td className="px-4 py-4 whitespace-nowrap text-title bg-white rounded-r-lg">
                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                className="rounded-md px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                                onClick={() => handleEditTransaction(transaction)}
                                aria-label={`Editar transação ${transaction.title}`}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="rounded-md px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteTransaction(transaction)}
                                aria-label={`Excluir transação ${transaction.title}`}
                            >
                                Excluir
                            </button>
                        </div>
                    </td>
                 </tr>
                ))} 
            </tbody>
        </table>
    </>
}
