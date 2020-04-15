import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(function (total, transaction) {
      if (transaction.type === 'income') {
        total = total + transaction.value;
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce(function (total, transaction) {
      if (transaction.type === 'outcome') {
        total = total + transaction.value;
      }
      return total;
    }, 0);

    const total: number = (income - outcome);

    const balance: Balance = ({
      income,
      outcome,
      total
    });

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
