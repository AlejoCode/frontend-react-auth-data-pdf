import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import './Inventory.css';
import { Toast } from 'react-bootstrap';


export default function Inventory(props) {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const companyId = searchParams.get("companyId");

  useEffect(() => {
    fetch(`https://backend-nodejs-auth-data-pdf.herokuapp.com/api/companies/${companyId}`)
      .then(response => response.json())
      .then(data => setInventory(data))
      .catch(error => console.error(error));
  }, [companyId]);

  const handleAddItem = () => {
    const newItem = {
      name: itemName,
      quantity: itemQuantity
    };
  
    fetch(`https://backend-nodejs-auth-data-pdf.herokuapp.com/api/companies/${companyId}/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Item added to inventory:', data);
        setInventory([...inventory, data]);
        setShowModal(false);
        setItemName("");
        setItemQuantity("");
      })
      .then(data => {
        window.location.reload()
      })
      .catch(error => {
        console.error('There was a problem adding the item to the inventory:', error);
      });
  };

  const handleGeneratePDF = () => {
    console.log('inventory : ' + JSON.stringify(inventory))
   
    fetch(`https://backend-nodejs-auth-data-pdf.herokuapp.com/api/companies/${companyId}/inventory/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({inventory:inventory, email: email})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('pdf generated correctly', data);
      setShowToast(true)
    })

    .catch(error => {
      console.error('There was a problem generating the PDF of the inventory:', error);
      setShowToast(true)

    });


  };

  return(
    <div className='wrapper bg-dark d-flex align-items-center justify-content-center'>
      <Toast show={showToast} onClose={() => {setShowToast(false)}} className="toast-overlay">
        <Toast.Header >
          <strong className="mr-auto">PDF Email Done!</strong>
        </Toast.Header>
        <Toast.Body>"PDF sent to email correctly !"</Toast.Body>
      </Toast>
      <div className='login inventory rounded p-4'>
      <div className='generatePdf p-3'>
      <h2 className='p-4'>Inventory</h2>
<div className=''>
<label htmlFor="email">Email:</label>
<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
<button className='btnGoToPDF mt-3' onClick={() => handleGeneratePDF()}>Generate PDF</button>
</div>
</div>
       
        <div className='d-flex align-items-center justify-content-center border'>
          <table>
            <thead>
              <tr>
                <th className='p-1'>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          <div className='pt-3'>

          <button className='btnGoToAdd' onClick={() => {setModal(true)}}>Add Item</button>
          </div>

        {modal && (
          <div className="p-3">
              <span className="close" onClick={() => setModal(false)}>&times;</span>
              <h3>Add Item</h3>
              <div>
                <label htmlFor="item-name">Name:</label>
                <input type="text" id="item-name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="item-quantity">Quantity:</label>
                <input type="number" id="item-quantity" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
              </div>
          <div className='pt-3'>

              <button className='btnAdd' onClick={handleAddItem}>Add</button>
          </div>

          </div>
        )}

      </div>
    </div>
  );
}