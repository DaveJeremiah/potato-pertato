import React, { useState, useEffect } from 'react';
import { getDevices, getCards, addDevice, deleteDevice, addCard, deleteCard } from '../data/store';
import { Trash2, Plus, Edit } from 'lucide-react';

export default function Editor() {
  const [devices, setDevices] = useState([]);
  const [cards, setCards] = useState([]);
  
  const [newDevice, setNewDevice] = useState({ name: '', description: '', color: '#3b82f6', icon: 'Star' });
  const [newCard, setNewCard] = useState({ text: '', deviceId: '' });

  useEffect(() => {
    setDevices(getDevices());
    setCards(getCards());
  }, []);

  const handleAddDevice = (e) => {
    e.preventDefault();
    if (!newDevice.name) return;
    const added = addDevice(newDevice);
    setDevices([...devices, added]);
    setNewDevice({ name: '', description: '', color: '#3b82f6', icon: 'Star' });
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.text || !newCard.deviceId) return;
    const added = addCard(newCard);
    setCards([...cards, added]);
    setNewCard({ text: '', deviceId: '' });
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>Content Editor</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Devices Section */}
        <div>
          <h2>Manage Categories (Devices)</h2>
          <form onSubmit={handleAddDevice} style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '1rem' }}>
            <input type="text" placeholder="Category Name (e.g. Simile)" value={newDevice.name} onChange={e => setNewDevice({...newDevice, name: e.target.value})} />
            <input type="text" placeholder="Description (e.g. Comparing using like or as)" value={newDevice.description} onChange={e => setNewDevice({...newDevice, description: e.target.value})} />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="color" value={newDevice.color} onChange={e => setNewDevice({...newDevice, color: e.target.value})} style={{ width: '50px', padding: '0', cursor: 'pointer' }} />
              <button type="submit" className="btn"><Plus size={18} /> Add Category</button>
            </div>
          </form>

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {devices.map(d => (
              <div key={d.id} className="glass-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', borderLeft: `4px solid ${d.color}` }}>
                <div>
                  <h3 style={{ color: d.color }}>{d.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{d.description}</p>
                </div>
                <button onClick={() => { deleteDevice(d.id); setDevices(getDevices()); setCards(getCards()); }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Section */}
        <div>
          <h2>Manage Game Cards</h2>
          <form onSubmit={handleAddCard} style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '1rem' }}>
            <textarea placeholder="Card Text (e.g. As brave as a lion)" value={newCard.text} onChange={e => setNewCard({...newCard, text: e.target.value})} rows={2} />
            <select value={newCard.deviceId} onChange={e => setNewCard({...newCard, deviceId: e.target.value})}>
              <option value="" disabled>Select Category...</option>
              {devices.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <button type="submit" className="btn"><Plus size={18} /> Add Card</button>
          </form>

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {cards.map(c => {
              const device = devices.find(d => d.id === c.deviceId);
              return (
                <div key={c.id} className="glass-card" style={{ padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.9rem' }}>
                    <span style={{ color: device?.color || 'white', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold' }}>{device?.name}</span>
                    <p>{c.text}</p>
                  </div>
                  <button onClick={() => { deleteCard(c.id); setCards(getCards()); }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
