"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import 'tailwindcss/tailwind.css';

function App() {
  const [clothes, setClothes] = useState([]);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [showAddClothesModal, setShowAddClothesModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [allClothes, setAllClothes] = useState([]);
  
  const getClothes = async () => {
    try {
      const res = await axios.get("http://localhost/clothes/getclothes.php");
      if (Array.isArray(res.data)) {
        setAllClothes(res.data);
        setClothes(res.data);
      } else {
        setAllClothes([]);
      }
    } catch (error) {
      console.error("Error fetching clothes:", error);
    }
  };
  
  const addClothes = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!name || !brand || !year || !type) {
      setModalMessage('Please complete all fields before submitting.');
      setShowAddClothesModal(true);
            console.log("RES NAKO: ", res);
      return;
    }

    try {
      const jsonData = {
        name: name,
        brand: brand,
        year: year,
        type: type
      };
      const formData = new FormData();
      formData.append('json', JSON.stringify(jsonData));
      const res = await axios.post('http://localhost/clothes/addclothes.php', formData);
      if (res.data == 1) {
        toast.success('Clothes added successfully');
        getClothes();
        setName('');
        setBrand('');
        setYear('');
        setType('');
        setShowAddClothesModal(false);
      }
    } catch (error) {
      console.error("Error adding clothes:", error);
    }
  };

  useEffect(() => {
    getClothes();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">GEN Thrift Store</h1>
        <div>
          <button onClick={() => setShowAddClothesModal(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Add Clothes
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clothes.map(clothing => (
            <tr key={clothing.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{clothing.clothing_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{clothing.clothing_brand}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{clothing.clothing_year}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{clothing.clothing_type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddClothesModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
            <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <h5 className="text-lg font-semibold">Add Clothes</h5>
              <button 
                type="button" 
                className="text-gray-500 hover:text-gray-700" 
                onClick={() => setShowAddClothesModal(false)}
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            <div className="px-4 py-4">
              {modalMessage && <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded">{modalMessage}</div>}
              <form onSubmit={addClothes}>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Clothing Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="form-input rounded-md border-gray-300 shadow-sm w-full"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    className="form-input rounded-md border-gray-300 shadow-sm w-full"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="form-input rounded-md border-gray-300 shadow-sm w-full"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="form-input rounded-md border-gray-300 shadow-sm w-full"
                  />
                </div>
                <button type='submit' className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Add Clothes
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
