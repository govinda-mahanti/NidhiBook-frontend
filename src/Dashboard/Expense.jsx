import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../config/urlconfig';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const token = useSelector(state => state.auth.token);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');


  const fetchExpenses = useCallback(async () => {
    if (!token) return; 
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/api/expenses`, {
        headers: { Authorization: `${token}` }
      });
      console.log("Fetched expenses:", response.data);
      setExpenses(response.data.expenses);
    } catch (err) {
      setError('Failed to fetch expenses. Please try again later.');
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDescription(editingExpense.description);
      setDate(new Date(editingExpense.date).toISOString().split('T')[0]);
    } else {
      setAmount('');
      setCategory('Food');
      setDescription('');
      setDate('');
    }
  }, [editingExpense]);


  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const expenseData = {
      amount: +amount,
      category,
      description,
      date: new Date(date),
    };

    try {
      if (editingExpense) {
        await axios.put(`${BASE_URL}/api/update-expenses/${editingExpense._id}`, expenseData, {
          headers: { Authorization: `${token}` }
        });
      } else {
        await axios.post(`${BASE_URL}/api/add-expenses`, expenseData, {
          headers: { Authorization: `${token}` }
        });
      }
      
      fetchExpenses();

      setIsFormVisible(false);
      setEditingExpense(null);

    } catch (err) {
      setError('Failed to save expense. Please check your input and try again.');
      console.error("Save/Update error:", err);
    }
  };

  const deleteExpenseHandler = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
        try {
            await axios.delete(`${BASE_URL}/api/expenses/${expenseId}`, {
                headers: { Authorization: `${token}` }
            });
    
            setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== expenseId));
        } catch (err) {
            setError('Failed to delete expense.');
            console.error("Delete error:", err);
        }
    }
  };

  const editExpenseHandler = (expense) => {
    setEditingExpense(expense);
    setIsFormVisible(true);
  };

  const cancelHandler = () => {
    setIsFormVisible(false);
    setEditingExpense(null);
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Expense Tracker</h1>

        {isFormVisible && (
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto my-8">
            <h2 className="text-white text-2xl font-bold mb-6 text-center">{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
            <form onSubmit={formSubmitHandler}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="mb-2 font-semibold text-gray-300" htmlFor="description">Description</label>
                  <input
                    id="description" type="text" value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Groceries"
                    className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 font-semibold text-gray-300" htmlFor="amount">Amount</label>
                  <input
                    id="amount" type="number" min="0.01" step="0.01" value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 49.99"
                    className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 font-semibold text-gray-300" htmlFor="date">Date</label>
                  <input
                    id="date" type="date" value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 font-semibold text-gray-300" htmlFor="category">Category</label>
                  <select
                    id="category" value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Health">Health</option>
                    <option value="Bills">Bills</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-8 space-x-4">
                <button type="button" onClick={cancelHandler} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition">
                  {editingExpense ? 'Update Expense' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full mx-auto my-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Expenses</h2>
            {!isFormVisible && (
              <button
                onClick={() => setIsFormVisible(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                Add New Expense
              </button>
            )}
          </div>

            {error && <p className="text-center text-red-400 mt-4">{error}</p>}
            {isLoading ? (
                <p className="text-center text-gray-400 mt-8">Loading expenses...</p>
            ) : expenses.length === 0 ? (
                <p className="text-center text-gray-400 mt-8">No expenses found. Try adding one!</p>
            ) : (
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-6">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-300 uppercase bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3 px-6">Description</th>
                    <th scope="col" className="py-3 px-6">Category</th>
                    <th scope="col" className="py-3 px-6">Date</th>
                    <th scope="col" className="py-3 px-6">Amount</th>
                    <th scope="col" className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentExpenses.map((expense) => (
                    <tr key={expense._id} className="border-b border-gray-800 hover:bg-gray-700 transition-colors duration-200">
                      <td className="py-4 px-6">
                        <div className="font-medium text-white">{expense.description}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs text-gray-300 bg-gray-600 px-2 py-1 rounded-full">{expense.category}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="py-4 px-6 font-semibold text-green-400">
                        ${parseFloat(expense.amount).toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                          <button onClick={() => editExpenseHandler(expense)} className="text-blue-400 hover:text-blue-300 font-semibold transition">Edit</button>
                          <button onClick={() => deleteExpenseHandler(expense._id)} className="text-red-500 hover:text-red-400 font-semibold transition">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
               <nav className="mt-6 flex justify-center">
                 <ul className="inline-flex items-center -space-x-px">
                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                         <li key={number}>
                             <button
                                 onClick={() => paginate(number)}
                                 className={`py-2 px-3 leading-tight ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'} border border-gray-700`}
                             >
                                 {number}
                             </button>
                         </li>
                     ))}
                 </ul>
               </nav>
             )}
        </div>
      </div>
    </div>
  );
};

export default Expense;